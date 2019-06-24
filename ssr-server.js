const express = require('express')
const next = require('next')
const axios = require('axios')
    
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
    
app.prepare()
.then(() => {
  const server = express()

  server.get('/search', (req, res) => {
    axios.get('https://api.github.com/search/repositories', {
        params: {
            q: req.query.q,
            sort: req.query.sort,
            per_page: req.query.per_page
        }
    }).then((body) => {
        // TODO: only return necessary fields
        return res.json(body.data)
    }).catch((err) => {
        return res.status(err.response.status).end(err.response.statusText)
    })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })
    
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})