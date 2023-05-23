import { useState, useEffect } from "react";
import useSound from "use-sound";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons";
import { BiSkipNext, BiSkipPrevious } from "react-icons";
import { IconContext } from "react-icons";


export default function AudioPlayer(){

    const [localTrackData, setLocalTrackData] = useState({});

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
    const [isPlaying, setIsPlaying] = useState(false);

    const [play, { pause, duration, sound }] = useSound(songUrl)

    const playButton = () => {
        if (isPlaying) {
            pause();
            setIsPlaying(false);
        } else {
            play();
            setIsPlaying(true);
        }
    }

    
    console.log(localTrackData)

    return(
        <div>
            <h1>Audio</h1>
            <button onClick={playButton}>Play</button>
        </div>
    )
}

