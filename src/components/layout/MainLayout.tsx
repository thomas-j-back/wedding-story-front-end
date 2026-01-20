//This will contain navbar and other required components for the app
import { Outlet } from "react-router-dom";
import NavBar from "../../blocks/NavBar/NavBar";
export default function MainLayout() {
    //Set some global behaviors of the side padding here
    return (
        <>
            <NavBar />
            <div className="font-sans">
                <Outlet />
            </div>
        </>
    )
}   