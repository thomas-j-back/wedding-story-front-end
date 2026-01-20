import { useState, useEffect, useRef, type ChangeEvent } from 'react';
import UploadService from '../../services/UploadService';
import type { CreateJobRequestDTO, CreateUploadDTO } from '../../types/dataTypes/DTOs';
import { useFormContext } from 'react-hook-form';
import type { StyledPhotoState } from '../../validation/weddingDetails';
import FullScreenLoader from '../FullScreenLoading';
interface UserEditPhotoBlockProps {
    userName: string,
    photoAlt: string,
    //we want the user to have their progress/ session saved while using
    fieldPath: 'requesterCharacterPhoto' | 'partnerCharacterPhoto'
    onAccept: () => void;
}

export default function UserPhotoEditBlock({ userName, photoAlt, fieldPath, onAccept }: UserEditPhotoBlockProps) {
    const [uploadedPhoto, setUploadedPhoto] = useState<File>();
    const [loading, setLoading] = useState<boolean>(false);
    const [photoPreview, setPhotoPreview] = useState<string>();
    const [generatedPreview, setGeneratedPreview] = useState<string>();
    const inputFileRef = useRef<HTMLInputElement>(null);
    const uploadService = new UploadService();
    const { getValues, watch, setValue } = useFormContext();
    const style = getValues('style');


    // get the current photo state
    const photoState = watch(fieldPath) as StyledPhotoState;

    useEffect(() => {
        if (photoState?.generatedKey) {
            getPhoto(photoState.generatedKey, setGeneratedPreview);
        }
        if (photoState?.initPhotoKey) {         //Retrieve and show the image
            //some dummy function to get image
            getPhoto(photoState.initPhotoKey, setPhotoPreview);
        }
    }, [photoState?.generatedUrl, uploadedPhoto]);


    //Grab photo from presigned geturl
    const getPhoto = async (key: string, setMethod: (url: string) => void) => {
        const res = await uploadService.requestPresignGet(key);
        // setPhotoPreview(res.getUrl);
        setMethod(res.getUrl);
    }


    const selectPhoto = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    }

    const setPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            await storeUserInitPhoto(files[0])
        }
    }

    const storeUserInitPhoto = async (uploadedPhoto: File) => {
        const fileURL = URL.createObjectURL(uploadedPhoto);
        const res = confirm("Upload this photo to store for future iterations on character design?");
        if (!res) {
            return;
        }
        setLoading(true);
        if (!uploadedPhoto) {
            throw new Error('no photo uploaded to stylize.')
        }
        const uploadDTO: CreateUploadDTO = {
            count: 1,
            contentType: uploadedPhoto?.type || ''
        }
        try {
            const uploadResponse = await uploadService.createUpload(uploadDTO);
            await uploadService.putFile(uploadResponse[0].putUrl, uploadedPhoto);

            //Store the origin photo details for next load
            setValue(`${fieldPath}.initPhotoKey`, uploadResponse[0].objectKey);
            setValue(`${fieldPath}.initPhotoContentType`, uploadedPhoto?.type || "image/*");
            setUploadedPhoto(uploadedPhoto);
            setPhotoPreview(fileURL);

        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    }

    /**
     * This is the call to stylize the image
     */
    const stylizeImage = async () => {
        setLoading(true);
        const initPhotoKey = getValues(`${fieldPath}.initPhotoKey`);
        const initPhotoContentType = getValues(`${fieldPath}.initPhotoContentType`);

        //Now we have the object ket in uploadResponse[0].objectKey, we can now create a job request
        const jobRequestDTO: CreateJobRequestDTO = {
            model: 'openaiimagemodel',
            prompt: '',
            inputKeys: [initPhotoKey, style == "mimimal-color" ? "public/line_simple.png" : "public/full_color.png"],
            inputContentTypes: [initPhotoContentType, "image/png"],
            options: {},
            type: 'STYLE_TRANSFER'
        }
        const createdJob = await uploadService.createJobRequest(jobRequestDTO);

        setValue(`${fieldPath}.jobId`, createdJob.jobId);

        //Query job service intermittently to get status
        let tries = 0;
        const i = setInterval(async () => {
            //check job status of the jobId we just initiated
            const res = await uploadService.getJobStatus(getValues(`${fieldPath}.jobId`));
            tries++;
            if (res.status == "SUCCEEDED") {
                clearInterval(i);
                //Store key of generated character image
                setValue(`${fieldPath}.generatedKey`, res.outputKeys[0]);
                setValue(`${fieldPath}.generatedUrl`, res.outputUrls[0]);

                setGeneratedPreview(res.outputKeys[0]);
                setLoading(false);
            }
            if (res.status == 'FAILED') {
                clearInterval(i);
                alert(res.error);
                setLoading(false);


            }
            if (tries > 20) {
                clearInterval(i);
                console.error("Unable to communicate with job server on status.")
                photoState.jobId = '';
                setValue(`${fieldPath}.jobId`, '');
                setLoading(false);
            }
        }, 10000);
    }

    /**
     * 
     */
    const saveGeneratedImage = () => {

    }


    return (
        <div className='max-w-md mx-auto p-6 bg-white rounded-2xl shadow space-y-6 flex flex-col'>
            {loading && <FullScreenLoader message="Processing your photo..." />}
            <label>{userName}</label>
            <img src={photoPreview} alt={photoAlt} />
            <img src={generatedPreview} alt={"A preview of how your character will look stylized"} />
            <button onClick={selectPhoto} className="text-sm bg-blue-600 text-white px-4 py-2 rounded disabled:cursor-not-allowed disabled:opacity-50">{uploadedPhoto ? 'Change Photo' : 'Upload Photo'}</button>
            <input accept="image/*" ref={inputFileRef} className="hidden" type="file" onChange={setPhoto} />
            <button disabled={!uploadedPhoto && !photoState?.initPhotoKey} className={'text-sm bg-blue-600 text-white px-4 py-2 rounded disabled:cursor-not-allowed disabled:opacity-50'} onClick={stylizeImage}>Generate Character</button>
            <button className={'text-sm bg-blue-600 text-white px-4 py-2 rounded disabled:cursor-not-allowed disabled:opacity-50'} hidden={!generatedPreview} onClick={onAccept}>Accept Character Style</button>
        </div>
    )
}