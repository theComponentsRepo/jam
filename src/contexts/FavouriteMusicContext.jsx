import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "react-use";

const initialFavourites = [];

const favouriteMusicReducer = (previousState, instructions) => {
    let stateEditable = [...previousState];

    switch (instructions.type) {
        case "setup":
            stateEditable = instructions.data;
            return stateEditable;

        case 'toggleOn':
            let newFavourite = instructions.data
            return [...stateEditable, newFavourite];

        case 'toggleOff':
            let newStateEditable = stateEditable.filter(
                (music) => music.id != instructions.data.id
            );
            return newStateEditable;

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
        initialFavourites
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
