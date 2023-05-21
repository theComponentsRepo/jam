import { useMusicData } from "../contexts/MusicContext"

export default function HomePage(props) {

  const globalMusicData = useMusicData();

  return (
    <div>
      <h1>Home Page</h1>
      {globalMusicData.map((album)=>{
        return (
          <div key={album.id}>
            <h3>{album.title}</h3>
            <p>{album.artistName}</p>
            <img src={album.artistPicSmall} alt="Twice picture" />
            <img src={album.coverMedium} alt="Twice album cover" />
            {album.tracks.map((track)=>{
              return (
                <div key={track.id}>
                  <h6>{track.trackTitle}</h6>
                  <audio controls="controls" source src={track.preview} type="audio/mpeg"></audio>
                </div>
              )
            })}  
          </div>
        )
      })}
    </div>
  )
}