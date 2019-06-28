const express = require('express')
const axios = require('axios')
const _ = require('lodash')
const redis = require('redis')

const server = express()
const REDIS_PORT = 6379
const client = redis.createClient(REDIS_PORT)

const cacheMiddleware = (req, res, next) => {
  const query = req.query.q
  const sort = req.query.sort
  client.get(query, (err, repositories) => {
    if (err) res.status(500).end(err.message)
    if (repositories) {
      try {
        const sorted = _.orderBy(JSON.parse(repositories), [sort], ['desc'])
        res.json(sorted)
      } catch (e) {
        res.status(500).end(e.message)
      }
    } else {
      next()
    }
  })
}

const saveCache = (key, ttl=300, value) => {
  client.setex(key, ttl, JSON.stringify(value))
}

client.on('error', (err) => {
  console.log('Error ' + err)
})
client.on('connect', () => {
  console.log('redis connected')
})

server.get('/search', cacheMiddleware, async (req, res) => {
  const query = req.query.q
  const sort = req.query.sort
  try {
    const body = await axios.get(`https://api.github.com/search/repositories?q=${query}`)
    const repositories = body.data.items.map((repo) => {
      return _.pick(repo,
        ['id', 'full_name', 'language', 'description', 'stargazers_count', 'score', 'url'])
    })
    saveCache(query, 300, repositories)
    res.json(_.orderBy(repositories, [sort], ['desc']))
  } catch (err) {
    res.status(err.response.status).end(err.response.statusText)
  }
})

module.exports = server