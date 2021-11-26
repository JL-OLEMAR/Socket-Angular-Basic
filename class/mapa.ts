/* eslint-disable @typescript-eslint/no-dynamic-delete */
import { Marcador } from './marcador'

export class Mapa {
  // Propiedad marcadores de tipo objeto, que contendra un array de Marcador
  private readonly marcadores: {[key: string]: Marcador} = {
    1: {
      id: '1',
      nombre: 'Fernando',
      lng: -75.75512993582937,
      lat: 45.349977429009954,
      color: '#dd8fee'
    },
    2: {
      id: '2',
      nombre: 'Amy',
      lng: -75.75195645527508,
      lat: 45.351584045823756,
      color: '#790af0'
    },
    3: {
      id: '3',
      nombre: 'Orlando',
      lng: -75.75900589557777,
      lat: 45.34794635758547,
      color: '#19884b'
    }
  }

  // constructor() {}

  // getter para obtener el array de marcadores
  getMarcadores (): {[key: string]: Marcador} {
    return this.marcadores
  }

  // Metodo para botar un marcador en el mapa
  borrarMarcador (id: string): {[key: string]: Marcador} {
    delete this.marcadores[id]
    return this.getMarcadores()
  }

  // Metodo para mover un marcador en el mapa
  moverMarcador (marcador: Marcador): void {
    this.marcadores[marcador.id].lng = marcador.lng
    this.marcadores[marcador.id].lat = marcador.lat
  }
}
