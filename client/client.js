require('dotenv').config()

const net = require('net')
const app = require('./app')

const socket = new net.Socket()

const connectionListener = () => app(socket)

socket.connect(process.env.PORT, '127.0.0.1', connectionListener)