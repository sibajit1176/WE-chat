import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import { getMembers } from '../services/chatService';
import { toast } from 'react-toastify';

const Sidebar = ({setSelectedChat}) => {
    const [memberDetails, setMemberDetails] = useState([]);

    const getchatMembers = async () => {
        try {
            console.log("API calling...");
            const res = await getMembers();
            setMemberDetails(res);

        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch members");
        }
    };

    useEffect(() => {
        getchatMembers();
    }, []);

    return (
        <aside className="w-80 border-r border-blue-500/30 bg-white/5">

            <div className="p-4 border-b border-blue-500/30">
                <input
                    type="text"
                    placeholder="Search user..."
                    className="w-full px-4 py-3 bg-transparent border border-blue-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="overflow-y-auto h-full">
                {memberDetails.map((user) => (
                    <UserCard
                        key={user.userId}
                        user={user}
                        setSelectedChat={setSelectedChat}
                    />
                ))}
            </div>

        </aside>
    );
};

export default Sidebar;