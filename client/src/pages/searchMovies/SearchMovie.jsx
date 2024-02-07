import React, { useEffect, useState } from "react";
import "./SearchMovie.css";
import { useParams } from "react-router-dom";
import Cards from "../../components/card/card";

const SearchMovies = ({}) => {
  const [searchMovies, setsearchMovies] = useState([]);
  const [page, setPage] = useState(1); // Track the current page
  const { movieName } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [itertainmentType, setItertainmentType] = useState("movie");
  const [btnClicked, setBtnClicked] = useState("movie");
  // const [searchMovie, setSearchMovie] = useState("inter");

  useEffect(() => {
    getData();
  }, [page, itertainmentType, movieName]); // Fetch data whenever the page or type changes

  const getData = () => {
    if (page > 1) {
      setLoadingVisible(true);
    }

    setLoading(true); // Set loading to true before fetching data

    fetch(
      // `https://api.themoviedb.org/3/${itertainmentType}/${
      //   type ? type : "popular"
      // }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${page}`
      `https://api.themoviedb.org/3/search/${itertainmentType}?query=${movieName}&api_key=9abd8c3499d4d44e696cc0deefa3f156&language=en-US&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        // Filter out entries with missing or undefined backdrop_path
        const filteredResults = data.results.filter(
          (result) =>
            result.backdrop_path !== null && result.poster_path !== null
        );

        // console.log(filteredResults);
        setsearchMovies((prevData) =>
          page === 1 ? filteredResults : [...prevData, ...data.results]
        );
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false on error
      });
  };
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleInterType = (item) => {
    setItertainmentType(item);
    setBtnClicked(item);
    setPage(1);
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
      handleLoadMore();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  return (
    <div className="movie__list">
      <div className="page-nav">
        <h2 className="list__title">
          Searched : {movieName.toUpperCase()}{" "}
          <span style={{ marginLeft: "5px" }}>
            {(itertainmentType === "movie"
              ? "movies"
              : "tv Shows"
            ).toUpperCase()}
          </span>
        </h2>

        <div className="nav-btnn" style={{ display: "flex" }}>
          <button
            style={{
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
              flex: 1, // Use flex to make the buttons equal width
              whiteSpace: "nowrap",
            }}
            className={btnClicked === "movie" ? "clicked" : "notClicked"}
            onClick={() => handleInterType("movie")}
          >
            <div style={{ width: "70px" }}>Movies</div>
          </button>
          <button
            style={{
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
              flex: 1, // Use flex to make the buttons equal width
              whiteSpace: "nowrap",
            }}
            className={btnClicked === "tv" ? "clicked" : "notClicked"}
            onClick={() => handleInterType("tv")}
          >
            <div style={{ width: "70px" }}>Tv Shows</div>
          </button>
        </div>
      </div>
      <div className="list__cards">
        {searchMovies.map((movie) => (
          <Cards
            key={movie.id}
            movie={movie}
            itertainmentType={itertainmentType}
          />
        ))}
      </div>
      {loadingVisible ? (
        <div className="loadMore-div">
          <button
            className="loadMore-btn"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchMovies;
