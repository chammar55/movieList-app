import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieTrailer = ({ movieId, type }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrailerKey = async () => {
      try {
        // Replace 'YOUR_TMDB_API_KEY' with the API key you obtained from TMDb
        const tmdbApiKey = "9abd8c3499d4d44e696cc0deefa3f156";
        let url;
        if (type === "movie") {
          url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${tmdbApiKey}`;
        } else if (type === "tv") {
          url = `https://api.themoviedb.org/3/tv/${movieId}/videos?api_key=${tmdbApiKey}`;
        }
        const tmdbResponse = await axios.get(url);

        const results = tmdbResponse.data.results;
        if (results.length > 0) {
          // Assuming the first video in the results is the trailer
          setTrailerKey(results[0].key);
        } else {
          setError("No trailer available");
        }
      } catch (error) {
        console.error("Error fetching trailer key:", error);
        setError("Error fetching trailer");
      }
    };

    fetchTrailerKey();
  }, [movieId, type]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {trailerKey && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="YouTube Trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default MovieTrailer;
