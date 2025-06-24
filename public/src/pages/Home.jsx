const [query, setQuery] = useState("");
const [results, setResults] = useState([]);

const searchAnime = async () => {
  const res = await fetch(`https://gogoanime.consumet.stream/search?keyw=${query}`);
  const data = await res.json();
  setResults(data);
};
