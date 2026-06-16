import React from 'react';

const ChatHeader = () => {
    return (
        <div className="h-16 border-b border-blue-500/30 flex items-center px-6">

            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
                R
            </div>

            <div>

                <h2 className="text-white font-semibold">
                    Rahul
                </h2>

                <p className="text-green-400 text-xs">
                    Online
                </p>

            </div>

        </div>
    );
};

export default ChatHeader;