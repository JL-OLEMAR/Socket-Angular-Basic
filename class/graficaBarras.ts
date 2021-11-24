export class GraficaBarraData {
  private labels: string[] = []
  private readonly unidades: number[] = [0, 0, 0, 0]

  setLabels (labels: string[]): void {
    this.labels = labels
  }

  // Mostrar datos de la grafica
  getDataGraficaBarra (): any {
    return [{ data: this.unidades, label: 'Preguntas' }]
  }

  // Incrementar unidades a la grafica segun la opcion de la pregunta
  incrementarUnidades (opcion: number, unidades: number): any {
    this.unidades[opcion] += unidades
    return this.getDataGraficaBarra()
  }
}
