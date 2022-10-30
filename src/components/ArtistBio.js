import React, {useState, useEffect} from 'react'

export const ArtistBio = ({apiKey,profile}) => {
 const [lfmData, updateLfmData] = useState({});
 useEffect(() =>{
  fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${profile.name}&api_key=${apiKey}&format=json`)
    .then(response => {
      if (response.ok){
        return response.json();
      }
      throw new Error ('error');
    })
    .then(data => updateLfmData(data))
    .catch(() =>
      updateLfmData({error: 'Oops! Last.fm is bugging out right now'})
      );
 },[]);
};

