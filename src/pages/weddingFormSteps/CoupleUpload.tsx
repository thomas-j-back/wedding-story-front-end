import { useFormContext } from "react-hook-form"
import UserPhotoEditBlock from "../../components/PhotoStyleBlock"
import type { SubmissionTypes } from "../../validation/weddingDetails";
import { useState } from "react";

export default function CoupleUpload() {
    const { getValues } = useFormContext();
    const [submissionType, setSubmissionType] = useState<SubmissionTypes>();
    const myName = getValues('requesterName');
    const partnerName = getValues('partnerName');


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
                <UserPhotoEditBlock userName={`${myName} and ${partnerName}`} photoAlt="Preview of you and your partner" fieldPath="requesterCharacterPhoto" />
            ) : (<>
                <UserPhotoEditBlock userName={myName} photoAlt="Preview of me" fieldPath="partnerCharacterPhoto" />
                <UserPhotoEditBlock userName={partnerName} photoAlt="Preview of my partner" fieldPath="partnerCharacterPhoto" />
            </>)}


        </div>
    </>)
}