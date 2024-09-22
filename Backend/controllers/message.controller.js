import Conversation from "../models/conversation.models.js";
import Message from "../models/message.models.js";

export const sendMessage = async (req,res) =>{
   try {
 const {message} = req.body;
 const {id : reciverId} = req.params;
 const senderId = req.user._id;

  let conversation = await Conversation.findOne({
    participants : {
      $all : [senderId,reciverId]}
  })
if (!conversation){
    conversation = await Conversation.create({
        participants : [senderId,reciverId]
    })
}
  const newMessage = new Message({
    senderId,reciverId,message
  });

  if(newMessage){
    conversation.message.push(newMessage._id);
  }
  // run in parrellel 
  await Promise.all([conversation.save(),newMessage.save()]);
//   await conversation.save();
//   await newMessage.save();
  res.status(201).json(newMessage);
   } catch (error) {
    console.log("Error in Sending Message" ,error.message);
    res.status(500).json({error: "Internal Server Error" , message: error.message})
   }}