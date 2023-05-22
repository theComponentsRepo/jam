import { useState, useEffect } from "react";
import useSound from "use-sound";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons";
import { BiSkipNext, BiSkipPrevious } from "react-icons";
import { IconContext } from "react-icons";


export default function AudioPlayer(props){
    
    const [isPlaying, setIsPlaying] = useState(false);

    const [play, { pause, duration, sound }] = useSound(props)

}