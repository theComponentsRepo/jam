import {
    useFavouriteMusic,
    useFavouriteMusicDispatch,
} from "../contexts/FavouriteMusicContext";

export default function FavouritePage(props) {
    const globalFavourites = useFavouriteMusic();
    const globalFavouritesDispatch = useFavouriteMusicDispatch()

    const ToggleFavourite = (event) => {
        // eslint-disable-next-line eqeqeq
        let music = globalFavourites.find(music => music.id == event.target.id);
        globalFavouritesDispatch({ type: "toggle", data: music });
    };

    return (
        <div>
            <h1>Favourite Playlist</h1>
            {globalFavourites.map((music) => {
                return (
                    <li key={music.id}>
                        <p>{music.id}</p>
                        <h3>{music.title}</h3>
                        {/* <p>{localArtist.name}</p> */}
                        <p>{music.artist.id}</p>
                        <button
                            onClick={ToggleFavourite}
                            value={music.favourite}
                            id={music.id}
                        >
                            Favourite: {String(music.favourite)}
                        </button>
                        <hr />
                    </li>
                );
            })}
        </div>
    );
}
