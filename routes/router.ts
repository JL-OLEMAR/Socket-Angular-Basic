import { Router, Request, Response } from 'express'
import Server from '../class/server'
import { usuariosConectados } from '../sockets/socket';

const router = Router()

// GET /mensajes - Devuelve todos los mensajes
router.get('/mensajes', (req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: 'Todo esta bien!!'
  })
})

// POST /mensajes - Crea un nuevo mensaje
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

// POST /mensajes/:id - Actualiza un mensaje
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

// GET, Servicio para obtener todos los IDs de los usuarios
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
