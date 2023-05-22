import { useEffect, useState } from "react";
import { useMusicData, useMusicDispatch } from "../contexts/MusicContext"
import { options, randomURL } from "../functions/randomURL";

export default function HomePage(props) {

  const globalMusicData = useMusicData();
  const dispatch = useMusicDispatch();
  const [localArtist, setLocalArtist] = useState({})


  useEffect(()=>{
    const fetchData = async () => {
      let i = 0;
      while (i < 5){
        try{
          const response = await fetch(randomURL(),options());
          const data = await response.json();
          if (data.error === undefined){
            dispatch({type: 'add', data: data});
            i++;
          }
        }catch(error){
          console.error(error);
        }
      }
    }
    fetchData();
  },[])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://deezerdevs-deezer.p.rapidapi.com/artist/'+ globalMusicData.artist.id, options());
        const data = await response.json();
        setLocalArtist(data)
      } catch (error) {
        console.error(error);  
      }
    
  }
  fetchData();
  
  }, [globalMusicData]);


  return (
    <div>

      <h1>Home Page</h1>
      {globalMusicData.map((music)=><div key={music.id}>
        
          <img src={music.cover_small} alt="" />
          <p>{music.id}</p>
          <h3>{music.title}</h3>
          {/* <p>{localArtist.name}</p> */}
          <p>{music.artist.name}</p>
          <p>{music.release_date}</p>
        
      </div>)}
      
    </div>
  )
}