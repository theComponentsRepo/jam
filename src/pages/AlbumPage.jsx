import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer";
import Tracks from "../components/Track";


export default function AlbumPage(props) {

  const [localAlbumData, setLocalAlbumData] = useState(null)
  const [localTrackData, setLocalTrackData] = useState(null)
  const {id} = useParams();

  const [onPlayTrack, setOnPlayTrack] = useState(null)


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

        const trackPromise = data.tracks.data.map(async (track) => {
          const trackResponse = await fetch('https://deezerdevs-deezer.p.rapidapi.com/track/'+ track.id, options);
          const trackResult = await trackResponse.json()
          return trackResult;
        } )
        const trackResults = await Promise.all(trackPromise);
        setLocalTrackData([...trackResults])

        setLocalAlbumData({
          id: data.id,
          title: data.title,
          cover_medium: data.cover_medium,
          cover_small: data.cover_small,
          artist: artistData.name
        })
      } catch (error) {
        console.error(error);
      }
  }
  fetchData();
}, [id]);

  const handleClick = (track) => {
    console.log('click')
    setOnPlayTrack(track)
    console.log(onPlayTrack)
  }

  return (
    <div className="album-container">
      {localAlbumData ? 
      <div>

        <div className="mb-16">
          <h5>{localAlbumData.id}</h5>
            <img src={localAlbumData.cover_medium} alt=""/>
            <h1> {localAlbumData.title}</h1>
            <p>{localAlbumData.artist}</p>
            <div>
              {localTrackData.map((track)=>
              <Tracks data={track} img={localAlbumData.cover_small} artist={localAlbumData.artist} onClick={()=>handleClick(track)}/>)}
            </div>
        </div>
        <AudioPlayer mp3={onPlayTrack} />

      </div>

      :
      <div>Loading...</div>
      }
      {/* <Tracks /> */}
    </div>
  )
}