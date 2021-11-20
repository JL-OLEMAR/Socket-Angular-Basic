import { Usuario } from './usuario'

export class UsuariosLista {
  private lista: Usuario[] = []

  // constructor() {}

  // Agregar un usuario
  public agregar (usuario: Usuario): Usuario {
    this.lista.push(usuario)
    console.log(this.lista)
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

    console.log('==== Actualizando usuario ====')
    console.log(this.lista)
  }

  // Obtener lista de usuarios
  public getLista (): Usuario[] {
    return this.lista
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

    // Muestra a todos los usuarios, cuyo id sea diferente al que se quiere borrar
    this.lista = this.lista.filter(usuario => usuario.id !== id)

    console.log('==== Borrando usuario ====')
    console.log(this.lista)

    return tempUsuario
  }
}
