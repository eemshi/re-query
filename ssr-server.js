const express = require('express')
const next = require('next')
const axios = require('axios')
const _ = require('lodash')
const redis = require('redis')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const REDIS_PORT = 6379

app.prepare()
.then(() => {
  const server = express()
  const client = redis.createClient(REDIS_PORT)

  client.on("error", (err) => {
    console.log("Error " + err)
  })
  client.on("connect", () => {
    console.log("redis connected")
  })

  server.get('/search', (req, res) => {
    const sort = req.query.sort
    axios.get('https://api.github.com/search/repositories', {
        params: {
            q: req.query.q
        }
    }).then((body) => {
        const repositories = body.data.items.map((repo) => {
          return _.pick(repo, 
            ['id', 'full_name', 'language', 'description', 'stargazers_count', 'score', 'url']
          )})
        const sorted = _.orderBy(repositories, [sort], ['desc'])
        return res.json(sorted)
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