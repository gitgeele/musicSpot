import React from 'react'
import {Container, InputGroup, FormControl, Button} from 'react-bootstrap';
export const Searchbar = ({search,setSearchInput}) => {
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
        <Button onClick= {search}>
          Search
        </Button>
        </InputGroup>
     </Container>
  )
}
