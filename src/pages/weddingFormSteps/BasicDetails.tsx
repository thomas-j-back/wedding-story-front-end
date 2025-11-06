import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { STEP_FIELDS } from '../../validation/weddingDetails';
export default function BasicDetails() {
    const { register, trigger, getValues, formState: { errors, isSubmitting } } = useFormContext();
    const navigate = useNavigate();

    const onSubmit = async () => {
        const ok = await trigger(STEP_FIELDS['basicDetails']);
        if (ok) {
            navigate('style_select')
        }

    }
    // const hasErrors = !!(errors.requesterName || errors.partnerName);


    return (
        <div className='max-w-md mx-auto p-6 bg-white rounded-2xl shadow space-y-6'>
            <div>
                <label htmlFor="requesterName" className="block text-sm font-medium text-gray-700">
                    Your Name
                </label>
                <input
                    {...register("requesterName", { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                 focus:border-indigo-500 focus:ring-indigo-500 bg-white text-black"
                />
                {errors.requesterName && <small className="text-red-500">{errors.requesterName.message?.toString()}</small>}
            </div>
            <div>
                <label htmlFor="partnerName" className="block text-sm font-medium text-gray-700">
                    Your Partner's Name
                </label>
                <input
                    {...register("partnerName", { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                 focus:border-indigo-500 focus:ring-indigo-500 bg-white text-black"
                />
                {errors.partnerName && <small className="text-red-500">{errors.partnerName.message?.toString()}</small>}


            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded disabled:cursor-not-allowed disabled:opacity-50" onClick={onSubmit} type="button">Next</button>

        </div>

    )
}