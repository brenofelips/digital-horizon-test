import { FaEdit, FaTrash } from "react-icons/fa";

const MessageList = ({ messages, onDelete, onEdit }) => {
  return (
    <ul role="list" className="p-4 divide-y divide-bg-darking">
      {messages?.map((message) => (
        <li
          key={message?._id}
          className="flex items-center justify-between gap-x-6 py-5"
        >
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-lg leading-6 text-gray-500">
                Title: {message?.title}
              </p>
              <p className="mt-1 truncate text-lg leading-5 text-gray-500">
                Description: {message?.description}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-center">
            <div className="mt-1 flex items-center gap-x-1.5">
              <button
                onClick={() => onEdit(message)}
                className="px-2 py-2 bg-bg-darking text-white rounded-md"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(message?._id)}
                className="px-2 py-2 bg-bg-darking text-white rounded-md"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
