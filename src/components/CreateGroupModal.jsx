import React, { useState } from "react";

const CreateGroupModal = ({
    isOpen,
    onClose,
    members,
    onCreateGroup
}) => {

    const [groupName, setGroupName] = useState("");

    const [selectedUsers, setSelectedUsers] = useState([]);

    if (!isOpen) return null;

    const handleCheckbox = (userId) => {

        if (selectedUsers.includes(userId)) {

            setSelectedUsers(
                selectedUsers.filter(id => id !== userId)
            );

        } else {

            setSelectedUsers([
                ...selectedUsers,
                userId
            ]);

        }

    };

    const handleCreate = () => {

        if (!groupName.trim()) {
            return alert("Enter group name");
        }

        if (selectedUsers.length === 0) {
            return alert("Select members");
        }

        onCreateGroup({
            groupName,
            members: selectedUsers
        });

        setGroupName("");
        setSelectedUsers([]);

    };

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

            <div className="w-[450px] rounded-xl bg-[#161616] border border-blue-500 p-6">

                <h2 className="text-white text-2xl font-bold mb-5">
                    Create Group
                </h2>

                <input
                    type="text"
                    placeholder="Enter Group Name"
                    value={groupName}
                    onChange={(e) =>
                        setGroupName(e.target.value)
                    }
                    className="w-full p-3 rounded bg-transparent border border-blue-500 text-white mb-5 outline-none"
                />

                <div className="max-h-72 overflow-y-auto scrollbar-hide bg-white/5 rounded-xl p-2">

                    {members.map((member) => (

                        <label
                            key={member.userId}
                            className="flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer hover:bg-white/10 transition-all duration-200"
                        >

                            <input
                                type="checkbox"
                                checked={selectedUsers.includes(member.userId)}
                                onChange={() => handleCheckbox(member.userId)}
                                className="h-5 w-5 accent-blue-600 cursor-pointer"
                            />

                            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                                {member.name.charAt(0).toUpperCase()}
                            </div>

                            <div className="flex flex-col">
                                <span className="text-white font-medium">
                                    {member.name}
                                </span>

                                <span className="text-xs text-gray-400">
                                    {member.phoneNo}
                                </span>
                            </div>

                        </label>

                    ))}

                </div>
                <div className="flex justify-end gap-3 mt-6">

                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded bg-gray-700 text-white"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleCreate}
                        className="px-5 py-2 rounded bg-blue-600 text-white"
                    >
                        Create Group
                    </button>

                </div>

            </div>

        </div>
    );

};

export default CreateGroupModal;