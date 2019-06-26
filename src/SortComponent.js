import React from 'react'

const SortComponent = ({query, sort, setSort}) =>
  <div className="text-center">
    <h2>
      Showing results for '{query}'
    </h2>
    <div className="my-4">
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
  </div>

export default SortComponent