import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPowerOff, FaPlus } from "react-icons/fa";
import MessageForm from "../components/MessageForm";
import MessageList from "../components/MessageList";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";

const HomePage = () => {
  const [messages, setMessages] = useState([]);
  const [editingMessage, setEditingMessage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const token = window.localStorage.getItem("token");
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await api.get("/messages", {
        headers: {
          Authorization: token,
        },
      });
      setMessages(response.data);
    }
    fetchData();
  }, []);

  const saveMessage = async (message) => {
    if (editingMessage && editingMessage?._id) {
      const response = await api.put(
        `/messages/${editingMessage._id}`,
        message,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const msgs = messages.map((msg) =>
        msg._id === editingMessage._id ? response.data : msg
      );
      setMessages(msgs);
      setEditingMessage(null);
      setShowForm(false);
    } else {
      const response = await api.post("/messages", message, {
        headers: {
          Authorization: token,
        },
      });
      setMessages([...messages, response.data]);
      setShowForm(false);
    }
  };

  const deleteMessage = async (id) => {
    await api.delete(`/messages/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    setMessages(messages.filter((msg) => msg._id !== id));
  };

  const editMessage = (message) => {
    setShowForm(true);
    setEditingMessage(message);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const showComponent = () => (
    <>
      {showForm ? (
        <MessageForm onSave={saveMessage} setShowForm={setShowForm} />
      ) : (
        <MessageList
          messages={messages}
          onDelete={deleteMessage}
          onEdit={editMessage}
        />
      )}
    </>
  );

  return (
    <>
      <header className="bg-bg-darking p-6 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Messages Board</h1>
          </div>
          <nav className="flex items-center">
            <button
              type="button"
              className="px-2 py-1 bg-bg-darking text-white rounded-md"
              onClick={() => setShowForm(true)}
            >
              Create Message
            </button>
            <button
              type="button"
              className="px-2 py-2 bg-bg-darking text-white rounded-md"
              onClick={handleLogout}
            >
              <FaPowerOff />
            </button>
          </nav>
        </div>
      </header>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center"></div>
        {showComponent()}
      </div>
    </>
  );
};

export default HomePage;
