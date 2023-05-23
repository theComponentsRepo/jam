import { useEffect, useState } from "react";
import {
    useFavouriteMusic,
    useFavouriteMusicDispatch,
} from "../contexts/FavouriteMusicContext";
import Heart from "react-animated-heart";

export default function ToggleFavouriteButton(props) {
    let track = {
        ...props.data,
        cover_small: props.img,
        artist: props.artist
    };

    const globalFavourites = useFavouriteMusic();
    const globalFavouritesDispatch = useFavouriteMusicDispatch();

    const [localFavourite, setLocalFavourite] = useState(false);
    const [isClick, setClick] = useState(false);

    useEffect(() => {
        const isFavorite =
            Array.isArray(globalFavourites) &&
            globalFavourites.find((music) => music.id === track.id);

        setLocalFavourite(isFavorite ? true : false);
        setClick(isFavorite ? true : false);
    }, [globalFavourites, track.id]);

    const ToggleFavourite = () => {
        !localFavourite
            ? globalFavouritesDispatch({ type: "toggleOn", data: track })
            : globalFavouritesDispatch({ type: "toggleOff", data: track });
    };

    return <Heart isClick={isClick} onClick={ToggleFavourite}></Heart>;
}
