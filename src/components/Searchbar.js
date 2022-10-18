import React from 'react'
import {Container, InputGroup, FormControl, Button} from 'react-bootstrap';
export const Searchbar = ({search,lastFM,setSearchInput}) => {
  return (
    <Container>
      <InputGroup className= "mb-3" size="lg">
        <FormControl
          placeholder= "Search For Artist"
          type= "input"
          onKeyPress={event =>{
            if (event.key == "Enter"){
              search();
            }
          }}
          onChange= {event => setSearchInput(event.target.value)}
        />
        <Button onClick= {lastFM}>
          Search
        </Button>
        </InputGroup>
     </Container>
  )
}
