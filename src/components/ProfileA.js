import React from 'react'
import {Container, Card} from 'react-bootstrap';
export const ProfileA = ({profile}) => {
  return (
    <Container>
      <Card>
        <Card.Img src={profile}/>
        <Card.Body>
          <Card.Title>Artist</Card.Title>
        </Card.Body>
      </Card>
     </Container>
  )
}

