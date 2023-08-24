const socket = io();



function sendMessage() {
  const messageInput = document.getElementById('inputMessage');
  const room = document.getElementById('room').value;
  const message = messageInput.value;
  if (message.trim() !== '') {
    socket.emit('chat message', { room, message }); // Sending message and room data
    messageInput.value = '';
  }
}

socket.on('chat message', (msg) => {
  const messagesList = document.getElementById('chat-messages');
  const li = document.createElement('li');
  li.textContent = msg;
  messagesList.appendChild(li);
});
