/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Socket } from 'socket.io'

// Metodo para desconexion de cliente del socket
export const desconectar = (cliente: Socket) => {
  cliente.on('disconnect', () => {
    console.log('❌ Cliente desconectado')
  })
}
