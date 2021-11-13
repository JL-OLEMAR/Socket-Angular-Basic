import { Router, Request, Response } from 'express'

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

  res.json({
    ok: true,
    cuerpo,
    de
  })
})

// POST /mensajes/:id - Actualiza un mensaje
router.post('/mensajes/:id', (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo
  const de = req.body.de
  const id = req.params.id

  res.json({
    ok: true,
    cuerpo,
    de,
    id
  })
})

export default router
