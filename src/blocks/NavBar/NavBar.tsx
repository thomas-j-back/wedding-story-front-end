import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="font-heading flex justify-between items-center w-full p-4 bg-primary-500 min-h-* py- * text-white">
            <Link to="/">
                <h1 className="text-2xl font-heading">Wedding Story</h1>
            </Link>

        </div>
    )
}