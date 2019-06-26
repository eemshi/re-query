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
        value="score"
        checked={sort === "score"}
        className="ml-2 mr-2"
        onChange={(e) => setSort(e.target.value)} />
        Relevance
      <input type="radio"
        name="sort"
        value="stargazers_count"
        checked={sort === "stargazers_count"}
        className="ml-2 mr-2"
        onChange={(e) => setSort(e.target.value)} />
        Stars
    </div>
  </div>

export default SortComponent