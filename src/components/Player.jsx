import { useState, useEffect } from "react";
import useSound from "use-sound";
// import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons";
// import { BiSkipNext, BiSkipPrevious } from "react-icons";
// import { IconContext } from "react-icons";


export default function AudioPlayer(){

    // Create local track data variable to store the track's data from api
    const [localTrackData, setLocalTrackData] = useState({});

    // Jie's code for fetching data from deezer API
    const url = 'https://deezerdevs-deezer.p.rapidapi.com/track/3135556';
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
            setLocalTrackData(data)
          } catch (error) {
            console.error(error);
          }
      }
      fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const songUrl = localTrackData.preview

    // Create variable isPlaying to track if song is currently playing or not
    const [isPlaying, setIsPlaying] = useState(false);
    // console.log(isPlaying)

    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    };



    return(
        <div>
            <h1>Audio</h1>
            <h3>{localTrackData.title}</h3>
            {/* <h3>{localTrackData.artist.name}</h3> */}
            <button onClick={togglePlay}>{isPlaying ? "pause":"play"}</button>
            {isPlaying && <audio src={songUrl} autoPlay />}
            
        </div>
    )
}

