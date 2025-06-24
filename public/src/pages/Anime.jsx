const { animeId } = useParams();
const [anime, setAnime] = useState(null);

useEffect(() => {
  fetch(`https://gogoanime.consumet.stream/anime-details/${animeId}`)
    .then(res => res.json())
    .then(setAnime);
}, [animeId]);

return (
  <div>
    <h1>{anime.title}</h1>
    <iframe
      src={`https://gogoplay.io/streaming.php?id=${anime.episodes[0].id}`}
      allowFullScreen
      width="100%"
      height="500px"
    />
  </div>
);
