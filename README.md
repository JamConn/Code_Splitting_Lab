This folder contains the Sample App code discussed in the lecture - the
Filtered Movies app. It was created with the create-react-app tool.

To run it:

$ npm install

Edit .env file to set the TMDB API key.

Run:
$ npm start

The code demonstrates caching, using the react-query library.

Make the following changes to enable caching:

1. In src/pages/homePage.js, replace:
   --------------------
   const [movies, setMovies] = useState([]);

   useEffect(async () => {
     const response = await getMovies();
     setMovies(response.results);
   }, []);
   --------------------

   with the following:

   ---------------------
    const { data, error, isLoading, isError } = useQuery("discover", getMovies);

    if (isLoading) {
      return <h3>Waiting for data </h3>;
    }
    if (isError) {
      return <h1>{error.message}</h1>;
    }
    const movies = data.results;
   ---------------------

   2. In src/pages/movieDetailsPage.js, replace:
   --------------------------
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`)
        .then(response => response.json())
        .then(json => {
            setMovie(json);
        });
    }, []);
   --------------------------

with the following:

--------------------------
  const {
    data: movie,
    error,
    isLoading,
    isError,
  } = useQuery(["movie", { id: id }], getMovie);

  if (isLoading) {
    return <h3>Waiting for data </h3>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
---------------------------