import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons";
// import { BiSkipNext, BiSkipPrevious } from "react-icons";
// import { IconContext } from "react-icons";


export default function AudioPlayer(){

    // Create local track data variable to store the track's data from api
    const [localTrackData, setLocalTrackData] = useState({});

    // useParams, gets track id from the url paramaters and stores in id
    const { id } = useParams()

    // Jie's code for fetching data from deezer API, uses id to add onto url and fetch data
    const url = 'https://deezerdevs-deezer.p.rapidapi.com/track/' + id;
    console.log(url)
    const options = {
        method: 'GET',
        headers: {
        'X-RapidAPI-Key': '577990ecfemshcaf230c6fa2818dp1d2fa8jsn711963dcaf86',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    // Jie's code for fetching data from deezer API
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

    // destructures localTrackData object, returns preview mp3 URL
    const songUrl = localTrackData.preview

    // isPlaying variable uses state to track if currently set to false or true
    // set to false to begin with
    const [isPlaying, setIsPlaying] = useState(false);
    

    // TogglePlay function changes the boolean of isPlaying
    // This function allows us to dictate if the music is playing or stopped with conditional rendering
    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    };



    return(
        <div>
            <h1>Audio</h1>
            <h3>{localTrackData.title}</h3>
            <h3>{localTrackData.artist.name}</h3>
            {/* Button uses toggle play for onclick */}
            <button onClick={togglePlay}>{isPlaying ? "pause":"play"}</button>
            {/* Conditional rendering, if isPlaying is true, then audio source plays, else audio source is off */}
            {isPlaying && <audio src={songUrl} autoPlay />}
            
        </div>
    )
}

