export default function AlbumLarge(props) {

  const { data} = props;

  function convertSecondsToHoursAndMinutes(seconds) {
    // Convert seconds to minutes
    var minutes = Math.floor(seconds / 60);
  
    // Calculate the hours and minutes
    var hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
  
    // Create a formatted string for hours and minutes
    var result = hours + " hr " + minutes + " min";
    
    return result;
  }

  const extractYear = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  return (
    <div>
      { data && 
      <div className="album-large-container p-4 flex bg-cyan-600 text-neutral-100 xs:flex-col xs:items-center xs:gap-2">

        <div className="album-large-img pr-4 drop-shadow-xl xs:pr-0 xs:w-64 sm:w-56 md:w-72 lg:w-72	">
          <img src={data.cover_big} alt="" />
        </div>
        <div className="album-large-content text-left	flex flex-col justify-between">
          <div className="album-title">
            <p className="drop-shadow-xl xs:text-xs ">Album</p>
            <h1 className=" font-extrabold	drop-shadow-xl  xs:text-md xs:leading-tight sm:text-2xl md:text-5xl lg:text-6xl">{data.title}</h1>
          </div>
          <ul className="font-light list-disc flex xs:text-xs xs:leading-tight sm:flex-col sm:list-none sm:gap-0 sm:text-xs gap-5">
          
            <li className="sm:font-bold md:list-none lg:list-none xs:list-none"> {data.artist}</li>
            <li> {extractYear(data.release_date)}</li> 
            <li> {convertSecondsToHoursAndMinutes(data.duration)}</li>  
            <li> {data.numOfSongs} Songs</li>
          </ul>

        </div>
      </div>
      }
    </div>


  )
}