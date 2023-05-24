export default function SearchSuggestion(props) {
    const { setSearchTerm } = props;

    const genreList = [
        "Pop",
        "Hip-Hop",
        "Rock",
        "Indie",
        "Dance",
        "Mood",
        "Workout",
        "Pride",
    ];

    return (
        <ul className="flex">
            {genreList.map((genre) => (
                <div className="p-4 bg-slate-100 min-[320px]:w-32 md:w-48 justify-center shadow-lg rounded-lg hover:bg-slate-200"
                    key={genre}
                    onClick={() => setSearchTerm(genre)}
                >
                    {genre}
                </div>
            ))}
        </ul>
    );
}
