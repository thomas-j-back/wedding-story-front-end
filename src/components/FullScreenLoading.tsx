import { createPortal } from "react-dom";

export default function FullScreenLoader({ message = "Loading..." }) {
    return createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
            <div className="flex flex-col items-center space-y-3 text-white">
                <div className="h-8 w-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                <p className="text-lg">{message}</p>
            </div>
        </div>,
        document.body
    );
}