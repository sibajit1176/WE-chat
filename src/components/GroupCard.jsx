import React from 'react';

const GroupCard = ({ group,setSelectedChat }) => {

    return (
        <div 
        onClick={()=>{setSelectedChat(group)}}
            className="flex items-center gap-3 p-4 border-b border-blue-500/20 cursor-pointer hover:bg-blue-500/10 transition-all"
        >
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                    👥
            </div>

            <div className="flex-1 overflow-hidden">

                <h3 className="text-white font-semibold truncate">
                    {group.groupName}
                </h3>

                <p className="text-gray-400 text-sm truncate">
                    {group.lastMessage || "No messages yet"}
                </p>

            </div>

        </div>
    );
};

export default GroupCard;