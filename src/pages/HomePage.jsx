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

    return (
        <div>
            <h1>Home Page</h1>

<<<<<<< HEAD
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://deezerdevs-deezer.p.rapidapi.com/artist/'+ globalMusicData.artist.id, options());
        const data = await response.json();
        setLocalArtist(data)
      } catch (error) {
        console.error(error);  
      }
    
  }
  fetchData();
  
  }, [globalMusicData]);


  return (
    <div>

      <h1>Home Page</h1>
      {globalMusicData.map((music)=><div key={music.id}>
        
          <img src={music.cover_small} alt="" />
          <p>{music.id}</p>
          <h3>{music.title}</h3>
          {/* <p>{localArtist.name}</p> */}
          <p>{music.artist.name}</p>
          <p>{music.release_date}</p>
        
      </div>)}
      
    </div>
  )
}
=======
            {globalMusicData.map((music) => (
                <li key={music.id} onClick={() => handleMusicClick(music.id)}>
                    <img src={music.cover_small} alt="" />
                    <p>{music.id}</p>
                    <h3>{music.title}</h3>
                    <p>{music.artist}</p>
                    <p>{music.release_date}</p>
                    {console.log(music.id)}
                </li>
            ))}
            {redirect && selectedMusicId && (
                <Navigate to={"/music/album/" + selectedMusicId} />
            )}
        </div>
    );
}
>>>>>>> 1606bb0582613e619d2a89fee22691697d7c8fa2
