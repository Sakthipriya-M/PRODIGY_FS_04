const socket = io();

document.getElementById('join-chat').onclick = () => {
    const username = document.getElementById('username').value;
    if (username) {
        socket.emit('join', username);
        document.getElementById('user-container').style.display = 'none';
        document.getElementById('room-container').style.display = 'block';
    }
};

socket.on('roomList', rooms => {
    const roomList = document.getElementById('room-list');
    roomList.innerHTML = '';
    rooms.forEach(room => {
        const roomButton = document.createElement('button');
        roomButton.innerText = room;
        roomButton.onclick = () => {
            socket.emit('joinRoom', room);
            document.getElementById('chat-room').style.display = 'block';
        };
        roomList.appendChild(roomButton);
    });
});

document.getElementById('send-message').onclick = () => {
    const message = document.getElementById('message-input').value;
    socket.emit('message', message);
    document.getElementById('message-input').value = '';
};

socket.on('message', message => {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.innerText = message;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
