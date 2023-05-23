import { useEffect, useState } from "react";


export default function Tracks(props) {

  const [localTrack, setLocalTrack] = useState(null);

  const {id, img, artist} = props;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '577990ecfemshcaf230c6fa2818dp1d2fa8jsn711963dcaf86',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://deezerdevs-deezer.p.rapidapi.com/track/' + id, options);
        const data = await response.json();
        setLocalTrack(data)
        console.log(data)
      } catch (error) {
        console.error(error);
      }
  }
  fetchData();
}, [id]);
  

  return (
    <>
    {localTrack ? 
      <div className="track-container flex pb-3">
      <div className="track-image flex-none w-9 flex justify-center content-center">
        <img src={img} alt="" />
      </div>
      <div className="track-content flex-1">
        <h5>{localTrack.title}</h5>
        <p>{artist}</p>
      </div>
      <div className="track-fav flex-1">
        like
      </div>
    </div>
    :
    <div>Loading</div>
    
    }

    </>

  )
}