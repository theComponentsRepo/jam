
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
    <div className="album-cover-container flex flex-col p-4 bg-slate-100 xs:w-32 md:w-48 justify-center shadow-lg rounded-lg hover:bg-slate-200" onClick={handleRedirect}>
      <div className="album-cover-img mb-3 overflow-hidden flex justify-center">
        <img className="xs:w-32 md:w-48" src={albumInfo.cover_medium} alt="" />
      </div>
      <div className="album-cover-content text-left">
        <p className="xs:text-[10px] md:text-sm font-bold">{albumInfo.title}</p>
        <p className="xs:text-[7px] md:text-xs	">{albumInfo.artist}</p>
        <p className="xs:text-[7px] md:text-xs	">{extractYear(albumInfo.release_date)}</p>
      </div>

    </div>
  )
}