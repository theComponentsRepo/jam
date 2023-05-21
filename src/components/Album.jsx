import { useMusicData } from "../contexts/MusicContext";

export default function Album(props) {

  const globalMusicData = useMusicData();

  const {id} = props;

  const localMusicData = globalMusicData.find((album)=>album.id = id);

  return (
    <div className="album-container">
      <img src={localMusicData.coverMedium} alt="cover" />
      <h5>{}</h5>
    </div>
  )
}