const socket = io();

const messageInput = document.getElementById('inputMessage');
const sendButton = document.getElementById('send-button');
const message = messageInput.value;

function sendMessage() {
  if (message.trim() !== '') {
    socket.emit('chat message', message ); 
  }// Sending message and room data
  messageInput.value = '';
  
}


socket.on('chat message', (msg) => {
  const messagesList = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'message';
  div.textContent = msg;
  messagesList.appendChild(div);
});

messageInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});

sendButton.addEventListener('click', (event)=> {
  event.preventDefault();
  sendMessage();
 });
 
