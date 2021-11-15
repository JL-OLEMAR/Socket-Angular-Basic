/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Socket } from 'socket.io'

// Metodo para desconexion de cliente del socket
export const desconectar = (cliente: Socket) => {
  cliente.on('disconnect', () => {
    console.log('❌ Cliente desconectado')
  })
}

// Escuchar mensajes de cliente(angular)
export const mensaje = (cliente: Socket) => {
  cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
    console.log('📬 Mensaje recibido', payload)
  })
}
