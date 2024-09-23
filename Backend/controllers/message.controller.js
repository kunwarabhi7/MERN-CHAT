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

   export const getMessage = async(req,res) => {
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants : {
                $all : [senderId,userToChatId]
            }
        }).populate("message")
        if(!conversation) {
            return res.status(200).json([]);
        }
        res.status(200).json(conversation.message);
    } catch (error) {
        console.log("Error in get  Message controller" ,error.message);
    res.status(500).json({error: "Internal Server Error" , message: error.message})
    }
   }