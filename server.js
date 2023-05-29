const { instrument } = require('@socket.io/admin-ui');

const io = require("socket.io")(8900, {
    cors: {
        origin:"http://localhost:3000"
    }    
});

instrument(io, {
    auth: false
})

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

    socket.on("join", (data) => {
        console.log("Data:", data);
    });
});