import { useFormContext } from "react-hook-form"
import UserPhotoEditBlock from "../../components/PhotoUpload/PhotoStyleBlock"
import type { SubmissionTypes } from "../../validation/weddingDetails";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function CoupleUpload() {
    const { getValues, trigger } = useFormContext();
    const [submissionType, setSubmissionType] = useState<SubmissionTypes>();
    const myName = getValues('requesterName');
    const partnerName = getValues('partnerName');
    const navigate = useNavigate();
    //Check (if single image, accepting should move forward to next form step, if separate images, accepting should move forward to next form step)
    const onAccept = async () => {
        const ok = await trigger();
        if (ok) {
            if (submissionType == 'single-image') {
                navigate('/relationship_story')
            }
        }
    }

    return (<>
        <div className='max-w-md mx-auto p-6 bg-white rounded-2xl shadow space-y-6 flex flex-col'>
            Do you want to base your characters off a single image containing both you and your partner, or separate images?
            <div className='flex flex-row justify-between'>
                <button onClick={() => {
                    setSubmissionType('single-image')
                }} className="text-sm bg-blue-600 text-white px-4 py-2 rounded disabled:cursor-not-allowed disabled:opacity-50">Single image</button>
                <button onClick={() => {
                    setSubmissionType('separate-images')
                }} className="text-sm bg-blue-600 text-white px-4 py-2 rounded disabled:cursor-not-allowed disabled:opacity-50">Separate images</button>
            </div>
        </div>
        <div className="p-16">
            <p className="text-sm">Please upload a front facing picture of you and your partner separately to preview and edit how they will appear within the chosen style!</p>
        </div>
        <div className="flex flex-row justify-between">
            {submissionType == 'single-image' ? (
                <UserPhotoEditBlock onAccept={onAccept} userName={`${myName} and ${partnerName}`} photoAlt="Preview of you and your partner" fieldPath="requesterCharacterPhoto" />
            ) : (<>
                <UserPhotoEditBlock onAccept={onAccept} userName={myName} photoAlt="Preview of me" fieldPath="partnerCharacterPhoto" />
                <UserPhotoEditBlock onAccept={onAccept} userName={partnerName} photoAlt="Preview of my partner" fieldPath="partnerCharacterPhoto" />
            </>)}


        </div>
    </>)
}