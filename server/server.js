const net = require('net');

const app = require('./app')

require('dotenv').config();

PORT = process.env.PORT || 3333;

const server = net.createServer(app);

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running on port ${PORT}`)
});
