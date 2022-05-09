import { createServer, Server as HTTPServer } from 'http';
import { Server as WebSocketServer } from 'socket.io';

import app from './app';

import { getMessagesRepository } from './repositories/Messages';

export class Server {
  private server: HTTPServer;
  private io: WebSocketServer;

  constructor() {
    this.server = createServer(app);
    this.io = new WebSocketServer(this.server);

    this.initEvents();
  }

  private initEvents() {
    this.io.on('connect', (socket) => {
      console.log(`Socket connected: ${socket.id}`);

      const messagesRepository = getMessagesRepository();

      messagesRepository.find().then((messages) => {
        socket.emit('loadMessages', messages);
      });

      socket.on('sendMessage', async ({ name, text }) => {
        const message = messagesRepository.create({ name, text });

        await messagesRepository.save(message);

        socket.emit('receiveMessage', message);
        socket.broadcast.emit('receiveMessage', message);
      });
    });
  }

  public listen(port: string | number, callback: () => void) {
    this.server.listen(port, callback);
  }
}
