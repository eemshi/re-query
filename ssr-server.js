const express = require('express')
const next = require('next')
const axios = require('axios')
const _ = require('lodash')
    
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
    
app.prepare()
.then(() => {
  const server = express()

  server.get('/search', (req, res) => {
    const sort = req.query.sort === "relevance" ? null : "stars"
    axios.get('https://api.github.com/search/repositories', {
        params: {
            q: req.query.q,
            sort,
            per_page: 30
        }
    }).then((body) => {
        const repositories = _.map(body.data.items, (repo) => {
          return _.pick(repo, 
            ['id', 'full_name', 'language', 'description', 'stargazers_count']
          )})
        return res.json(repositories)
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