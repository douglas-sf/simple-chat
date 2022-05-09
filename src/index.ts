import { connect } from './database';
import { Server } from './server';

const port = process.env.PORT || 3030;

const server = new Server();

connect().then(() => {
  server.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
