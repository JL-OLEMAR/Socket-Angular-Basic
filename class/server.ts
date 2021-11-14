/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import express from 'express'
import http from 'http'
import socketIO from 'socket.io'
import { SERVER_PORT } from '../global/environment'

export default class Server {
  public app: express.Application
  public port: number
  public io: socketIO.Server
  private static _instance: Server
  private readonly httpServer: http.Server

  private constructor () {
    this.app = express()
    this.port = SERVER_PORT
    this.httpServer = new http.Server(this.app) // Crear servidor http para escuchar conexiones
    this.io = new socketIO.Server(this.httpServer, { cors: { origin: '*' } }) // Crear servidor de sockets
    this.escucharSockets()
  }

  // Patron Singleton para evitar crear multiples instancias de la clase
  public static get instance (): Server {
    return this._instance || (this._instance = new this())
  }

  // Escuchar conexiones de sockets
  private escucharSockets (): void {
    console.log('Escuchando conexiones - sockets')
    // Conectar cliente con el servidor
    this.io.on('connection', cliente => {
      console.log('Cliente conectado')
    })
  }

  start (callback: Function): void {
    this.httpServer.listen(this.port, callback())
  }
}
