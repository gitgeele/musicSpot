import React from 'react'
import {Container, InputGroup, FormControl, Button} from 'react-bootstrap';
//Component to represent the searchbar
export const Searchbar = ({search,setSearchInput}) => {
  return (
    //Setting the onclicks and onpresses from the form and button to kick off the search function
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
