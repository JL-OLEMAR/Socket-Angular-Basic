import { Usuario } from './usuario'

export class UsuariosLista {
  private lista: Usuario[] = []

  // constructor() {}

  // Agregar un usuario
  public agregar (usuario: Usuario): Usuario {
    this.lista.push(usuario)
    return usuario
  }

  // Actualizar nombre de usuario
  public actualizarNombre (id: string, nombre: string): void {
    for (const usuario of this.lista) {
      if (usuario.id === id) {
        usuario.nombre = nombre
        break
      }
    }
  }

  // Obtener lista de todos los usuarios que no tengan como nombre 'sin-nombre'
  public getLista (): Usuario[] {
    return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre')
  }

  // Obtener un usuario
  public getUsuario (id: string): Usuario | undefined {
    return this.lista.find(usuario => usuario.id === id)
  }

  // Obtener usuarios en una sala en particular
  public getUsuariosEnSala (sala: string): Usuario[] {
    return this.lista.filter(usuario => usuario.sala === sala)
  }

  // Borrar un usuario
  public borrarUsuario (id: string): Usuario | undefined {
    const tempUsuario = this.getUsuario(id)

    // Eliminar el usuario de la lista
    this.lista = this.lista.filter(usuario => usuario.id !== id)
    return tempUsuario
  }
}
