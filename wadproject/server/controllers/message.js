const Messages = require('../models/Messages')




const addmessage=async(req,res)=>{
    try {
        
        const {sender, receiver,msg} = req.body;

        const newMessage = new  Messages({
            sender : sender,
            receiver:receiver,
            message:msg
        })

        const saved = await newMessage.save();

        res.status(200).json({saved})
    
    } catch (error) {
        res.status(404).json({error:error})

    }
}



const getUsers=async(req,res)=>{
    try {
        
        const {userId} = req.body;

        const users = await Messages.find({ $or: [{ sender: userId }, { receiver: userId }] }).sort({ timestamp: -1 }); 
        const uniqueSenders = new Set();

        // Iterate over the messages and add unique sender IDs to the set
        for (const message of users) {
           if(message.sender != userId){
            uniqueSenders.add(message.sender);
          
           }
           if( message.receiver!=userId){
            uniqueSenders.add(message.receiver);
           }
            
        }

        // Convert the set to an array if needed
        const uniqueSendersArray = Array.from(uniqueSenders);

        // Send the unique sender IDs in the response
        res.status(200).json(uniqueSendersArray);
    
    } catch (error) {
        res.status(404).json({error:error})

    }
}


const getMessages=async(req,res)=>{
    try {
        
        const {userId,friendId} = req.body;

        const messages = await Messages.find({
            $or: [
              { $and: [{ sender: userId }, { receiver: friendId }] },
              { $and: [{ sender: friendId }, { receiver: userId }] }
            ]
          }).sort({ timestamp: -1 }); 
        
        // Send the unique sender IDs in the response
        res.status(200).json(messages);
    
    } catch (error) {
        res.status(404).json({error:error})

    }
}


module.exports = {addmessage,getUsers,getMessages}