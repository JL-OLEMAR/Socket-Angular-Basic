import express from 'express'
import http from 'http'
import socketIO from 'socket.io'
import { SERVER_PORT } from '../global/environment'

export default class Server {
  public app: express.Application
  public port: number
  public io: socketIO.Server
  private readonly httpServer: http.Server

  constructor () {
    this.app = express()
    this.port = SERVER_PORT
    this.httpServer = new http.Server(this.app)
    this.io = new socketIO.Server(this.httpServer, { cors: { origin: '*' } })
    this.escucharSockets()
  }

  // Escuchar conexiones de sockets
  private escucharSockets (): void {
    console.log('Escuchando conexiones - sockets')
    // Conectar cliente
    this.io.on('connection', cliente => {
      console.log('Cliente conectado')
    })
  }

  start (callback: Function): void {
    this.httpServer.listen(this.port, callback())
  }
}
