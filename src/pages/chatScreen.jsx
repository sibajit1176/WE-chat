import React, { useEffect, useState } from 'react';

import Sidebar from '../components/Sidebar';
import ChatHeader from '../components/ChatHeader';
import MessageBubble from '../components/MessageBubble';
import MessageInput from '../components/MessageInput';
import { socket } from '../socket/socket';
import { getMessage } from '../services/messageService';
import { getUserDetails } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const ChatScreen = () => {
    const navigate = useNavigate()
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [userDetails, setUserDetails] = useState({})

    useEffect(() => {
        socket.connect();

        socket.on("connect", () => {
            console.log("Connected");
            console.log(socket.id);
        });
        getloginUserDetails()
        return () => {
            socket.off("connect");
            socket.disconnect();
        };
    }, [])
    
    useEffect(() => {
        if (!selectedChat) return
        getMssageforthisuser()
    }, [selectedChat])

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
    const getMssageforthisuser = async () => {
        try {
            const res = await getMessage(selectedChat.chatId)
            setMessages(res.data)
        } catch (error) {
            console.log(error);

        }
    }



    return (
        <div className="h-screen w-screen bg-black flex flex-col">

            {/* App Header */}
            <header className="h-16 border-b border-blue-500/50 bg-white/5 flex items-center justify-between px-6">

                <h1 className="text-2xl font-bold text-white">
                    WeChat
                </h1>

                <span className="text-white">
                    Sibajit
                </span>

            </header>

            <div className="flex flex-1 overflow-hidden">

                <Sidebar
                    setSelectedChat={setSelectedChat}
                />

                <section className="flex-1 flex flex-col">

                    <ChatHeader 
                    selectedChat={selectedChat}
                    />

                    <div className="flex-1 overflow-y-auto p-6 space-y-4">

                        {messages.map(
                            (msg) => (
                                <MessageBubble
                                    key={msg.messageId}
                                    message={
                                        msg.message
                                    }
                                    isOwn={
                                        msg.userId === userDetails.id
                                    }
                                />
                            )
                        )}

                    </div>

                    <MessageInput />

                </section>

            </div>

        </div>
    );
};

export default ChatScreen;