import bodyParser from 'body-parser'
import cors from 'cors'

import Server from './class/server'
import router from './routes/router'

// Instancia del servidor de express
const server = Server.instance

// Middlewares
server.app.use(bodyParser.urlencoded({ extended: true }))
server.app.use(bodyParser.json())

// Cors
server.app.use(cors({ origin: true, credentials: true }))

// Routes
server.app.use('/', router)

// Levantar el servidor
server.start(() => {
  console.log(`Servidor corriendo en http://localhost:${server.port}`)
})
