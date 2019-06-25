import React, { useState, useEffect } from 'react'
import { InputGroup, Button } from 'react-bootstrap'
import Head from 'next/head';
import axios from 'axios'

const Index = () => {
    const [query, setQuery] = useState("")
    const [sort, setSort] = useState("relevance")
    const [repos, setRepos] = useState([])

    const handleSearch = async () => {
      try {
        if (query) {
          const res = await axios.get('/search', {
            params: { q: query, sort }
          })
          setRepos(res.data)
        } else {
          setRepos([])
        }
      } catch(err) {
        console.log(err)
      }
    }

    useEffect(() => {
      handleSearch()
    }, [sort])

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
          <input type="text" 
            name="search" 
            id="search-input"
            className="mr-1" 
            placeholder="whatcha lookin for?"
            onChange={(e) => setQuery(e.target.value)} />
          <Button variant="primary"
            onClick={handleSearch}>Search</Button>
        </InputGroup>

        <div>
          Sort by...
          <input type="radio"
            name="sort"
            value="relevance"
            checked={sort === "relevance"}
            className="ml-2 mr-2"
            onChange={(e) => setSort(e.target.value)} />
            Relevance
          <input type="radio"
            name="sort"
            value="stars"
            checked={sort === "stars"}
            className="ml-2 mr-2"
            onChange={(e) => setSort(e.target.value)} />
            Stars
        </div>

        {repos.length > 0 && 
          <>
            <h2>Results for '{query}'</h2>
            {repos.map((repo) => 
              <div key={repo.id}>{repo.full_name}, {repo.stargazers_count}</div>)}
          </>
        }
      </div>
    )
  }

export default Index