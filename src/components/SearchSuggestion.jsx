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
        <ul>
            {genreList.map((genre) => (
                <li
                    key={genre}
                    onClick={() => setSearchTerm(genre)}
                >
                    {genre}
                </li>
            ))}
        </ul>
    );
}
