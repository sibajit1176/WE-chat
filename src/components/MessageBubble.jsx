import React from "react";

const MessageBubble = ({
    message,
    isOwn,
    senderName,
    status,
    createdAt
}) => {

    const formatTime = (date) => {

        const now = new Date();
        const msgDate = new Date(date);

        const diff = now - msgDate;

        // Less than 1 minute
        if (diff < 60000) {
            return "Few seconds ago";
        }

        // Same day
        if (now.toDateString() === msgDate.toDateString()) {
            return msgDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            });
        }

        // Older than today
        return msgDate.toLocaleDateString("en-GB");
    };

    return (
        <div
            className={`flex mb-1 ${
                isOwn ? "justify-end" : "justify-start"
            }`}
        >
            <div
                className={`max-w-[68%] min-w-[80px] px-2.5 py-1.5 rounded-2xl shadow ${
                    isOwn
                        ? "bg-blue-600 rounded-br-md"
                        : "bg-[#202c33] rounded-bl-md"
                }`}
            >
                {/* Sender */}
                <p className="text-[10px] font-medium text-cyan-300 mb-0.5">
                    {senderName}
                </p>

                {/* Message */}
                <p className="text-[13px] text-white break-words leading-[18px]">
                    {message}
                </p>

                {/* Time + Status */}
                <div className="flex justify-end items-center gap-1 mt-1">
                    <span className="text-[9px] text-gray-300">
                        {formatTime(createdAt)}
                    </span>

                    <span className="text-[9px] text-gray-300">
                        {status === "sent" && "✓"}

                        {status === "delivered" && "✓✓"}

                        {status === "read" && (
                            <span className="text-sky-300">
                                ✓✓
                            </span>
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;