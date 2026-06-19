import React, { useState } from 'react';
import { getMessage, sendMessage } from '../services/messageService';
import { toast } from 'react-toastify';
import { socket } from '../socket/socket';

const MessageInput = ({ selectedChat }) => {

    const [message, setMessage] =
        useState('');

    // const handleSend = async (e) => {
    //     e.preventDefault();

    //     if (!selectedChat) {
    //         return toast.error("Select a chat first");
    //     }

    //     if (!message.trim()) {
    //         return toast.error("Enter a message");
    //     }

    //     try {
    //         const payload = {
    //             chatId: selectedChat.chatId,
    //             message: message.trim()
    //         };

    //         const res = await sendMessage(payload);

    //         toast.success(res.message);

    //         setMessage("");

    //     } catch (error) {
    //         toast.error(
    //             error.response?.data?.message || "Failed to send message"
    //         );
    //     }
    // };

    const handleSend = (e) => {

        e.preventDefault();

        if (!selectedChat) {
            return toast.error("Select a chat first");
        }

        if (!message.trim()) {
            return;
        }
        
        socket.emit(
            "send-message",
            {
                chatId: selectedChat.chatId,
                message: message.trim()
            },
            (response) => {

                if (!response.success) {
                    toast.error(response.message);
                    return;
                }

                setMessage("");

            }
        );

    };
    const handleChange = (e) => {
    setMessage(e.target.value);

    if (selectedChat) {
        socket.emit("typing", selectedChat.chatId);
    }
};

    return (
        <div className="border-t border-blue-500/30 p-4">

            <form
                className="flex gap-3"
                onSubmit={handleSend}
            >

                <input
                    type="text"
                    value={message}
                    placeholder="Type a message..."
                    onChange={handleChange}
                    className="flex-1 px-4 py-3 bg-transparent border border-blue-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)]"
                >
                    Send
                </button>

            </form>

        </div>
    );
};

export default MessageInput;