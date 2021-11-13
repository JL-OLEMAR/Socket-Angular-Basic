import Server from './class/server'
import router from './routes/router'

// Instancia del servidor
const server = new Server()

// Router
server.app.use('/', router)

// Levantar el servidor
server.start(() => {
  console.log(`Servidor corriendo en http://localhost:${server.port}`)
})
