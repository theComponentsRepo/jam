import { useState, useEffect } from "react";
import useSound from "use-sound";
// import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons";
// import { BiSkipNext, BiSkipPrevious } from "react-icons";
// import { IconContext } from "react-icons";


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

    // const songUrl = localTrackData.preview;
    const [isPlaying, setIsPlaying] = useState(false);
    // console.log(isPlaying)

    const [play, {pause, duration, sound}] = useSound("https://cdns-preview-d.dzcdn.net/stream/c-deda7fa9316d9e9e880d2c6207e92260-10.mp3");
    

    const [time, setTime] = useState({
        min: "",
        sec: ""
    })

    const [currTime, setCurrTime] = useState({
    min: "",
    sec: ""
    })

    const [seconds, setSeconds] = useState();

    useEffect(() => {
        if(duration){
            const sec = duration/1000;
            const min = Math.floor(sec / 60);
            const secRemain = Math.floor(sec % 60);
            setTime({
                min: min,
                sec: secRemain
            });
        }
        
    }, [isPlaying]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([]));
                const min = Math.floor(sound.seek([]) / 60);
                const sec = Math.floor(sound.seek([]) % 60);
                setCurrTime({
                    min,
                    sec,
                });

            }
        }, 1000);
        return () => clearInterval(interval);
    }, [sound])



    const playButton = () => {
        if (!isPlaying) {
            pause();
            setIsPlaying(true);
            console.log(isPlaying)
        } else {
            play();
            setIsPlaying(false);
            console.log(isPlaying)
        }
    }



    return(
        <div>
            <h1>Audio</h1>
            <h3>{localTrackData.title}</h3>
            {/* <h3>{localTrackData.artist.name}</h3> */}
            <button onClick={playButton}>Play</button>
            <div>
                <p>
                    {currTime.min}:{currTime.sec}
                </p>
                <p>
                    {time.min}:{time.sec}
                </p>
                <input 
                    type="range"
                    min="0"
                    max={duration / 1000}
                    default="0"
                    value={seconds}
                    className="timeline"
                    onChange={(event) => {
                        sound.seek([event.target.value]);
                    }}
                />
            </div>
        </div>
    )
}

