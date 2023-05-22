import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "react-use";

const initialFavourites = [
    {
        id: 1,
        title: "longjuanfeng",
        artist: {
            id: 1,
        },
        favourite: true,
    },
    {
        id: 2,
        title: "longjuanfeng",
        artist: {
            id: 1,
        },
        favourite: true,      
    }
];

const favouriteMusicReducer = (previousState, instructions) => {
    let stateEditable = [...previousState];

    switch (instructions.type) {
        case "setup":
            stateEditable = instructions.data;
            return stateEditable;

        case "toggle":
            if (
                stateEditable.find(
                    (music) => music.id === instructions.data.id
                )
            ) {
                return stateEditable.filter(
                    (music) => music.id !== instructions.data.id
                );
            } else {
                return [...stateEditable, instructions.music];
            }

        default:
            return previousState;
    }
};

export const FavouriteMusicContext = createContext(null);
export const FavouriteMusicDispatchContext = createContext(null);

export function useFavouriteMusic() {
    return useContext(FavouriteMusicContext);
}

export function useFavouriteMusicDispatch() {
    return useContext(FavouriteMusicDispatchContext);
}

export default function FavouriteMusicProvider(props) {
    const [favouriteMusic, favouriteMusicDispatch] = useReducer(
        favouriteMusicReducer,
        initialFavourites
    );

    // store data into the local storage
    const [persistentData, setPersistentData] = useLocalStorage(
        "favourites",
        JSON.stringify(initialFavourites)
    );

    useEffect(() => {
        // On app start, overwrite favourite music data with persistent data
        favouriteMusicDispatch({ type: "setup", data: persistentData });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // auto save any changes to favourites from reducers state into local storage
    useEffect(() => {
        setPersistentData(favouriteMusic);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favouriteMusic]);

    return (
        <FavouriteMusicContext.Provider value={favouriteMusic}>
            <FavouriteMusicDispatchContext.Provider
                value={favouriteMusicDispatch}
            >
                {props.children}
            </FavouriteMusicDispatchContext.Provider>
        </FavouriteMusicContext.Provider>
    );
}
