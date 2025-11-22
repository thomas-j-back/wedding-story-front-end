import { useFormContext } from "react-hook-form"
import UserPhotoEditBlock from "../../components/PhotoStyleBlock"

export default function CoupleUpload() {
    const { getValues } = useFormContext();
    const myName = getValues('requesterName');
    const partnerName = getValues('partnerName');

    return (<>
        <div className="p-16">
            <p className="text-sm">Please upload a front facing picture of you and your partner separately to preview and edit how they will appear within the chosen style!</p>
        </div>
        <div className="flex flex-row justify-between">
            <UserPhotoEditBlock userName={myName} photoAlt="Preview of me" fieldPath="requesterCharacterPhoto" />
            <UserPhotoEditBlock userName={partnerName} photoAlt="Preview of my partner" fieldPath="partnerCharacterPhoto" />
        </div>
    </>)
}