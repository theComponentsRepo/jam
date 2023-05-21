import { createContext, useContext, useReducer } from "react";

const initialMusicData = [
  {
    id: 180628682,
    title: "Eyes Wide Open",
    coverSmall: "https://e-cdns-images.dzcdn.net/images/cover/464f5d095862d82564531ed8cfc21002/56x56-000000-80-0-0.jpg",
    coverMedium: "https://e-cdns-images.dzcdn.net/images/cover/464f5d095862d82564531ed8cfc21002/250x250-000000-80-0-0.jpg",
    releaseDate: "2020-10-27",
    artistName:  "TWICE",
    artistPicSmall: "https://e-cdns-images.dzcdn.net/images/artist/2de4aa06b5e00ecf27255fb51b50c9d9/56x56-000000-80-0-0.jpg",
    tracks: [
      {
        id: 1114415022,
        trackTitle: "I CAN'T STOP ME",
        preview: "https://cdns-preview-7.dzcdn.net/stream/c-76f6b10d62a45529a51dd5a86037db22-4.mp3"
      },
      {
        id: 1114415032,
        trackTitle: "HELL IN HEAVEN",
        preview: "https://cdns-preview-f.dzcdn.net/stream/c-ff2137f4adfec0379702a712cd367963-4.mp3"
      },
      {
        id: 1114415042,
        trackTitle: "UP NO MORE",
        preview: "https://cdns-preview-6.dzcdn.net/stream/c-6d56f1d0baba79800994e7f8acd75dbd-4.mp3"
      },
      {
        id: 1114415022,
        trackTitle: "I CAN'T STOP ME",
        preview: "https://cdns-preview-7.dzcdn.net/stream/c-76f6b10d62a45529a51dd5a86037db22-4.mp3"
      }
    ]
  }
]

const musicReducer = (previousState, instructions) => {
  let stateEditable = [...previousState];
  switch(instructions.type) {
    case 'setup':
      console.log('setup')
      break;
    
    case 'create':
      console.log('create');
      break;

    default:
      return previousState;
  }
}

export const MusicDataContext = createContext(null);
export const MusicDispatchContext = createContext(null);

export function useMusicData() {
  return useContext(MusicDataContext);
}

export function useMusicDispatch() {
  return useContext(MusicDispatchContext);
}

export default function MusicProvider(props) {
  const [musicData, musicDispatch] = useReducer(musicReducer, initialMusicData)

  return (
    <MusicDataContext.Provider value={musicData}>
      <MusicDispatchContext.Provider value={musicDispatch}>
        {props.children}
      </MusicDispatchContext.Provider>
    </MusicDataContext.Provider>
  )
}