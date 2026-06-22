import React from "react";

const MessageBubble = ({
    message,
    isOwn,
    senderName,
    status,
    createdAt,
    messageType,
    fileUrl,
    chatType
}) => {

    const formatTime = (date) => {

        const now = new Date();
        const msgDate = new Date(date);

        const diff = now - msgDate;

        if (diff < 60000) {
            return "Now";
        }

        if (now.toDateString() === msgDate.toDateString()) {
            return msgDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            });
        }

        return msgDate.toLocaleDateString("en-GB");

    };

    return (
        <div
            className={`flex mb-2 ${isOwn ? "justify-end" : "justify-start"
                }`}
        >

            <div
                className={`max-w-[340px] rounded-2xl px-3 py-2 shadow ${isOwn
                    ? "bg-blue-600 rounded-br-md"
                    : "bg-[#202c33] rounded-bl-md"
                    }`}
            >

                {/* Sender */}
                {chatType === "group" && (
                    <p
                        className={`text-[11px] font-semibold mb-1 ${isOwn
                                ? "text-green-300"
                                : "text-cyan-300"
                            }`}
                    >
                        {senderName}
                    </p>
                )}
                {/* TEXT */}
                {messageType === "text" && (
                    <>
                        <p className="text-white text-sm break-words pr-12">
                            {message}
                        </p>

                        <div className="flex justify-end items-center gap-1 mt-1">
                            <span className="text-[10px] text-gray-300">
                                {formatTime(createdAt)}
                            </span>

                            {isOwn && (
                                <span className="text-[10px]">
                                    {status === "sent" && "✓"}

                                    {status === "delivered" && "✓✓"}

                                    {status === "read" && (
                                        <span className="text-sky-300">
                                            ✓✓
                                        </span>
                                    )}
                                </span>
                            )}
                        </div>
                    </>
                )}
                {/* IMAGE */}
                {messageType === "image" && (
                    <>
                        <img
                            src={fileUrl}
                            alt="image"
                            className="rounded-lg max-h-72 object-cover"
                        />

                        {message && (
                            <p className="mt-2 text-sm text-white">
                                {message}
                            </p>
                        )}
                        <div className="flex justify-end items-center gap-1 mt-2">
                            <span className="text-[10px] text-gray-300">
                                {formatTime(createdAt)}
                            </span>

                            {isOwn && (
                                <span className="text-[10px]">
                                    {status === "sent" && "✓"}
                                    {status === "delivered" && "✓✓"}
                                    {status === "read" && (
                                        <span className="text-sky-300">
                                            ✓✓
                                        </span>
                                    )}
                                </span>
                            )}
                        </div>
                    </>
                )}

                {/* VIDEO */}
                {messageType === "video" && (
                    <>
                        <video
                            controls
                            className="rounded-lg max-h-72"
                        >
                            <source src={fileUrl} />
                        </video>

                        {message && (
                            <p className="mt-2 text-sm text-white">
                                {message}
                            </p>
                        )}
                        <div className="flex justify-end items-center gap-1 mt-2">
                            <span className="text-[10px] text-gray-300">
                                {formatTime(createdAt)}
                            </span>

                            {isOwn && (
                                <span className="text-[10px]">
                                    {status === "sent" && "✓"}
                                    {status === "delivered" && "✓✓"}
                                    {status === "read" && (
                                        <span className="text-sky-300">
                                            ✓✓
                                        </span>
                                    )}
                                </span>
                            )}
                        </div>
                    </>
                )}

                {/* AUDIO */}
                {messageType === "audio" && (
                    <>
                        <audio
                            controls
                            className="w-full"
                        >
                            <source src={fileUrl} />
                        </audio>

                        {message && (
                            <p className="mt-2 text-sm text-white">
                                {message}
                            </p>
                        )}<div className="flex justify-end items-center gap-1 mt-2">
                            <span className="text-[10px] text-gray-300">
                                {formatTime(createdAt)}
                            </span>

                            {isOwn && (
                                <span className="text-[10px]">
                                    {status === "sent" && "✓"}
                                    {status === "delivered" && "✓✓"}
                                    {status === "read" && (
                                        <span className="text-sky-300">
                                            ✓✓
                                        </span>
                                    )}
                                </span>
                            )}
                        </div>
                    </>
                )}

                {/* DOCUMENT */}
                {messageType === "document" && (
                    <div className="flex items-center gap-3 bg-black/20 rounded-lg p-3">

                        <div className="text-3xl">
                            📄
                        </div>

                        <div className="flex-1 overflow-hidden">

                            <a
                                href={fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-300 underline truncate block"
                            >
                                View Document
                            </a>

                            {message && (
                                <p className="text-sm text-white mt-1">
                                    {message}
                                </p>
                            )}

                        </div>
                        <div className="flex justify-end items-center gap-1 mt-2">
                            <span className="text-[10px] text-gray-300">
                                {formatTime(createdAt)}
                            </span>

                            {isOwn && (
                                <span className="text-[10px]">
                                    {status === "sent" && "✓"}
                                    {status === "delivered" && "✓✓"}
                                    {status === "read" && (
                                        <span className="text-sky-300">
                                            ✓✓
                                        </span>
                                    )}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Footer */}
                {/* <div className="flex justify-end items-center gap-1 mt-2">

                    <span className="text-[10px] text-gray-300">
                        {formatTime(createdAt)}
                    </span>

                    <span className="text-[10px]">

                        {status === "sent" && "✓"}

                        {status === "delivered" && "✓✓"}

                        {status === "read" && (
                            <span className="text-sky-300">
                                ✓✓
                            </span>
                        )}

                    </span>

                </div> */}

            </div>

        </div>
    );
};

export default MessageBubble;