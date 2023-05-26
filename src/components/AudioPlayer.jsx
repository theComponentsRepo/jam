import { useEffect, useRef, useState } from 'react';

export default function AudioPlayer(props) {
  const {mp3List, selectedTrackIndex, setSelectedTrackIndex} = props;
  const audioRef = useRef(null);
  const [mp3, setMp3] = useState(null);
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);

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
      audioRef.current.addEventListener('ended', handleSongEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('canplaythrough', handleReadyToPlay);
        audioRef.current.removeEventListener('ended', handleSongEnded);
      }
    };
  }, [mp3]);

  useEffect(() => {
    if (isReadyToPlay) {
      audioRef.current.play(); // Start playing the audio when ready to play
    }
  }, [isReadyToPlay]);

  const handleReadyToPlay = () => {
    setIsReadyToPlay(true);
  };

  const handleSongEnded = () => {
    setSelectedTrackIndex(prevTrackIndex => {
      if (prevTrackIndex === mp3List.length-1) {
        return 0
      } else {
        return prevTrackIndex + 1
      }
    });
    setIsReadyToPlay(false);
  }

  return (
    <div>
      {mp3 && (
        <div className="audioplayer-container flex flex-col fixed bottom-0 left-0 right-0">
          <span className="audio-element w-screen">{mp3.title}</span>
          <audio className="audio-element w-screen" controls controlsList="nodownload" autoPlay ref={audioRef}>
            <source src={mp3.preview} />
          </audio>
        </div>
      )}
    </div>
  );
}