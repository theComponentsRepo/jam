import { useEffect, useRef, useState } from 'react';

export default function AudioPlayer(props) {
  const { mp3 } = props;
  const audioRef = useRef(null);
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = mp3.preview; // Change the source of the audio element
      audioRef.current.load(); // Load the new audio
      audioRef.current.addEventListener('canplaythrough', handleReadyToPlay);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('canplaythrough', handleReadyToPlay);
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

  return (
    <div>
      {mp3 && (
        <div className="audioplayer-container fixed bottom-0 left-0 right-0">
          <audio className="audio-element w-screen" controls autoPlay ref={audioRef}>
            <source src={mp3.preview} />
          </audio>
        </div>
      )}
    </div>
  );
}