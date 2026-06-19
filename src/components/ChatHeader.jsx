import React, { useEffect, useState } from 'react';
import { socket } from '../socket/socket';

const ChatHeader = ({ selectedChat }) => {

    useEffect(() => {
        let timer;

        const handleTyping = () => {
            setIsTyping(true);

            clearTimeout(timer);

            timer = setTimeout(() => {
                setIsTyping(false);
            }, 2000);
        };

        socket.on("user-typing", handleTyping);

        return () => {
            socket.off("user-typing", handleTyping);
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        setIsTyping(false)
    }, selectedChat)

    const [isTyping, setIsTyping] = useState(false)


    return (
        <div className="h-16 border-b border-blue-500/30 flex items-center px-6">

            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
                {selectedChat?.name?.charAt(0).toUpperCase() || "?"}
            </div>

            <div>

                <h2 className="text-white font-semibold">
                    {selectedChat?.name || "Select a chat"}
                </h2>


                {isTyping ? (
                    <p className="text-blue-400 text-xs animate-pulse">
                        Typing...
                    </p>
                ) : (
                    <p className="text-green-400 text-xs">
                        Online
                    </p>
                )}

            </div>

        </div>
    );
};

export default ChatHeader;