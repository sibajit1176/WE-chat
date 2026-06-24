import React, { useEffect, useRef, useState } from 'react';

import Sidebar from '../components/Sidebar';
import ChatHeader from '../components/ChatHeader';
import MessageBubble from '../components/MessageBubble';
import MessageInput from '../components/MessageInput';
import { socket } from '../socket/socket';
import { getMessage } from '../services/messageService';
import { getUserDetails } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import ProfileModal from '../components/ProfileModal';
import { smartReplies } from '../services/aiService';

const ChatScreen = () => {
    const navigate = useNavigate()
    const messagesContainerRef = useRef()
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [userDetails, setUserDetails] = useState({})
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [smartReplySuggestions, setSmartReplySuggestions] = useState([]);

    useEffect(() => {
        socket.auth = {
            token: localStorage.getItem("userToken")
        };
        socket.connect();
        socket.on("connect", () => {
            console.log(socket.id);

        });

        getloginUserDetails();

        return () => {

            socket.off("connect");

            socket.disconnect();

        };

    }, []);


    useEffect(() => {

        if (!selectedChat) return;

        setMessages([]);

        socket.emit("join-room", selectedChat.chatId);

        getMessagesForChat();

    }, [selectedChat]);


    useEffect(() => {

        const handleReceiveMessage = (newMessage) => {

            if (newMessage.chatId !== selectedChat?.chatId) return;

            setMessages((prev) => [...prev, newMessage]);

        };

        socket.on("receive-message", handleReceiveMessage);

        return () => {
            socket.off("receive-message", handleReceiveMessage);
        };

    }, [selectedChat]);

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);


    const getloginUserDetails = async () => {
        try {
            const res = await getUserDetails();

            setUserDetails(res.data);
            console.log(res.data);

        } catch (error) {
            console.error(error);

            localStorage.removeItem("userToken");
            navigate("/");
        }
    };
    const getMessagesForChat = async () => {
        try {
            const res = await getMessage(selectedChat.chatId)
            setMessages(res.data)
        } catch (error) {
            console.log(error);

        }
    }
    const handleReceiveMessage = async (newMessage) => {

        if (newMessage.chatId !== selectedChat?.chatId) return;

        setMessages(prev => [...prev, newMessage]);

        // Don't generate replies for your own messages
        if (newMessage.userId === userDetails.id) return;

        try {

            const res = await smartReplies(newMessage.message);

            setSmartReplySuggestions(res.data);

        } catch (err) {

            console.log(err);

        }

    };



    return (
        <div className="h-screen w-screen bg-black flex flex-col">

            {/* App Header */}
            <header className="h-16 border-b border-blue-500/50 bg-white/5 flex items-center justify-between px-6">

                <h1 className="text-2xl font-bold text-white">
                    WeChat
                </h1>

                <div className="relative">

                    <div
                        onClick={() => setIsProfileOpen((prev) => !prev)}
                        className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-semibold cursor-pointer hover:bg-blue-500 transition-all"
                    >
                        {userDetails?.name?.charAt(0).toUpperCase()}
                    </div>

                    <ProfileModal
                        isOpen={isProfileOpen}
                        onClose={() => setIsProfileOpen(false)}
                        user={userDetails}
                    />

                </div>

            </header>

            <div className="flex flex-1 overflow-hidden">

                <Sidebar
                    setSelectedChat={setSelectedChat}
                />

                <section className="flex-1 flex flex-col">
                    {selectedChat &&
                        <ChatHeader
                            selectedChat={selectedChat}
                        />}

                    <div
                        ref={messagesContainerRef}
                        className="flex-1 overflow-y-auto p-6 space-y-2 scrollbar-hide"
                    >
                        {messages.map((msg) => {

                            const isOwn = msg.userId === userDetails.id;

                            return (
                                <MessageBubble
                                    key={msg.messageId}
                                    message={msg.message}
                                    senderName={
                                        isOwn
                                            ? "You"
                                            : msg.userName || msg.name
                                    }
                                    status={msg.status || "sent"}
                                    createdAt={msg.sent}
                                    isOwn={isOwn}
                                    messageType={msg.messageType}
                                    fileUrl={msg.fileUrl}
                                    chatType={selectedChat.chatType}
                                />
                            );

                        })}
                    </div>
                    {
                        selectedChat &&
                        <MessageInput
                            selectedChat={selectedChat}
                            smartReplies={smartReplySuggestions}
                            clearReplies={() => setSmartReplySuggestions([])}
                        />}

                </section>

            </div>

        </div>
    );
};

export default ChatScreen;