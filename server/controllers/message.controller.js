import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const sender = req.user._id;
    const { id: reciever } = req.params;

    const newMessage = await new Message({ sender, reciever, message }).save();
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, reciever] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, reciever],
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    res.status(200).json(newMessage);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: reciever } = req.params;
    const sender = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [sender, reciever] },
    })
      .populate({ path: "messages" })
      .populate({ path: "participants" });

    if (!conversation) {
      return res.status(200).json(null);
    }

    res.status(200).json(conversation);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};
