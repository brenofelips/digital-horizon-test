import Message from "../models/MessageModal.js";

export const createMessage = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newMessage = new Message({ title, description });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to create message" });
  }
};

export const updateMessage = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { title, description, updatedAt: Date.now() },
      { new: true },
    );
    if (!updatedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.json(updatedMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to update message" });
  }
};

export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMessage = await Message.findByIdAndDelete(id);
    if (!deletedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete message" });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

export const getMessageById = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch message" });
  }
};
