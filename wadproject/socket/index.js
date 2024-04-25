const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:5173",
    },
  });
  

  let users = [];

  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  io.on('connection',(socket)=>{
    console.log('userconnected')

    io.emit('hello','this is socket')
    socket.on('adduser',id=>{
        addUser(id,socket.id)
        // console.log(users)
        io.emit('getUsers',users)
    })

    

    // for sending message 
    socket.on('sendmessage',({userId,receiver,text})=>{
        const user = getUser(receiver);
        // console.log(user)
        
       try {
        io.to(user.socketId).emit('getmessage',({
          userId,
          text
      }))
       } catch (error) {
        console.log('user is offline',error)
       }
    })


    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
      });
  })