/* eslint-disable @typescript-eslint/no-dynamic-delete */
import { Marcador } from './marcador'

export class Mapa {
  // Propiedad marcadores de tipo objeto, que contendra un array de Marcador
  private readonly marcadores: {[key: string]: Marcador} = {}

  // constructor() {}

  // getter para obtener el array de marcadores
  getMarcadores (): {[key: string]: Marcador} {
    return this.marcadores
  }

  // Metodo para agregar un marcador al mapa
  agregarMarcador (marcador: Marcador): void {
    this.marcadores[marcador.id] = marcador
  }

  // Metodo para botar un marcador en el mapa
  borrarMarcador (id: string): {[key: string]: Marcador} {
    delete this.marcadores[id]
    return this.getMarcadores()
  }

  // Metodo para mover un marcador en el mapa
  // moverMarcador (marcador: Marcador): void {
  //   this.marcadores[marcador.id].lng = marcador.lng
  //   this.marcadores[marcador.id].lat = marcador.lat
  // }

  moverMarcador (marcador: Marcador): void {
    for (const i in this.marcadores) {
      if (this.marcadores[i].id === marcador.id) {
        this.marcadores[i].lat = marcador.lat
        this.marcadores[i].lng = marcador.lng
        break
      }
    }
  }
}
