const PredictiveSuggestions = ({ suggestions, onSelect }) => {
    if (!suggestions.length) return null;

    return (
        <div className="flex gap-2 mb-2 flex-wrap">
            {suggestions.map((item, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => onSelect(item)}
                    className="px-3 py-1 rounded-full bg-blue-600 text-white text-sm"
                >
                    {item}
                </button>
            ))}
        </div>
    );
};

export default PredictiveSuggestions;