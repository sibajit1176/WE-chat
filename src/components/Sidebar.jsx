import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import { addMember, createGroup, getGroupchats, getMembers } from '../services/chatService';
import { toast } from 'react-toastify';
import AddContactModal from './AddContactModal';
import CreateGroupModal from './CreateGroupModal';
import GroupCard from './GroupCard';

const Sidebar = ({ setSelectedChat }) => {
    const [memberDetails, setMemberDetails] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
    const [groupDetails, setgroupDetails] = useState([]);

    useEffect(() => {
        getchatMembers();
        getGroups()
    }, []);


    const getchatMembers = async () => {
        try {
            const res = await getMembers();
            setMemberDetails(res);

        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch members");
        }
    };
    const getGroups = async () => {
        try {
            const res = await getGroupchats();
            setgroupDetails(res);
            console.log(res);


        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch groups");
        }
    };
    const onAddContact = async (phoneNo) => {
        try {
            const res = await addMember(phoneNo);

            toast.success(res.message);

            setIsModalOpen(false);

            getchatMembers(); // Refresh contact list

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Failed to add contact"
            );

        }
    }
    const onCreateGroup = async (payload) => {

        console.log(payload);
        try {
            const res = await createGroup(payload);

            toast.success(res.message);

            setIsGroupModalOpen(false);

            getGroups();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to create group"
            );
        }

    };

    return (
        <aside className="w-80 border-r border-blue-500/30 bg-white/5 flex flex-col">

            {/* Search */}
            <div className="p-4 border-b border-blue-500/30">
                <input
                    type="text"
                    placeholder="Search user..."
                    className="w-full px-4 py-3 bg-transparent border border-blue-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Contact List */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                {memberDetails.map((user) => (
                    <UserCard
                        key={user.userId}
                        user={user}
                        setSelectedChat={setSelectedChat}
                    />
                ))}
                {groupDetails.map((group) => (
                    <GroupCard
                        key={group.chatId}
                        group={group}
                        setSelectedChat={setSelectedChat}
                    />
                ))}
            </div>

            {/* Footer */}
            <div className="border-t border-blue-500/30 bg-black/30">

                {/* Add Contact */}
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-3 p-4 cursor-pointer hover:bg-blue-500/10 transition-all"
                >
                    <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-semibold flex-shrink-0">
                        +
                    </div>

                    <div>
                        <h3 className="text-white font-semibold">
                            Add Contact
                        </h3>

                        <p className="text-xs text-gray-400">
                            Start a new chat
                        </p>
                    </div>
                </div>

                {/* Create Group */}
                <div
                    onClick={() => setIsGroupModalOpen(true)}
                    className="flex items-center gap-3 p-4 cursor-pointer hover:bg-blue-500/10 transition-all"
                >
                    <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-semibold flex-shrink-0">
                        👥
                    </div>

                    <div>
                        <h3 className="text-white font-semibold">
                            Create Group
                        </h3>

                        <p className="text-xs text-gray-400">
                            New group chat
                        </p>
                    </div>
                </div>

            </div>

            <AddContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddContact={onAddContact}
            />

            <CreateGroupModal
                isOpen={isGroupModalOpen}
                onClose={() => setIsGroupModalOpen(false)}
                members={memberDetails}
                onCreateGroup={onCreateGroup}
            />

        </aside>
    );
};

export default Sidebar;