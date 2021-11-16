/* eslint-disable @typescript-eslint/explicit-function-return-type */
import socketIO, { Socket } from 'socket.io'

// Metodo para desconexion de cliente del socket
export const desconectar = (cliente: Socket) => {
  cliente.on('disconnect', () => {
    console.log('❌ Cliente desconectado')
  })
}

// Escuchar mensajes de cliente(angular)
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
  // Escuchar mensaje de cliente
  cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
    console.log('📬 Mensaje recibido', payload)

    // Emitir mensaje a todos los clientes
    io.emit('mensaje-nuevo', payload)
  })
}
