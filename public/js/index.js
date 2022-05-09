const messages = document.querySelector('.messages');
const messageInput = document.querySelector('input[name="text"]');
const form = document.querySelector('form');

const socket = io();

function addMessage(message) {
  const { id, name, text, date: timestamp } = message;

  const divMessage = document.createElement('div');
  const date = new Date(timestamp);
  const day = date.toLocaleDateString('pt-BR');
  const hour = date.toLocaleTimeString('pt-BR');

  divMessage.className = 'message';
  divMessage.id = `message-${id}`;

  divMessage.innerHTML = `<strong>${name}:</strong><span>${text}</span><small>${day} às ${hour}</small>`;

  messages.appendChild(divMessage);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const message = Object.fromEntries(formData);

  socket.emit('sendMessage', message);
  messageInput.value = '';
});

socket.on('receiveMessage', addMessage);

socket.on('loadMessages', (messages) => {
  messages.forEach(addMessage);
});
