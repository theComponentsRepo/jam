import { useEffect, useState } from "react";
import { useMusicData, useMusicDispatch } from "../contexts/MusicContext";
import { options, randomURL } from "../functions/randomURL";
import { Navigate } from "react-router-dom";
import AlbumMedium from "../components/AlbumMedium";

export default function HomePage(props) {
  const globalMusicData = useMusicData();
  const dispatch = useMusicDispatch();

  const [redirect, setRedirect] = useState(false);
  const [selectedMusicId, setSelectedMusicId] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!dataFetched) {
        let i = 0;
        while (i < 15) {
          try {
            const response = await fetch(randomURL(), options());
            const data = await response.json();
            if (data.error === undefined) {
              const artistResponse = await fetch(
                "https://deezerdevs-deezer.p.rapidapi.com/artist/" +
                  data.artist.id,
                options()
              );
              const artistData = await artistResponse.json();
              const newData = {
                id: data.id,
                title: data.title,
                cover_small: data.cover_small,
                cover_medium: data.cover_medium,
                release_date: data.release_date,
                artist: artistData.name,
              };
              dispatch({ type: "add", data: newData });
              i++;
            }
            if (i === 15) {
              break;
            }
          } catch (error) {
            console.error(error);
          }
        }
        setDataFetched(true);
      }
    };
    fetchData();
  }, [dataFetched, dispatch]);

  const handleMusicClick = (musicId) => {
    setSelectedMusicId(musicId);
    setRedirect(true);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://deezerdevs-deezer.p.rapidapi.com/artist/" +
            globalMusicData.artist.id,
          options()
        );
        const data = await response.json();
        // eslint-disable-next-line no-undef
        setLocalArtist(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [globalMusicData]);

  return (
    <div className="flex flex-wrap p-3 justify-evenly items-start gap-3 mb-14">
      {globalMusicData.map((music)=><AlbumMedium onClick={()=>handleMusicClick(music.id)} albumInfo={music}/>)}
      {redirect && selectedMusicId && (
        <Navigate to={"/music/album/" + selectedMusicId} />
      )}
    </div>
  );
}
