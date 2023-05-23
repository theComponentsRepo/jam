import ToggleFavouriteButton from "./ToggleFavouriteButton";

export default function Tracks(props) {
    const { data, img, artist } = props;

    return (
        <div className="track-container flex pb-3">
            <div className="track-image flex-none w-9 flex justify-center content-center">
                <img src={img} alt="" />
            </div>
            <div className="track-content flex-1">
                <h5>{data.title}</h5>
                <p>{artist}</p>
            </div>
            <div className="track-fav flex-1">
                <ToggleFavouriteButton data={data} />
            </div>
        </div>
    );
}
