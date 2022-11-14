import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import { Searchbar } from './components/Searchbar';
import { ProfileA } from './components/ProfileA';
const CLIENT_ID = "5753dd65423845ea8d0748a51410a939";
const CLIENT_SECRET = "edd38e72233541c5ae6ca70cd2d3ed00";
const apiKey = "798a1554c611525e813f8bf3219723ef"
function App() {
  //Use states that hold input, token and artist information.
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setToken] = useState("");
  const [profile, setProfile] = useState("");
  const [lfmData, updateLfmData] = useState({});
  const [lfmAlbums, updateLfmAlbums] = useState({});
  //Initialising the spotify API code with useEffect, function only runs once on startup
  useEffect(() =>{
    //Use Effect that fetches Spotify API Token Access on launch
    let authObj = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    } 
    fetch('https://accounts.spotify.com/api/token', authObj)
    .then(result => result.json())
    .then(data => setToken(data.access_token))
  }, [])
  useEffect(()=>{
    //If the spotify profile state is not empty fetch additional info using LastFM
    const fetchData = async () =>{
      if (profile !== ""){
        //using async so that each fetch statement waits its turn and doesnt collide with the search function
        await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${profile.name}&api_key=${apiKey}&format=json`)
        .then(response => {
          if (response.ok){
            return response.json();
          }
          throw new Error ('error');
        })
        .then(data =>{
          updateLfmData(data)
        })
        .catch(() =>
          updateLfmData({error: 'Oops! Last.fm is bugging out right now'})
          );
        await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${profile.name}&api_key=${apiKey}&format=json`)
        .then(response => {
          if (response.ok){
            return response.json();
          }
          throw new Error ('error');
        })
        .then(data =>{
          updateLfmAlbums(data)
        })
        .catch(() =>
          updateLfmAlbums({error: 'Oops! Last.fm is bugging out right now'})
          );
      }
    }
    fetchData()
  },[profile])
  // Search 
  async function search(){
    console.log("Searching for " + searchInput )
    //Get request using search to get Artist ID
    let artistObj = {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    let artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', artistObj)
    .then(response =>{
      if(response.ok){
        return response.json()
      }
      throw new Error ('error'); 
      })
    .then(data => {return(data.artists.items[0].id)})
    // Get request with Artist ID grab major information and output it onto card
     await fetch('https://api.spotify.com/v1/artists/' + artistID, artistObj)
    .then(response => response.json())
    .then(data =>{
      const check = data
      setProfile(check)
    });
  }
  return (
    //Creating props to pass down to my components and setting conditionals so that the page loads up with all the necessary information
    <div className="App">
     <Searchbar search= {search} setSearchInput= {setSearchInput} />
     {Object.entries(lfmAlbums).length !== 0 ? 
     <ProfileA profile= {profile} lfmData = {lfmData} albums = {lfmAlbums}/>
      : ""}
    </div>
  );
}
export default App;
