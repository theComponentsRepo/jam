
export default function AlbumMedium(props) {

  const {albumInfo, onClick} = props;

  const extractYear = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  const handleRedirect = () => {
    onClick()
  }

  return (
    <div className="album-cover-container flex flex-col p-4 bg-slate-100 w-64 justify-center shadow-lg rounded" onClick={handleRedirect}>
      <div className="album-cover-img mb-5 overflow-hidden flex justify-center">
        <img className="w-64" src={albumInfo.cover_medium} alt="" />
      </div>
      <div className="album-cover-content text-left">
        <h3 className="text-xl font-bold">{albumInfo.title}</h3>
        <p>{albumInfo.artist}</p>
        <p>{extractYear(albumInfo.release_date)}</p>
      </div>

    </div>
  )
}