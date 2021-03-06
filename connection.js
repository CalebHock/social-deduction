// for production, use 'wss' instead of 'ws'
const ws = new WebSocket("ws://localhost:8082");

// Set display name
let id;
function onNameSubmit(event) {
    id = document.getElementById("login-txt").value;
    if (id != "") {
        $("#login-modal").modal('hide');
        ws.send(JSON.stringify({
            id: "Server",
            msg: id + " has connected."
        }));
    }
    return false;
}
function onNameChange(event) {
    let input = document.getElementById("settings-txt").value;
    if (input != "" && input != id) {

        ws.send(JSON.stringify({
            id: "Server",
            msg: id + " changed their id to " + input + "."
        }));

        id = input;
        let nameChange = document.getElementById("alert-name-change");
        if (nameChange != undefined) {
            nameChange.parentNode.removeChild(nameChange);
        }
        nameChange = document.createElement("div");
        nameChange.id = "alert-name-change";
        nameChange.setAttribute('class', 'alert');
        nameChange.setAttribute('class', 'alert-primary');
        nameChange.textContent = "id changed to " + name;
        
        $("#settings-modal-body").append(nameChange);
        document.getElementById("settings-txt").value = "";
    }
    return false;
}

function disconnect(event) {

}

// Send message
function onFormSubmit(event) {
    sendMessage();
    return false;
}
function sendMessage() {
    let message = document.getElementById("send-txt").value;
    ws.send(JSON.stringify({
        id: id,
        msg: message
    }));

    document.getElementById("send-txt").value = "";
}

// Receive messge
ws.addEventListener("message", data => {
    message = JSON.parse(data.data);
    let newMessage = document.createElement("div");
    newMessage.textContent = message.id + ": " + message.msg;
    newMessage.setAttribute("title", new Date().toISOString());
    $("#app-messages").append(newMessage);
    console.log(message.msg);
});

function openSettings() {
    $("#settings-modal").modal('show');
}
function resetSettings() {
    let nameChange = document.getElementById("alert-name-change");
    if (nameChange != undefined) {
        nameChange.parentNode.removeChild(nameChange);
    }
}
