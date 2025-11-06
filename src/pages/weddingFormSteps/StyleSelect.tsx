import { useState } from 'react'
import fullColorExample from '../../assets/full_color.png';
import minimalColorExample from '../../assets/line_simple.png'
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export type Styles = 'minimal-color' | 'colorful' | null;

type StyleOption = {
    src: string,
    name: string,
    type: Styles
}

export default function StyleSelect() {
    const [style, selectStyle] = useState<Styles>();
    const navigate = useNavigate();
    const { setValue } = useFormContext();
    const styles = [{
        src: fullColorExample,
        name: 'Colorful',
        type: 'colorful' as Styles
    }, {
        src: minimalColorExample,
        name: 'Minimal',
        type: 'mimimal-color' as Styles
    }];

    const setColor = (style: StyleOption) => {
        selectStyle(style.type);
        setValue('style', style.type)
    }

    return (
        <div className='max-w-md mx-auto p-6 bg-white rounded-2xl shadow space-y-6'>
            <div className="flex flex-row justify-between">
                {styles.map((style) => {
                    return (
                        <div className='w-dvw' onClick={() => {
                            setColor(style);
                        }}>
                            <img className=" w-dvw rounded-xl shadow-md hover:cursor-pointer hover:opacity-50" src={style.src} />
                            <p>{style.name}</p>
                        </div>);
                })}
            </div>
            <button disabled={!style} className="bg-blue-600 text-white px-4 py-2 rounded disabled:cursor-not-allowed disabled:opacity-50" onClick={() => navigate('/form/couple_style')}>Next</button>
        </div>
    )
}