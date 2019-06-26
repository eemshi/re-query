import React, { useState } from 'react'
import '../styles.less'
import Head from 'next/head';
import SearchComponent from '../src/SearchComponent'
import SortComponent from '../src/SortComponent'
import RepositoriesGrid from '../src/RepositoriesGrid'
import Loader from '../src/Loader'

const HeadTag = () =>
	<Head>
		<title>Re-Query</title>
		<link
			rel="stylesheet"
			href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
			integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
			crossOrigin="anonymous"
		/>
	</Head>

const Index = () => {
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState("relevance")
  const [repositories, setRepositories] = useState([])

  return (
    <div>
      <HeadTag />
      <SearchComponent 
        sort={sort}
        query={query}
        setQuery={setQuery}
        setRepositories={setRepositories}
      />

      {repositories.length > 0 && 
        <div className="px-4 py-2">
          <SortComponent
            query={query}
            sort={sort}
            setSort={setSort} />
          <RepositoriesGrid
            repositories={repositories} />
        </div>
      }
    </div>
  )
}

export default Index