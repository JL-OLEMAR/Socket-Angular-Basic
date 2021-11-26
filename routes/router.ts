import { Router, Request, Response } from 'express'
import Server from '../class/server'
import { usuariosConectados } from '../sockets/socket'
import { GraficaBarraData } from '../class/graficaBarras'
import { GraficaData } from '../class/grafica'
import { Mapa } from '../class/mapa'

const router = Router()
const grafica = new GraficaData()
const graficaBarras = new GraficaBarraData()
const mapa = new Mapa()

// ---------------------MAPAS--------------------------------------------------------

// Devuelve data del mapa
router.get('/mapa', (req: Request, res: Response) => {
  res.json(mapa.getMarcadores())
})

// ---------------------GRAFICAS-----------------------------------------------------

// Devuelve data de la grafica
router.get('/grafica', (req: Request, res: Response) => {
  res.json(grafica.getDataGrafica())
})

// Incrementa unidades de la grafica segun la opcion de la pregunta
router.post('/grafica', (req: Request, res: Response) => {
  const mes = req.body.mes
  const unidades = Number(req.body.unidades)
  grafica.incrementarValor(mes, unidades)

  // Instanciar al servidor
  const server = Server.instance
  // Envia los valores de la gráfica a todos los usuarios conectados
  server.io.emit('cambio-grafica', grafica.getDataGrafica())

  res.json(grafica.getDataGrafica())
})

// ---------------------GRAFICAS EN BARRAS-------------------------------------------

// Devuelve data de la grafica en barras
router.get('/grafica-barras', (req: Request, res: Response) => {
  res.json(graficaBarras.getDataGraficaBarra())
})

// Incrementa unidades de la grafica segun la opcion de la pregunta
router.post('/grafica-barras', (req: Request, res: Response) => {
  const opcion = Number(req.body.opcion)
  const unidades = Number(req.body.unidades)
  graficaBarras.incrementarUnidades(opcion, unidades)

  const server = Server.instance
  server.io.emit('cambio-grafica-barras', graficaBarras.getDataGraficaBarra())

  res.json(graficaBarras.getDataGraficaBarra())
})

// ---------------------MENSAJES-----------------------------------------------------

// Devuelve todos los mensajes
router.get('/mensajes', (req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: 'Todo esta bien!!'
  })
})

// Crea un nuevo mensaje
router.post('/mensajes', (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo
  const de = req.body.de

  const payload = { cuerpo, de }
  const server = Server.instance
  server.io.emit('mensaje-nuevo', payload)

  res.json({
    ok: true,
    cuerpo,
    de
  })
})

// Actualiza un mensaje
router.post('/mensajes/:id', (req: Request, res: Response) => {
  const de = req.body.de
  const cuerpo = req.body.cuerpo
  const id = req.params.id

  const payload = { de, cuerpo }
  const server = Server.instance

  server.io.in(id).emit('mensaje-privado', payload)

  res.json({
    ok: true,
    cuerpo,
    de,
    id
  })
})

// ---------------------USUARIOS-----------------------------------------------------

// Servicio para obtener todos los IDs de los usuarios
router.get('/usuarios', (req: Request, res: Response) => {
  const server = Server.instance

  server.io.fetchSockets().then(sockets => {
    res.json({
      ok: true,
      clientes: sockets.map(cliente => cliente.id)
    })
  }).catch(err => {
    res.json({
      ok: false,
      err
    })
  })
})

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (req: Request, res: Response) => {
  res.json({
    ok: true,
    clientes: usuariosConectados.getLista()
  })
})

export default router
