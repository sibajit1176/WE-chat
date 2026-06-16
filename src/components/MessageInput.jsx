import React, { useState } from 'react';

const MessageInput = () => {

    const [message, setMessage] =
        useState('');

    const handleSend = (e) => {
        e.preventDefault();

        console.log(message);

        setMessage('');
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
                    onChange={(e) =>
                        setMessage(
                            e.target.value
                        )
                    }
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