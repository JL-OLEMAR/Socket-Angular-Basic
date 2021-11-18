/* eslint-disable @typescript-eslint/explicit-function-return-type, standard/no-callback-literal */
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

// Escuchar evento, Configurar Usuario
export const configurandoUsuario = (cliente: Socket, io: socketIO.Server) => {
  // Escuchar mensaje de cliente
  cliente.on('configurar-usuario', (payload: { nombre: string }, callback: Function) => {
    console.log('🧑‍💻 Configurando Usuario:', payload.nombre)

    // Mandar el callback al cliente, con los datos del usuario
    callback({
      ok: true,
      mensaje: `El usuario: ${payload.nombre} esta configurado`
    })
  })
}
