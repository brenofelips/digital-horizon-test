const MessageList = ({ messages, onDelete, onEdit }) => {
  return (
    <div className="space-y-4 mt-6">
      {messages.map((message) => (
        <div
          key={message._id}
          className="p-4 border border-gray-300 rounded-md"
        >
          <h3 className="text-lg font-bold">{message.title}</h3>
          <p>{message.description}</p>
          <div className="mt-2 space-x-2">
            <button
              onClick={() => onEdit(message)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(message._id)}
              className="px-4 py-2 bg-red-600 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
