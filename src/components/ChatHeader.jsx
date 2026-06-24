import React, { useEffect, useState } from 'react';
import { socket } from '../socket/socket';

const ChatHeader = ({ selectedChat }) => {
    const [isTyping, setIsTyping] = useState(false)

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
    }, [selectedChat])
    const formatLastSeen = (date) => {
        if (!date) return "Offline";

        const last = new Date(date);
        const now = new Date();

        const diff = now - last;

        if (diff < 60000) {
            return "Last seen just now";
        }

        if (diff < 3600000) {
            return `Last seen ${Math.floor(diff / 60000)} min ago`;
        }

        if (now.toDateString() === last.toDateString()) {
            return `Last seen ${last.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })}`;
        }

        return `Last seen ${last.toLocaleDateString("en-GB")}`;
    };



    return (
        <div className="h-16 border-b border-blue-500/30 flex items-center px-6">

            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">

                {selectedChat?.chatType === "group" ? (
                    <span className="text-lg">👥</span>
                ) : (
                    selectedChat?.name?.charAt(0).toUpperCase() || "?"
                )}

            </div>
            <div>

                <h2 className="text-white font-semibold">
                    {selectedChat
                        ? selectedChat.chatType === "group"
                            ? selectedChat.groupName
                            : selectedChat.name
                        : "Select a chat"}
                </h2>
                {isTyping ? (
                    <p className="text-blue-400 text-xs animate-pulse">
                        Typing...
                    </p>
                ) : selectedChat?.isOnline ? (
                    <p className="text-green-400 text-xs">
                        Online
                    </p>
                ) : (
                    <p className="text-gray-400 text-xs">
                        {formatLastSeen(selectedChat?.lastSeen)}
                    </p>
                )}
            </div>

        </div>
    );
};

export default ChatHeader;