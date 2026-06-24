import React, { useRef, useState, useMemo } from 'react';
import { getMessage, uploadFile } from '../services/messageService';
import { toast } from 'react-toastify';
import { socket } from '../socket/socket';
import { predictiveTyping } from '../services/aiService';
import PredictiveSuggestions from './PredictiveSuggestions';
import debounce from "lodash/debounce";
import SmartReplies from './SmartReplies';

const MessageInput = ({ selectedChat, smartReplies, clearReplies }) => {

    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    const [fileDetails, setFileDetails] = useState(null)
    const [uploading, setUploading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const fileInputRef = useRef()

    const handleSend = (e) => {

        e.preventDefault();
        if (uploading) {
            return toast.info("Please wait, file is uploading...");
        }
        if (!selectedChat) {
            return toast.error("Select a chat first");
        }

        if (!message.trim() && !fileDetails) {
            return;
        }

        socket.emit(
            "send-message",
            {
                chatId: selectedChat.chatId,
                message: message.trim() || null,
                fileUrl: fileDetails?.fileUrl || null,
                messageType: fileDetails?.messageType || "text"
            },
            (response) => {

                if (!response.success) {
                    toast.error(response.message);
                    return;
                }

                setMessage("");
                setFile(null);
                setFileDetails(null);
                setMessage("");
                clearReplies();
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }

            }
        );

    };
    const uploadSelectedFile = async (selectedFile) => {

        try {

            setUploading(true);

            const formData = new FormData();

            formData.append("file", selectedFile);

            const res = await uploadFile(formData);

            setFileDetails(res.data);

            toast.success("File uploaded");

        } catch (error) {

            setFile(null);
            setFileDetails(null);

            toast.error(
                error.response?.data?.message ||
                "File upload failed"
            );

        } finally {

            setUploading(false);

        }

    };

    // const handleChange = (e) => {
    //     setMessage(e.target.value);

    //     if (selectedChat) {
    //         socket.emit("typing", selectedChat.chatId);
    //     }
    // };
    const removeFile = () => {

        setFile(null);

        setFileDetails(null);
        setSuggestions([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

    };
    const handleChange = (e) => {

        const value = e.target.value;

        setMessage(value);

        if (selectedChat) {
            socket.emit("typing", selectedChat.chatId);
        }

        if (uploading) return;

        if (value.trim().length < 3) {
            setSuggestions([]);
            return;
        }

        fetchSuggestions(value);

    };
    const fetchSuggestions = useMemo(
        () =>
            debounce(async (value) => {
                try {
                    const res = await predictiveTyping(value);
                    setSuggestions(res.data);
                } catch (err) {
                    console.log(err);
                }
            }, 500),
        []
    );
    return (
        <div className="border-t border-blue-500/30 p-4">
            {file && (

                <div className="mb-3 flex items-center justify-between rounded-lg bg-blue-900/20 border border-blue-500/20 p-3">

                    <div>

                        <p className="text-white text-sm">
                            {file.name}
                        </p>

                        {uploading ? (
                            <p className="text-xs text-yellow-400">
                                Uploading...
                            </p>
                        ) : (
                            <p className="text-xs text-green-400">
                                Uploaded ✓
                            </p>
                        )}

                    </div>

                    <button
                        type="button"
                        onClick={removeFile}
                        className="text-red-400"
                    >
                        ✕
                    </button>

                </div>

            )}
            <PredictiveSuggestions
                suggestions={suggestions}
                onSelect={(text) => {
                    setMessage(prev => prev ? `${prev} ${text}` : text);
                    setSuggestions([]);
                }}
            />
            <SmartReplies
                replies={smartReplies}
                onSelect={(text) => {
                    setMessage(text);
                    clearReplies();
                }}
            />
            <form
                className="flex gap-3"
                onSubmit={handleSend}
            >
                <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="text-2xl text-gray-300 hover:text-white"
                >
                    📎
                </button>
                <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    onChange={(e) => {

                        const selectedFile = e.target.files[0];

                        if (!selectedFile) return;

                        setFile(selectedFile);

                        uploadSelectedFile(selectedFile);

                    }}
                />
                <input
                    type="text"
                    value={message}
                    placeholder="Type a message..."
                    onChange={handleChange}
                    className="flex-1 px-4 py-3 bg-transparent border border-blue-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    disabled={uploading}
                    className={`px-8 py-3 rounded-lg font-semibold text-white
    ${uploading
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-500"
                        }`}
                >
                    {uploading ? "Uploading..." : "Send"}
                </button>

            </form>

        </div>
    );
};

export default MessageInput;