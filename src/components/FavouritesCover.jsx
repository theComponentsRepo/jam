import heartPic from "../pics/heart.png"

export default function FavouritesCover(props) {

  const {data} = props;




  return (
    <div>
      { data && 
      <div className="album-large-container p-4 flex bg-cyan-600 text-neutral-100 xs:flex-col xs:items-center xs:gap-2 dark:bg-slate-800">

        <div className="album-large-img px-3 drop-shadow-xl xs:px-0 xs:w-64 sm:w-56 md:w-72 lg:w-72	">
          <img src={heartPic} alt="" />
        </div>
        <div className="album-large-content text-left	flex flex-col justify-between xs:flex-row">
          <div className="album-title xs:flex">
            <p className="drop-shadow-xl xs:text-xs xs:pr-5">Playlist</p>
            <p className=" font-extrabold	drop-shadow-xl xs:font-normal	  xs:text-xs  xs:font-none sm:text-4xl sm:leading-none md:text-6xl lg:text-8xl">Liked Songs</p>
          </div>
          <p className="xs:pl-5 xs:text-xs"> {data.length} Songs</p>



        </div>
      </div>
      }
    </div>


  )
}