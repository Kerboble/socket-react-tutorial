const express = require('express');
const app = express();
const http = require("http");
const { Server } = require('socket.io') //server is a class so the syntax 'new' is needed in order to use it
const cors = require("cors");

app.use(cors());


const server = http.createServer(app)


//passing our http server

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"  //this is the link to our front end or client
    }
});

//this listens to events from the client side
io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`)

    socket.on("join_room", (data) => {
        socket.join(data);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("received_message", data)
    })
})    

server.listen(5174, () => {
    console.log('sever is running')
})