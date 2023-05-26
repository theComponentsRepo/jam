import { useEffect, useRef, useState } from 'react';
import {BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillSkipStartCircleFill, BsSkipEndCircleFill, BsFillSkipEndCircleFill} from 'react-icons/bs';
import './AudioPlayer.css'

export default function AudioPlayer(props) {
  const {mp3List, isPlaying, selectedTrackIndex, setSelectedTrackIndex, setIsPlaying} = props;
  const audioRef = useRef(null);
  const clickRef = useRef();
  const [mp3, setMp3] = useState(null);
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);
  const [progress, setProgress] = useState(0);
  // const [isPlaying, setIsPlaying] = useState(false);

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
    const duration = 30;
    const ct = audioRef.current.currentTime;
    setProgress(ct / duration * 100 )
  }

  const checkWidth = (e)=>
  {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divprogress = offset / width * 100;
    audioRef.current.currentTime = divprogress / 100 * 30;

  }

  return mp3 ? (
    <div className='flex flex-col fixed bottom-0 left-0 right-0'>
      <audio src={mp3.preview} ref={audioRef} onTimeUpdate={onPlaying}/>
      <p>{mp3.title}</p>
      <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef}>
          <div className="seek_bar" style={{width: `${progress+"%"}`}}></div>
      </div>
      <BsFillSkipStartCircleFill className='btn_action' onClick={prevTrack} />
      {isPlaying ? (
        <BsFillPauseCircleFill className='' onClick={() => setIsPlaying(!isPlaying)} />
      ) : (
        <BsFillPlayCircleFill className='' onClick={() => setIsPlaying(!isPlaying)} />
      )}
      <BsFillSkipEndCircleFill className='btn_action' onClick={nextTrack} />
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