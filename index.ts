import bodyParser from 'body-parser'
import Server from './class/server'
import router from './routes/router'

// Instancia del servidor
const server = new Server()

// Body parser
server.app.use(bodyParser.urlencoded({ extended: true }))
server.app.use(bodyParser.json())

// Router
server.app.use('/', router)

// Levantar el servidor
server.start(() => {
  console.log(`Servidor corriendo en http://localhost:${server.port}`)
})
