import Tracks from "../components/Track";
import { useFavouriteMusic } from "../contexts/FavouriteMusicContext";

export default function FavouritePage(props) {
    const globalFavourites = useFavouriteMusic();

    return (
        <div>
            <h1>Favourite Playlist</h1>
            <div>
                {globalFavourites.map((track) => (
                    <Tracks
                        data={track}
                        img={track.album.cover_small}
                        artist={track.artist.name}
                    />
                ))}
            </div>
        </div>
    );
}
