import React from 'react'
import { Card } from 'react-bootstrap' 

const RepositoryCard = ({name, language, description, stars, url}) =>
  <Card>
    <Card.Body>
      <Card.Title><a href={url}>{name}</a></Card.Title>
      <Card.Subtitle className="mb-3 text-muted">
        <small>
          {language && <span className="mr-4">{language}</span>}
          <span>⭐ {stars}</span>
        </small>
      </Card.Subtitle>
      <Card.Text>{description}</Card.Text>
    </Card.Body>
  </Card>

const RepositoriesGrid = ({repositories}) =>
  <div className="row">
    {repositories.map((repo) => 
      <div key={repo.id} 
        className="col-sm-12 col-md-6 col-lg-4 col-xl-3 p-2">
        <RepositoryCard
          name={repo.full_name}
          language={repo.language}
          description={repo.description}
          stars={repo.stargazers_count}
          url={repo.url} /> 
      </div>
    )}
  </div>

export default RepositoriesGrid