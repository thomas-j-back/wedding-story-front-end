import { Link } from 'react-router-dom';


export default function StartPage() {
    return (
        <div className='px-xl flex flex-col '>
            <h1 className='mb-16'>Wedding Story</h1>
            <Link to="/form">
                <button className='blue'>Click here to make your story</button>
            </Link>
        </div>
    )
}