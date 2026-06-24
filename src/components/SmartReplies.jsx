const SmartReplies = ({ replies, onSelect }) => {

    if (!replies.length) return null;

    return (
        <div className="flex gap-2 p-2 border-t border-gray-700">

            {replies.map((reply, index) => (

                <button
                    key={index}
                    onClick={() => onSelect(reply)}
                    className="px-3 py-1 rounded-full bg-gray-700 text-white"
                >
                    {reply}
                </button>

            ))}

        </div>
    );
};

export default SmartReplies;