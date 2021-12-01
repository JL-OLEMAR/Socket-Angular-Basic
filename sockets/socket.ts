/* eslint-disable @typescript-eslint/explicit-function-return-type, standard/no-callback-literal */
import socketIO, { Socket } from 'socket.io'
import { Mapa } from '../class/mapa'
import { MapaGoogleMaps } from '../class/mapaGoogleMaps'
import { Marcador } from '../class/marcador'
import { Usuario } from '../class/usuario'
import { UsuariosLista } from '../class/usuarios-lista'

export const mapa = new Mapa()
export const mapaGoogleMaps = new MapaGoogleMaps()
export const usuariosConectados = new UsuariosLista()

// -------------------Conexion de un cliente---------------------------------------------

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

// -------------------Usuarios-----------------------------------------------------------

// Escuchar configurandoUsuario, sirve para configurar el nombre de usuario
export const configurandoUsuario = (cliente: Socket, io: socketIO.Server) => {
  // Escuchar mensaje de cliente para configurar el nombre de usuario
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

// Obtener lista de usuarios activos
export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {
  // Escuchar evento obtener usuarios
  cliente.on('obtener-usuarios', () => {
    // Emitir el evento 'usuarios-activos' solo a este cliente
    io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista())
  })
}

// -------------------Mensajes-----------------------------------------------------------

// Escuchar mensajes de cliente(angular)
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
  // Escuchar mensaje de cliente
  cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
    console.log('📬 Mensaje recibido', payload)

    // Emitir mensaje a todos los clientes
    io.emit('mensaje-nuevo', payload)
  })
}

// -------------------Mapas--------------------------------------------------------------

// Escuchar mensajes de cliente(angular)
export const mapaSockets = (cliente: Socket) => {
  // Escuchar 'marcador-nuevo' del cliente
  cliente.on('marcador-nuevo', (marcador: Marcador) => {
    mapa.agregarMarcador(marcador)

    // El broadcast significa que se envia a todos los clientes excepto al que lo envia
    cliente.broadcast.emit('marcador-nuevo', marcador)
  })

  // Escuchar 'marcador-borrar' del cliente
  cliente.on('marcador-borrar', (id: string) => {
    mapa.borrarMarcador(id)

    // El broadcast significa que se envia a todos los clientes excepto al que lo envia
    cliente.broadcast.emit('marcador-borrar', id)
  })

  // Escuchar 'marcador-mover' del cliente
  cliente.on('marcador-mover', (marcador: Marcador) => {
    mapa.moverMarcador(marcador)

    // El broadcast significa que se envia a todos los clientes excepto al que lo envia
    cliente.broadcast.emit('marcador-mover', marcador)
  })
}

// -------------------GoogleMaps---------------------------------------------------------

// Escuchar mensajes de cliente(angular)
export const GoogleMapsSockets = (cliente: Socket) => {
  // Escuchar 'marcador-nuevo' del cliente
  cliente.on('marcador-nuevo', (marcador: Marcador) => {
    mapaGoogleMaps.agregarMarcador(marcador)

    // El broadcast significa que se envia a todos los clientes excepto al que lo envia
    cliente.broadcast.emit('marcador-nuevo', marcador)
  })

  // Escuchar 'marcador-borrar' del cliente
  cliente.on('marcador-borrar', (id: string) => {
    mapaGoogleMaps.borrarMarcador(id)

    // El broadcast significa que se envia a todos los clientes excepto al que lo envia
    cliente.broadcast.emit('marcador-borrar', id)
  })

  // Escuchar 'marcador-mover' del cliente
  cliente.on('marcador-mover', (marcador: Marcador) => {
    mapaGoogleMaps.moverMarcador(marcador)

    // El broadcast significa que se envia a todos los clientes excepto al que lo envia
    cliente.broadcast.emit('marcador-mover', marcador)
  })
}
