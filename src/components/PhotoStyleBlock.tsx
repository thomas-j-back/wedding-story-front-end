import { useState, useEffect, useRef, type ChangeEvent } from 'react';
import UploadService from '../services/UploadService';
import type { CreateUploadDTO } from '../types/dataTypes/DTOs';
interface UserEditPhotoBlockProps {
    userName: string,
    photoAlt: string,
    //we want the user to have their progress/ session saved while using
    userUploadedPhoto?: File,
    styledPhoto?: File,
    numberRestyles?: number
}

export default function UserPhotoEditBlock({ userName, photoAlt }: UserEditPhotoBlockProps) {
    const [uploadedPhoto, setUploadedPhoto] = useState<File>();
    const [photoPreview, setPhotoPreview] = useState<string>();
    const [styledPhoto, setStyledPhoto] = useState();
    const inputFileRef = useRef<HTMLInputElement>(null);
    const uploadService = new UploadService();



    const selectPhoto = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    }

    const setPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            const fileURL = URL.createObjectURL(files[0]);
            setPhotoPreview(fileURL);
            setUploadedPhoto(files[0]);

        }
    }

    const stylizeImage = async () => {
        if (!uploadedPhoto) {
            throw new Error('no photo uploaded to stylize.')
        }
        const uploadDTO: CreateUploadDTO = {
            count: 1,
            contentType: uploadedPhoto?.type || ''
        }
        const uploadResponse = await uploadService.createUpload(uploadDTO);
        console.log(uploadResponse);
        const putResponse = await uploadService.putFile(uploadResponse[0].putUrl, uploadedPhoto);
        console.log(putResponse);
    }


    return (
        <div className='max-w-md mx-auto p-6 bg-white rounded-2xl shadow space-y-6 flex flex-col'>
            <label>{userName}</label>
            <img src={photoPreview} alt={photoAlt} />
            <button onClick={selectPhoto} className="text-sm bg-blue-600 text-white px-4 py-2 rounded disabled:cursor-not-allowed disabled:opacity-50">{uploadedPhoto ? 'Change Photo' : 'Upload Photo'}</button>
            <input accept="image/*" ref={inputFileRef} className="hidden" type="file" onChange={setPhoto} />
            <button disabled={!uploadedPhoto} className={'text-sm bg-blue-600 text-white px-4 py-2 rounded disabled:cursor-not-allowed disabled:opacity-50'} onClick={stylizeImage}>Generate Character</button>
        </div>
    )
}