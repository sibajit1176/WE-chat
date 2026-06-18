import React from 'react';

const UserCard = ({ user,setSelectedChat }) => {

    return (
        <div 
        onClick={()=>{setSelectedChat(user)}}
        className="p-4 border-b border-blue-500/20 cursor-pointer hover:bg-blue-500/10 transition-all"
        >

            <h3 className="text-white font-semibold">
                {user.name}
            </h3>

            <p className="text-gray-400 text-sm">
                {user?.lastMessage || "No messages yet"}
            </p>

        </div>
    );
};

export default UserCard;