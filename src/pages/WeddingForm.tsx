import { useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form';
import { WeddingDetailsSchema, type WeddingDetailsFormData } from '../validation/weddingDetails';
import { zodResolver } from '@hookform/resolvers/zod';

const LOCAL_FORM_DATA_KEY = 'wedding_story_init_form';

export default function WeddingForm() {
    type StepKey = 'basicDetails' | 'style' | 'chapter1' | 'characterPhotos';
    const STEPS: StepKey[] = ["basicDetails", 'style', 'chapter1', 'characterPhotos'];

    const methods = useForm<WeddingDetailsFormData>({
        resolver: zodResolver(WeddingDetailsSchema),
        defaultValues: {
            requesterCharacterPhoto: {},
            partnerCharacterPhoto: {},
        },
        mode: 'onSubmit'
    });

    const { reset, watch } = methods;

    const onSubmit = () => {
        //do some stuff idk yet
    }

    // Optional: auto-save to localStorage
    useEffect(() => {
        const draft = loadLocalDraft();
        if (draft) {
            reset(draft);
        }
        const subscription = watch((values) => {
            try {
                localStorage.setItem(LOCAL_FORM_DATA_KEY, JSON.stringify(values));
            } catch (e) {
                console.error("Failed to save local draft", e);
            }
        });
        return () => subscription.unsubscribe();

    }, [watch, reset]);

    function loadLocalDraft(): WeddingDetailsFormData | null {
        if (typeof window === "undefined") return null; // SSR safety
        const raw = localStorage.getItem(LOCAL_FORM_DATA_KEY);
        if (!raw) return null;
        try {
            return JSON.parse(raw) as WeddingDetailsFormData;
        } catch {
            return null;
        }
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