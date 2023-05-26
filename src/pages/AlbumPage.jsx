import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlbumLarge from "../components/AudioPlayer"

import Tracks from "../components/Track";


export default function AlbumPage(props) {

  const {setMp3List, setSelectedTrackIndex} = props
  
  const [localAlbumData, setLocalAlbumData] = useState(null)
  const [localTrackData, setLocalTrackData] = useState(null)
  const {id} = useParams();

  // const [onPlayTrack, setOnPlayTrack] = useState(null)


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
        {console.log(data)}
        const trackResults = await Promise.all(trackPromise);
        setLocalTrackData([...trackResults])

        setLocalAlbumData({
          id: data.id,
          title: data.title,
          cover_medium: data.cover_medium,
          cover_small: data.cover_small,
          cover_big: data.cover_big,
          artist: artistData.name,
          duration: data.duration,
          release_date: data.release_date,
          numOfSongs: trackResults.length
        })
      } catch (error) {
        console.error(error);
      }
  }
  fetchData();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [id]);

  const handleClick = (track) => {
    console.log("Track clicked:", track);
    let currentTrackIndex = localTrackData.indexOf(track)
    setMp3List(localTrackData);
    setSelectedTrackIndex(currentTrackIndex);
  }

  return (
    <div className="album-container">
      {localAlbumData ? 
      <div>
        {console.log(localAlbumData)}
        <div className="mb-16">
            <AlbumLarge data={localAlbumData} />
            <div>
              {localTrackData.map((track)=>
              <Tracks data={track} img={localAlbumData.cover_small} artist={localAlbumData.artist} onClick={()=>handleClick(track)}/>)}
            </div>
        </div>
        {/* <AudioPlayer mp3={onPlayTrack} /> */}

      </div>

      :
      <div>Loading...</div>
      }
      {/* <Tracks /> */}
    </div>
  )
}