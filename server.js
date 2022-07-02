require("dotenv").config({path: ".env"});
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const PORT = process.env.PORT;
const path = require("path");
const io = require("socket.io")(http);
const sequelize = require("sequelize");
const dbPath = path.resolve(__dirname, "chat.sqlite");
const sequelize1 = new sequelize("database", "username", "password", {
    host:"localhost",
    dialect: "sqlite",
    login: false,
    storage: dbPath
});

// load the chat model
const chat = require("./model/chat")(sequelize1, sequelize.DataTypes);
chat.sync();

app.use(express.static(path.join(__dirname, "public")));

// create a route
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

// "connection" event listening of socket.io
io.on("connection", (socket) => {
    console.log("Connection established");
    // listening disconnections
    socket.on("disconnect", function() {
        console.log("A user has disconneted");
    });

    // listen to comings in the room
    socket.on("enter_room", function(room) {
        socket.join(room); // room name passed in function join
    })

    // chat management
    socket.on("chat_message", function(msg) {
        // send the message to all connected user chat
        io.emit("received_message", msg);
    });
});


http.listen(PORT, function() {
    console.log(`Listening port ${PORT}`);
});

