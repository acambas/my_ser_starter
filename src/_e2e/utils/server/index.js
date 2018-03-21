import http from 'http'

export const startServer = (app, port = 3000) => {
  return new Promise((resolve, reject) => {
    const server = http.createServer(app)
    server.listen(port, function(err) {
      if (err) {
        return reject(err)
      }
      return resolve(server)
    })
  })
}
export const closeServer = server => {
  return new Promise((resolve, reject) => {
    server.close(err => {
      if (err) {
        return reject(err)
      }
      return resolve()
    })
  })
}
