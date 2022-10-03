import React from 'react'
import {Container, Card} from 'react-bootstrap';
export const ProfileA = ({profile}) => {
  return (
    <Container>
      <Card>
        <Card.Img src={profile.images[0].url}/>
        <Card.Body>
          <Card.Title>{profile.name}</Card.Title>
        </Card.Body>
      </Card>
     </Container>
  )
}

