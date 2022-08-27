const io = require("socket.io")(8800, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let activeUsers = [];

io.on("connection", (socket) => {

    socket.on('new_user_add', (newUserId) => {
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({ userId: newUserId, socketId: socket.id });
        }
        console.log("active user", activeUsers);
        io.emit('get_user', activeUsers);
    })
    socket.on('send_messag', (data) => {
        const { receiverId } = data;
        const user = activeUsers.find((user) => user.userId === receiverId);
        console.log("sending from socket to:", receiverId);
        console.log("data", data);
        if (user) {
            io.to(user.socketId).emit('receive-message', data);
        }
    })
    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        console.log("disconnected user", activeUsers);
        io.emit('get_user', activeUsers);

    })
})