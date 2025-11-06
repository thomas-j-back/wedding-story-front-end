import { Outlet, NavLink } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form';
import { WeddingDetailsSchema, type WeddingDetailsFormData, STEP_FIELDS } from '../validation/weddingDetails';
import { zodResolver } from '@hookform/resolvers/zod';

export default function WeddingForm() {
    type StepKey = 'basicDetails' | 'style' | 'chapter1';
    const STEPS: StepKey[] = ["basicDetails", 'style', 'chapter1'];
    const methods = useForm<WeddingDetailsFormData>({
        resolver: zodResolver(WeddingDetailsSchema),
        mode: 'onSubmit'
    });

    const onSubmit = () => {
        //do some stuff idk yet
    }

    return (<>
        <div>
            <h1>Get ready to start doing some stuff</h1>
        </div>
        <nav className="flex gap-3 mb-6 justify-center">
            <NavLink to="/form" end className={({ isActive }) => isActive ? 'font-bold' : 'text-gray-200'}>Tell us a bit about yourselves</NavLink>
            <NavLink to="style_select" className={({ isActive }) => isActive ? 'font-bold' : 'text-gray-200'}>Select a Style</NavLink>
            <NavLink to="couple_style" className={({ isActive }) => isActive ? 'font-bold' : 'text-gray-200'}>Upload and style you and your partner</NavLink>
        </nav>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Outlet />
            </form>

        </FormProvider>
    </>)
}