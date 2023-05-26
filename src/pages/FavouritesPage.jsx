import React, { useState } from "react";
import Tracks from "../components/Track";
import { useFavouriteMusic } from "../contexts/FavouriteMusicContext";
import AudioPlayer from "../components/AudioPlayer";
import AlbumLarge from "../components/AlbumLarge";
import FavouritesCover from "../components/FavouritesCover";

export default function FavouritePage(props) {
  const globalFavourites = useFavouriteMusic();
  const {setMp3} = props
  // const [selectedTrack, setSelectedTrack] = useState(null);

  const handleClick = (track) => {
    console.log("Track clicked:", track);
    // setSelectedTrack(track);
    setMp3(track);
  };

  return (
    <div className="mb-10">
      <div>
      <FavouritesCover data={globalFavourites}/>
        {globalFavourites.map((track) => (
          <div key={track.id}>
            <Tracks
              data={track}
              img={track.album.cover_small}
              artist={track.artist.name}
              onClick={() => handleClick(track)}
            />
          </div>
        ))}
      </div>
      {/* {selectedTrack && <AudioPlayer mp3={selectedTrack} />} */}
    </div>
  );
}