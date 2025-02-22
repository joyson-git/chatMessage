let stompClient = null;

function connect() {
    const socket = new SockJS('/server1');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/return-to', function (message) {
            showMessage(JSON.parse(message.body));
        });
    });
}

function sendMessage() {
    const name = document.getElementById('name').value;
    const content = document.getElementById('content').value;
    stompClient.send("/app/message", {}, JSON.stringify({'name': name, 'content': content}));
}

function showMessage(message) {
    const messages = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = message.name + ": " + message.content;
    messages.appendChild(messageElement);
}

connect();
