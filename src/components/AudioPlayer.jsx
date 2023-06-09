import { useEffect, useRef, useState } from 'react';
import {BsPlayCircle, BsPauseCircle, BsSkipStartCircle, BsSkipEndCircle} from 'react-icons/bs';
import 'tailwindcss/tailwind.css';

export default function AudioPlayer(props) {
  const {mp3List, isPlaying, selectedTrackIndex, setSelectedTrackIndex, setIsPlaying} = props;
  const audioRef = useRef(null);
  const clickRef = useRef();
  const [mp3, setMp3] = useState(null);
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);
  const [progress, setProgress] = useState(0);
  // default track length by the API
  const trackDuration = 30; 

  useEffect(() => {
    if (mp3List && selectedTrackIndex !== null) {
      setMp3(mp3List[selectedTrackIndex]);
    }
  },[mp3List, selectedTrackIndex])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = mp3.preview; // Change the source of the audio element
      audioRef.current.load(); // Load the new audio
      audioRef.current.addEventListener('canplaythrough', handleReadyToPlay);
      audioRef.current.addEventListener('ended', nextTrack);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('canplaythrough', handleReadyToPlay);
        audioRef.current.removeEventListener('ended', nextTrack);
      }
    };
  }, [mp3]);

  useEffect(() => {
    playPause();
  }, [isReadyToPlay, isPlaying]);

  const handleReadyToPlay = () => {
    setIsReadyToPlay(true);
    playPause();
  };

  const playPause = () => {
    if (isReadyToPlay && isPlaying) {
      audioRef.current.play(); // Start playing the audio when ready to play
    } else if (isReadyToPlay && !isPlaying) {
        audioRef.current.pause();
    }
  }

  const nextTrack = () => {
    setSelectedTrackIndex(prevTrackIndex => {
      if (prevTrackIndex === mp3List.length-1) {
        return 0
      } else {
        return prevTrackIndex + 1
      }
    });
    setIsPlaying(true);
  }

  const prevTrack = () => {
    setSelectedTrackIndex(prevTrackIndex => {
      if (prevTrackIndex === 0) {
        return mp3List.length-1
      } else {
        return prevTrackIndex - 1
      }
    });
    setIsPlaying(true);
  }

  const onPlaying = () => {
    const ct = audioRef.current.currentTime;
    setProgress(ct / trackDuration * 100 )
  }

  const checkWidth = (e)=>
  {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divprogress = offset / width * 100;
    audioRef.current.currentTime = divprogress / 100 * trackDuration;
  }

  return mp3 ? (
    <div className='w-90 lg:w-1/2 mx-auto flex rounded-md lg:rounded-full md:rounded-full my-2 mx-2 flex-col bg-cyan-600 bg-opacity-75 text-neutral-50 font-semibold fixed bottom-0 left-0 right-0'>
      <audio src={mp3.preview} ref={audioRef} onTimeUpdate={onPlaying}/>
      <p className='whitespace-normal py-2 px-4'>{mp3.title} - {mp3.artist.name}</p>
    
      {/* progress bar */}
      <div className='w-1/2 mx-auto'>
        <div className="min-w-full bg-gray-400 h-1.5 rounded cursor-pointer" onClick={checkWidth} ref={clickRef}>
          <div className="w-0 h-full bg-neutral-50 bg-opacity-75 rounded" style={{width: `${progress+"%"}`}}></div>
        </div>
      </div>

      <div className='flex m-auto '>
        {/* previous track button */}
        <BsSkipStartCircle className="text-4xl mx-2 my-2 bg-cyan-600 text-white rounded-full p-2 shadow-lg hover:bg-cyan-600 hover:bg-opacity-60 hover:shadow-xl" onClick={prevTrack} />
        {/* play/pause button */}
        {isPlaying ? (
          <BsPauseCircle className="text-4xl mx-2 my-2 bg-cyan-600 text-white rounded-full p-2 shadow-lg hover:bg-cyan-600 hover:bg-opacity-60 hover:shadow-xl" onClick={() => setIsPlaying(!isPlaying)} />
        ) : (
          <BsPlayCircle className="text-4xl mx-2 my-2 bg-cyan-600 text-white rounded-full p-2 shadow-lg hover:bg-cyan-600 hover:bg-opacity-60 hover:shadow-xl" onClick={() => setIsPlaying(!isPlaying)} />
        )}
        {/* next track button */}
        <BsSkipEndCircle className="text-4xl mx-2 my-2 bg-cyan-600 text-white rounded-full p-2 shadow-lg hover:bg-cyan-600 hover:bg-opacity-60 hover:shadow-xl" onClick={nextTrack} />
      </div>

    </div>
  ) : null;
  // return 
  // mp3 && 
      // (
      //   <div className='flex flex-col fixed bottom-0 left-0 right-0'>
      //     <audio src={mp3.preview} ref={audioRef} /> 
      //     <p>{mp3.title}</p>
      //     <BsFillSkipStartCircleFill className='btn_action' onClick={prevTrack}/>
      //     {
      //       isPlaying 
      //       ? <BsFillPauseCircleFill className='' onClick={playPause}/> 
      //       : <BsFillPlayCircleFill className='' onClick={playPause}/>
      //     }
      //     <BsFillSkipEndCircleFill className='btn_action' onClick={handleSongEnded}/>    
      //   </div>
      // ) 
      // {mp3 && (
      //   <div className="audioplayer-container flex flex-col fixed bottom-0 left-0 right-0">
      //     <span className="audio-element w-screen">{mp3.title}</span>
      //     <audio className="audio-element w-screen"  controlsList="nodownload" autoPlay ref={audioRef}>
      //     <BsFillPauseCircleFill className='flex flex-col fixed bottom-0 left-0 right-0' onClick={playPause}/>
      //       <source src={mp3.preview} />
      //     </audio>
      //   </div>
      // )} 
}