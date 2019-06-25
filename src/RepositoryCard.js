import React from 'react'
import { Card } from 'react-bootstrap' 

const RepositoryCard = ({name, language, description, stars, url}) => {
return (
    <Card>
      <Card.Body>
        <Card.Title><a href={url}>{name}</a></Card.Title>
        <Card.Subtitle className="mb2 text-muted">
          <span className="mr-3">{language}</span>
          <span>⭐{stars}</span>
        </Card.Subtitle>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default RepositoryCard