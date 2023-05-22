import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Album(props) {

  const [localAlbumData, setLocalAlbumData] = useState({})
  const [localArtist, setLocalArtist] = useState({})
  const {id} = useParams();

  const url = 'https://deezerdevs-deezer.p.rapidapi.com/album/'+ parseInt(id);
  console.log(url)
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '577990ecfemshcaf230c6fa2818dp1d2fa8jsn711963dcaf86',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data)
        setLocalAlbumData(data)
      } catch (error) {
        console.error(error);
      }
  }
  fetchData();
}, [id]);


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('https://deezerdevs-deezer.p.rapidapi.com/artist/'+ localAlbumData.artist.id, options);
      const data = await response.json();
      console.log(data)
      setLocalArtist(data)
    } catch (error) {
      console.error(error);  
    }
}
fetchData();

}, [localAlbumData]);


  return (
    <div className="album-container">
      <h5>{localAlbumData.id}</h5>
      <img src={localAlbumData.cover_medium} alt=""/>
      <h1> {localAlbumData.title}</h1>
      {localArtist.name}
    </div>
  )
}