import React, { useEffect } from 'react'
import axios from 'axios'
import { InputGroup, Button, Jumbotron } from 'react-bootstrap'

const SearchComponent = ({sort, query, setQuery, setRepositories}) => {
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
          onClick={handleSearch}>
          Search</Button>
      </InputGroup>
    </Jumbotron>
  )
}

export default SearchComponent