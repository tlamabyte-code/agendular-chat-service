const PORT = 8080 

const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')

app.use(cors())

const server = http.createServer(app)

const { Server } = require('socket.io')

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["ngrok-skip-browser-warning"]
    }
})

app.get('/', (req, res) => {
    res.send("Websocket Server")
})

io.on("connection", (socket) => {
    console.log('Cliente Conectado')
    
    socket.on("message", (msg) => {
        console.log(`Nuevo Mensaje: ${msg}`)

        io.emit('message', msg)
    })

    socket.on("disconnect", () => {
        console.log('Cliente desconectado')
    })
})

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server corriendo en puerto:${PORT}`)
})
