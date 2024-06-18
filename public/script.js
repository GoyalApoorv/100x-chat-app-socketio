const socket = io();
const messageInput = document.getElementById('inputMessage');
const sendButton = document.getElementById('send-button');
let message = "";

// Word-Emoji Mapping
const wordEmojiMap = {
  "Hello": "👋🏻",
  "congratulations": "🎉",
  "like": "❤️",
  "react": "⚛️"
  // Add more mappings as needed
};

function sendMessage() {
  message = messageInput.value;

  // Replace words with emojis using the wordEmojiMap
  const modifiedMessage = message.replace(/(:\)|:\(|<3|Hello|congratulations|like|react)/g, match => wordEmojiMap[match] || match);

  if (modifiedMessage.trim() !== '') {
    socket.emit('chat message', modifiedMessage); 
    messageInput.value = ''; // Clear input field after sending
  }
}

// Listen for incoming messages
socket.on('chat message', (msg) => {
  const messagesList = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'message';
  div.textContent = msg;
  messagesList.appendChild(div);
});

// Send message on Enter key press
messageInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});

// Send message on button click
sendButton.addEventListener('click', (event) => {
  event.preventDefault();
  sendMessage();
});
