import AudioPlayer from "./AudioPlayer";
import ToggleFavouriteButton from "./ToggleFavouriteButton";


export default function Tracks(props) {
    const { data, img, artist, onClick} = props;

    const handleClick = () => {
        onClick(data) 

    }

    return (
        <div className="relative">
            <div className="track-container flex shadow-md content-center p-6 mb-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white" onClick={handleClick}>
                <div className="track-image ">
                    <img className="w-18" src={img} alt="" />
                </div>
                <div className="track-content flex-1 text-left pl-4">
                    <h5 className="text-xl font-bold">{data.title}</h5>
                    <p>{artist}</p>
                </div>
                <div>
                    <AudioPlayer props={data.preview} />
                </div>
                <div className="block w-10"></div>
            </div>

            <div className="track-fav absolute top-0 right-0">
                    <div className="toggle-container">
                        <ToggleFavouriteButton data={data} />
                    </div>

            </div>
        </div>

        
    );
}