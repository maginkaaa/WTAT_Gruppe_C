const socket = require("socket.io");
let ioInstance; // Define a variable to hold the io instance

$("#jobNotification").submit(() => {
    ioInstance.emit("message");
    $("#addInfo").val("");
    return false;
});

ioInstance.on("message", (message) => {
    displayMessage(message.content);
});

let displayMessage = (message) => {
    $("#notification").prepend($("<li>").html(message));
};

module.exports = {
    configure: (io) => {
        ioInstance = io; // Assign the io instance to the variable
        ioInstance.on("connection", (client) => {
            console.log("New connection");

            client.on("disconnect", () => {
                console.log("User disconnected");
            });

            client.on("newJobNotification", (job) => {
                // Emit a socket event to all connected job seekers with the new job details
                ioInstance.emit("jobNotification", job);
            });
        });
    }
};
