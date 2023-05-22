import { useEffect, useState } from "react";
import { useMusicData, useMusicDispatch } from "../contexts/MusicContext";
import { options, randomURL } from "../functions/randomURL";
import {
    useFavouriteMusic,
    useFavouriteMusicDispatch,
} from "../contexts/FavouriteMusicContext";

export default function HomePage(props) {
    const globalMusicData = useMusicData();
    const dispatch = useMusicDispatch();
    const [localArtist, setLocalArtist] = useState({});

    const globalFavourites = useFavouriteMusic();
    const globalFavouritesDispatch = useFavouriteMusicDispatch();

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
                        dispatch({ type: "add", data: data });
                        i++;
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://deezerdevs-deezer.p.rapidapi.com/artist/" +
                        globalMusicData.artist.id,
                    options()
                );
                const data = await response.json();
                setLocalArtist(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [globalMusicData]);

    const ToggleFavourite = (event) => {
        let music = globalMusicData.find(
            (music) => music.id == event.target.id
        );
        globalFavouritesDispatch({ type: "toggle", data: music });
        console.log(music);
    };

    return (
        <div>
            <h1>Home Page</h1>
            {globalMusicData.map((music) => (
                <li key={music.id}>
                    <img src={music.cover_small} alt="" />
                    <p>{music.id}</p>
                    <h3>{music.title}</h3>
                    <p>{localArtist.name}</p>
                    <p>{music.artist.id}</p>
                    <p>{music.release_date}</p>
                    <button
                        onClick={ToggleFavourite}
                        value={music.favourite}
                        id={music.id}
                    >
                        Favourite: {String(music.favourite)}
                    </button>
                </li>
            ))}
        </div>
    );
}
