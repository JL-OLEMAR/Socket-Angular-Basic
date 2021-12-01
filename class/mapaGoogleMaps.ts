/* eslint-disable @typescript-eslint/no-for-in-array */
import { Marcador } from './marcador'

export class MapaGoogleMaps {
  private marcadores: Marcador[] = []

  // constructor() {}

  getMarcadores (): Marcador[] {
    return this.marcadores
  }

  agregarMarcador (marcador: Marcador): void {
    this.marcadores.push(marcador)
  }

  borrarMarcador (id: string): Marcador[] {
    this.marcadores = this.marcadores.filter(mark => (mark.id !== id))
    return this.marcadores
  }

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
