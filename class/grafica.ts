/* eslint-disable @typescript-eslint/no-for-in-array */
export class GraficaData {
  // meses del año
  private readonly meses: string[] = ['january', 'february', 'march', 'april']
  private readonly valores: number[] = [0, 0, 0, 0]

  // Mostrar datos de la grafica
  getDataGrafica (): any {
    return [{ data: this.valores, label: 'Ventas' }]
  }

  // Incrementar valor de la grafica
  incrementarValor (mes: string, valor: number): any {
    mes = mes.toLowerCase().trim()
    for (const i in this.meses) {
      if (this.meses[i] === mes) {
        this.valores[i] += valor
      }
    }
    return this.getDataGrafica()
  }
}
