import ToggleFavouriteButton from "./ToggleFavouriteButton";
// import AudioPlayer from "./Player";


export default function Tracks(props) {
    const { data, img, artist, onCustomEvent } = props;

    const handleClick = () => {
        const trackUrl = data.preview;
        onCustomEvent(trackUrl);
    }

    return (
        <div onClick={handleClick} className="track-container flex shadow-md content-center relative p-6 mb-3 bg-slate-50">
            <div className="track-image ">
                <img className="w-18" src={img} alt="" />
            </div>
            <div className="track-content flex-1 text-left pl-4">
                <h5 className="text-xl font-bold">{data.title}</h5>
                <p>{artist}</p>
            </div>
            {/* <div>
                <AudioPlayer props={data.preview} />
            </div> */}
            <div className="track-fav flex-none relative ml-24">
                <div className="toggle-container w-24 h-24 absolute -top-5 right-0">
                    <ToggleFavouriteButton data={data} />
                </div>

            </div>
        </div>
    );
}