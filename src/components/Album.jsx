import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Album(props) {

  const [localAlbumData, setLocalAlbumData] = useState(null)
  const {id} = useParams();

  const url = 'https://deezerdevs-deezer.p.rapidapi.com/album/'+ parseInt(id);
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
        const artistResponse = await fetch('https://deezerdevs-deezer.p.rapidapi.com/artist/'+ data.artist.id, options)
        const artistData = await artistResponse.json();
        setLocalAlbumData({
          id: data.id,
          title: data.title,
          cover_medium: data.cover_medium,
          artist: artistData.name
        })
      } catch (error) {
        console.error(error);
      }
  }
  fetchData();
}, [id]);


  return (
    <div className="album-container">
    {localAlbumData ? 
    <div>
      <h5>{localAlbumData.id}</h5>
        <img src={localAlbumData.cover_medium} alt=""/>
        <h1> {localAlbumData.title}</h1>
        <p>{localAlbumData.artist}</p>
    </div>
    :
    <div>Loading...</div>
    }

    </div>
  )
}
