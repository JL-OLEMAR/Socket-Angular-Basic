/* eslint-disable @typescript-eslint/explicit-function-return-type, standard/no-callback-literal */
import socketIO, { Socket } from 'socket.io'
import { Usuario } from '../class/usuario'
import { UsuariosLista } from '../class/usuarios-lista'

export const usuariosConectados = new UsuariosLista()

// Metodo que se ejecuta cuando un usuario se conecta
export const conectarCliente = (cliente: Socket) => {
  const usuario = new Usuario(cliente.id)
  console.log('✅ Cliente conectado', cliente.id)
  usuariosConectados.agregar(usuario)
}

// Metodo para desconexion de cliente del socket
export const desconectar = (cliente: Socket, io: socketIO.Server) => {
  cliente.on('disconnect', () => {
    console.log('❌ Cliente desconectado', cliente.id)
    usuariosConectados.borrarUsuario(cliente.id)

    io.emit('usuarios-activos', usuariosConectados.getLista())
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

// Escuchar configurandoUsuario, sirve para configurar el nombre de usuario
export const configurandoUsuario = (cliente: Socket, io: socketIO.Server) => {
  // Escuchar mensaje de cliente
  cliente.on('configurar-usuario', (payload: { nombre: string }, callback: Function) => {
    usuariosConectados.actualizarNombre(cliente.id, payload.nombre)
    io.emit('usuarios-activos', usuariosConectados.getLista())

    // Mandar el callback al cliente, con los datos del usuario
    callback({
      ok: true,
      mensaje: `El usuario: ${payload.nombre} esta configurado`
    })
  })
}
