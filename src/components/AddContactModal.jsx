import React, { useState } from "react";

const AddContactModal = ({
    isOpen,
    onClose,
    onAddContact
}) => {

    const [phoneNo, setPhoneNo] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!phoneNo.trim()) return;

        onAddContact(phoneNo);

        setPhoneNo("");

    };

    return (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

            <div className="w-full max-w-md rounded-2xl bg-[#111827] border border-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.5)] p-6">

                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                    Add Contact
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        placeholder="Enter Phone Number"
                        value={phoneNo}
                        onChange={(e) =>
                            setPhoneNo(e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-lg bg-transparent border border-blue-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-lg border border-gray-500 text-gray-300 hover:bg-gray-700 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.7)]"
                        >
                            Add
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default AddContactModal;