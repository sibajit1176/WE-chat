import React from 'react';
import UserCard from './UserCard';

const Sidebar = () => {

    const users = [
        {
            id: 1,
            name: 'Rahul',
            lastMessage: 'Hello'
        },
        {
            id: 2,
            name: 'Ankit',
            lastMessage: 'How are you?'
        },
        {
            id: 3,
            name: 'Priya',
            lastMessage: 'See you'
        }
    ];

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

                {users.map((user) => (
                    <UserCard
                        key={user.id}
                        user={user}
                    />
                ))}

            </div>

        </aside>
    );
};

export default Sidebar;