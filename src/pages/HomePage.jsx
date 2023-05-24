import { useEffect, useState } from "react";
import { useMusicData, useMusicDispatch } from "../contexts/MusicContext";
import { options, randomURL } from "../functions/randomURL";
import { Navigate } from "react-router-dom";

export default function HomePage(props) {
  const globalMusicData = useMusicData();
  const dispatch = useMusicDispatch();

  const [redirect, setRedirect] = useState(false);
  const [selectedMusicId, setSelectedMusicId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let i = 0;
      while (i < 5) {
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
              release_date: data.release_date,
              artist: artistData.name,
            };
            dispatch({ type: "add", data: newData });
            i++;
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, []);

  const handleMusicClick = (musicId) => {
    setSelectedMusicId(musicId);
    setRedirect(true);
  };

  const extractYear = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
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
    <div>
      <h1>Home Page</h1>
      {globalMusicData.map((music) => (
        <div key={music.id}>
          <img src={music.cover_small} alt="" />
          {/* <p>{music.id}</p> */}
          <h3>{music.title}</h3>
          {/* <p>{localArtist.name}</p> */}
          <p>{music.artist}</p>
          <p>{extractYear(music.release_date)}</p>
        </div>
      ))}

      {redirect && selectedMusicId && (
        <Navigate to={"/music/album/" + selectedMusicId} />
      )}
    </div>
  );
}