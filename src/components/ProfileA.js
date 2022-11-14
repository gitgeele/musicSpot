import React from 'react'
import {Container, Card,Row, Image} from 'react-bootstrap';
//Component to represent the Artist Profile
export const ProfileA = ({profile,lfmData,albums}) => {
  //setting variables from the JSON data I received from the API's
  const bio = lfmData.artist.bio.summary
  const summary = bio.slice(0,bio.indexOf('<'))
  const albumName = albums.topalbums.album
  const top3 = albumName.slice(0,3)
                        
  return (
    <Container>
      <Card className= "card border-0">
        <Card.Img src={profile.images[0].url}/>
        <Card.Body>
          <Card.Title>{profile.name}</Card.Title>
          <Card.Text>{summary}</Card.Text>
        </Card.Body>
      </Card>
      <Row className= "mx-1 row row-cols-3">
        {top3.map((albName,i) =>{
          //using map to sort the image out of the object I received from the prop and creating an instance of the image tag each time
          const name = albName.name
          const albumImage = albName.image[3]
          const {'#text': albumImg} = albumImage
          return (
            <div>
        <Image src={albumImg} height="200" width="200" className='rounded-circle'/>
        <p>{name}</p>
        </div> 
          )
})}
        </Row> 
     </Container>
  )
}

