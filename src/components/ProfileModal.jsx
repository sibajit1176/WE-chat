import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileModal = ({
    isOpen,
    onClose,
    user
}) => {

    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleLogout = () => {

        localStorage.removeItem("userToken");

        navigate("/");

    };

    return (

      <div className="absolute right-0 top-14 w-72 rounded-xl bg-[#111827] border border-blue-500/30 shadow-2xl z-50 overflow-hidden">

    {/* Close Button */}
    <button
        onClick={onClose}
className="absolute top-1 right-1 h-8 w-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-black-700 transition-all"    
>
        ✕
    </button>

    {/* Header */}
    <div className="py-4 px-5 flex flex-col items-center border-b border-blue-500/20">

        <div className="h-14 w-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
        </div>

        <h2 className="text-white text-base font-semibold mt-2">
            {user?.name}
        </h2>

    </div>

    {/* User Details */}
    <div className="px-5 py-4 space-y-3">

        <div>
            <p className="text-[11px] text-gray-400 uppercase">
                Phone
            </p>
            <p className="text-sm text-white">
                {user?.phno}
            </p>
        </div>

        <div>
            <p className="text-[11px] text-gray-400 uppercase">
                Email
            </p>
            <p className="text-sm text-white break-all">
                {user?.email}
            </p>
        </div>

    </div>

    {/* Footer */}
    <div className="border-t border-blue-500/20 p-3">

        <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg text-sm font-medium transition-all"
        >
            Logout
        </button>

    </div>

</div>
    );

};

export default ProfileModal;