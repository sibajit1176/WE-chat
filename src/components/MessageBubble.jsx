import React from 'react';

const MessageBubble = ({ message, isOwn }) => {
    return (
        <div
            className={`flex ${
                isOwn
                    ? 'justify-end'
                    : 'justify-start'
            }`}
        >

            <div
                className={`px-4 py-3 rounded-2xl max-w-xs text-white ${
                    isOwn
                        ? 'bg-blue-600'
                        : 'bg-white/10 border border-blue-500/30'
                }`}
            >
                {message}
            </div>

        </div>
    );
};

export default MessageBubble;