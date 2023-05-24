import { useEffect, useRef } from 'react';

export default function AudioPlayer(props) {
  const { mp3 } = props;
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = mp3.preview; // Change the source of the audio element
      audioRef.current.play(); // Start playing the new audio
    }
  }, [mp3]);

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







