const socket = io();

socket.on("connect", function() {
    socket.emit("enter_room", "general")
})

window.onload = function() {
    document.querySelector("form").addEventListener("submit", function(e) {
        e.preventDefault();
        const name = document.querySelector(".name");
        const message = document.querySelector(".message");
        console.log(name, message);
        socket.emit("chat_message", {
            name: name.value,
            message: message.value
        });
        document.querySelector(".messages").value = "";
    });
    socket.on("received_message", function(msg) {
        console.log(msg);
        document.querySelector(".messages").innerHTML += `<p>${msg.name}: ${msg.message}</p>`;
    });

    document.querySelectorAll(".tabs li").forEach((tab) => {
        tab.addEventListener("click", function() {
            if(!this.classList.contains("active")) {
                let active = document.querySelector(".tabs li.active");
                active.classList.remove("active");
                this.classList.add("active");
                document.querySelector(".messages").innerHTML = "";
                socket.emit("enter_room", this.dataset.room);
            }
        });
    });

}

