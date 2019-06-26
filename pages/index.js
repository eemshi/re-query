import React, { useState, useEffect } from 'react'
import '../styles.less'
import Head from 'next/head';
import axios from 'axios'
import { InputGroup, Button, Jumbotron } from 'react-bootstrap'
import RepositoryCard from '../src/RepositoryCard'
import Loader from '../src/Loader'

const Index = () => {
    const [query, setQuery] = useState("")
    const [sort, setSort] = useState("relevance")
    const [repositories, setRepositories] = useState([])

    const handleSearch = async () => {
      try {
        if (query) {
          const res = await axios.get('/search', {
            params: { q: query, sort }
          })
          setRepositories(res.data)
        } else {
          setRepositories([])
        }
      } catch(err) {
        console.log(err)
      }
    }

    const handleSearchEnterKey = (target) => {
        if (target.charCode === 13) handleSearch()
    }

    useEffect(() => {
      handleSearch()
    }, [sort])

    return (
      <div>
        <Head>
          <title>Re-Query</title>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
          />
        </Head>

        <Jumbotron className="text-center">
          <h1 className="mb-4">Search Github Repos</h1>
          <InputGroup className="mx-auto mb-2 justify-content-center">
            <input type="text"
              name="search" 
              id="search-input"
              className="mr-2 px-2" 
              placeholder="Whatcha lookin for?"
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleSearchEnterKey} />
            <Button variant="primary"
              onClick={handleSearch}>Search</Button>
          </InputGroup>
        </Jumbotron>

        {repositories.length > 0 && 
          <div className="px-4 py-2">
            <h2 className="text-center">Showing results for '{query}'</h2>
            <div className="text-center my-4">
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

            <div className="row">
              {repositories.map((repo) => 
                <div key={repo.id} className="col-sm-12 col-md-6 col-lg-4 col-xl-3 p-2">
                  <RepositoryCard
                    name={repo.full_name}
                    language={repo.language}
                    description={repo.description}
                    stars={repo.stargazers_count}
                    url={repo.url} /> 
                </div>
              )}
            </div>
          </div>
        }
      </div>
    )
  }

export default Index