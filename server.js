const io = require("socket.io")(8900, {
    cors: {
        origin:"http://192.168.1.205:3000"
    }
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user)=>user.userId === userId) && users.push({userId, socketId});
}


io.on('connection', (socket)=> {

    console.log("A user is connected");

    socket.on("addUser", userId => {
        addUser(userId, socketId);
        io.emit("getUsers", users)
    });

    socket.on("join", (data)=>{
        console.log("Data:", data);
    });
});