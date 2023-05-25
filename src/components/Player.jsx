import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";


export default function AudioPlayer(props){
  
  
    const songUrl = props;
    console.log(songUrl.props)

    


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
            {/* Button uses toggle play for onclick */}
            <button onClick={togglePlay}>{isPlaying ? "pause":"play"}</button>
            {/* Conditional rendering, if isPlaying is true, then audio source plays, else audio source is off */}
            {isPlaying && <audio src={songUrl.props} autoPlay />}
            
        </div>
    )
}

