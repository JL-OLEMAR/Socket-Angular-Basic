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
  res.json({
    ok: true,
    mensaje: 'POST - Listo'
  })
})

export default router
