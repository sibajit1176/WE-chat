import React from 'react';

import Sidebar from '../components/Sidebar';
import ChatHeader from '../components/ChatHeader';
import MessageBubble from '../components/MessageBubble';
import MessageInput from '../components/MessageInput';

const ChatScreen = () => {

    const messages = [
        {
            id: 1,
            text: 'Hello 👋',
            isOwn: false
        },
        {
            id: 2,
            text: 'Hi, how are you?',
            isOwn: true
        },
        {
            id: 3,
            text: 'I am fine 😊',
            isOwn: false
        }
    ];

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

                <Sidebar />

                <section className="flex-1 flex flex-col">

                    <ChatHeader />

                    <div className="flex-1 overflow-y-auto p-6 space-y-4">

                        {messages.map(
                            (message) => (
                                <MessageBubble
                                    key={message.id}
                                    message={
                                        message.text
                                    }
                                    isOwn={
                                        message.isOwn
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