import { useEffect, useState } from "react";
import { useMusicData, useMusicDispatch } from "../contexts/MusicContext";
import { options, randomURL } from "../functions/randomURL";
import {
    useFavouriteMusic,
    useFavouriteMusicDispatch,
} from "../contexts/FavouriteMusicContext";
import { Navigate } from "react-router-dom";

export default function HomePage(props) {
    const globalMusicData = useMusicData();
    const dispatch = useMusicDispatch();

    const globalFavourites = useFavouriteMusic();
    const globalFavouritesDispatch = useFavouriteMusicDispatch();

    const [redirect, setRedirect] = useState(false)
    const [selectedMusicId, setSelectedMusicId] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            let i = 0;
            while (i < 5) {
                try {
                    const response = await fetch(randomURL(), options());
                    const data = await response.json();
                    if (data.error === undefined) {
                        if (
                            globalFavourites.length > 0 &&
                            globalFavourites.find(
                                (music) => music.id == data.id
                            )
                        ) {
                            data.favourite = true;
                        } else {
                            data.favourite = false;
                        }
                        const artistResponse = await fetch("https://deezerdevs-deezer.p.rapidapi.com/artist/" + data.artist.id, options())
                        const artistData = await artistResponse.json()
                        const newData = {
                            id: data.id,
                            title: data.title,
                            cover_small: data.cover_small,
                            release_date: data.release_date,
                            artist: artistData.name

                        }
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


    const ToggleFavourite = (event) => {
        let music = globalMusicData.find(
            (music) => music.id == event.target.id
        );
        globalFavouritesDispatch({ type: "toggle", data: music });
        console.log(music);
    };

    const handleMusicClick = (musicId) => {
        setSelectedMusicId(musicId);
        setRedirect(true);
    };

    return (
        <div>
            <h1>Home Page</h1>
            
            {globalMusicData.map((music) => (
                <li key={music.id} onClick={() => handleMusicClick(music.id)}>
                    <img src={music.cover_small} alt="" />
                    <p>{music.id}</p>
                    <h3>{music.title}</h3>
                    <p>{music.artist}</p>
                    <p>{music.release_date}</p>
                    <button
                        onClick={ToggleFavourite}
                        value={music.favourite}
                        id={music.id}
                    >
                        Favourite: {String(music.favourite)}
                    </button>
                    {console.log(music.id)}
                    
                </li>
            ))}
            {redirect && selectedMusicId && <Navigate to={'/music/album/'+ selectedMusicId} /> } 
        </div>
    );
}
