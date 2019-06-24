import React, {useState} from 'react'
import {InputGroup, Button} from 'react-bootstrap'
import Head from 'next/head';
import axios from 'axios'

const Index = () => {
    const [query, setQuery] = useState('')
    const [sort, setSort] = useState(null)
    const [repos, setRepos] = useState([])
    return (
      <div>
        <Head>
          <title>re-query</title>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
          />
        </Head>

        <InputGroup>
          <input type="text" name="search" 
            id="search-input" className="mr-1" 
            placeholder="whatcha lookin for?"
            onChange={(e) => setQuery(e.target.value)} />
          <Button variant="primary"
            onClick={() => {
              axios.get('/search', {
                params: {
                  q: query,
                  sort: sort
                }
              }).then((res) => {
                // TODO: figure out why it's not setting
                setRepos(res.data)
                console.log(res.data)
              }).catch((err) => {
                console.log(err)
              })
            }}>Search</Button>
        </InputGroup>
      </div>
    )
  }

export default Index