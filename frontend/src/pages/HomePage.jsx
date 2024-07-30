import { useEffect, useState } from "react";
import MessageForm from "../components/MessageForm";
import MessageList from "../components/MessageList";
import axios from "axios";

const HomePage = () => {
  const [messages, setMessages] = useState([]);
  const [editingMessage, setEditingMessage] = useState(null);

  useEffect(() => {
    axios.get("/api/messages").then((response) => {
      setMessages(response.data);
    });
  }, []);

  const saveMessage = (message) => {
    if (editingMessage) {
      axios
        .put(`/api/messages/${editingMessage._id}`, message)
        .then((response) => {
          setMessages(
            messages.map((msg) =>
              msg._id === editingMessage._id ? response.data : msg
            )
          );
          setEditingMessage(null);
        });
    } else {
      axios.post("/api/messages", message).then((response) => {
        setMessages([...messages, response.data]);
      });
    }
  };

  const deleteMessage = (id) => {
    axios.delete(`/api/messages/${id}`).then(() => {
      setMessages(messages.filter((msg) => msg._id !== id));
    });
  };

  const editMessage = (message) => {
    setEditingMessage(message);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mural de Mensagens</h1>
      <MessageForm onSave={saveMessage} />
      <MessageList
        messages={messages}
        onDelete={deleteMessage}
        onEdit={editMessage}
      />
    </div>
  );
};

export default HomePage;
