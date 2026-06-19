import React from 'react';

const UserCard = ({ user,setSelectedChat }) => {

    return (
        <div 
        onClick={()=>{setSelectedChat(user)}}
            className="flex items-center gap-3 p-4 border-b border-blue-500/20 cursor-pointer hover:bg-blue-500/10 transition-all"
        >
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1 overflow-hidden">

                <h3 className="text-white font-semibold truncate">
                    {user.name}
                </h3>

                <p className="text-gray-400 text-sm truncate">
                    {user.lastMessage || "No messages yet"}
                </p>

            </div>

        </div>
    );
};

export default UserCard;