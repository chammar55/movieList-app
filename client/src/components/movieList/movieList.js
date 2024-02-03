import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/card";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1); // Track the current page
  const { type } = useParams();
  const [loading, setLoading] = useState(true);
  const [itertainmentType, setItertainmentType] = useState("movie");
  const [btnClicked, setBtnClicked] = useState(true);

  useEffect(() => {
    getData();
  }, [page, itertainmentType, type]); // Fetch data whenever the page or type changes

  //   const getData = () => {
  //
  //     fetch(
  //       `https://api.themoviedb.org/3/movie/${
  //         type ? type : "popular"
  //       }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${page}`
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         // If it's the first page, replace the existing data
  //         // Otherwise, concatenate the new data with the existing data
  //         setMovieList((prevData) =>
  //           page === 1 ? data.results : [...prevData, ...data.results]
  //         );
  //       });
  //   };
  const getData = () => {
    setLoading(true); // Set loading to true before fetching data

    fetch(
      `https://api.themoviedb.org/3/${itertainmentType}/${
        type ? type : "popular"
      }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieList((prevData) =>
          page === 1 ? data.results : [...prevData, ...data.results]
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
    setBtnClicked(!btnClicked);
    setPage(1);
  };

  return (
    <div className="movie__list">
      <div className="page-nav">
        <h2 className="list__title">
          {(type ? type : "POPULAR").toUpperCase()}
          <span style={{ marginLeft: "18px" }}>
            {(itertainmentType === "movie"
              ? "movies"
              : "tv Shows"
            ).toUpperCase()}
          </span>
        </h2>
        {type !== "upcoming" && (
          <div className="nav-btnn" style={{ display: "flex" }}>
            <button
              style={{
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
                flex: 1, // Use flex to make the buttons equal width
                whiteSpace: "nowrap",
              }}
              className={btnClicked ? "clicked" : "notClicked"}
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
              className={!btnClicked ? "clicked" : "notClicked"}
              onClick={() => handleInterType("tv")}
            >
              <div style={{ width: "70px" }}>Tv Shows</div>
            </button>
          </div>
        )}
      </div>
      <div className="list__cards">
        {movieList.map((movie) => (
          <Cards
            key={movie.id}
            movie={movie}
            itertainmentType={itertainmentType}
          />
        ))}
      </div>
      <div className="loadMore-div">
        {/* <button onClick={handleLoadMore} className="loadMore-btn">
          Load More
        </button> */}
        <button
          className="loadMore-btn"
          onClick={handleLoadMore}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default MovieList;

// import React, { useEffect, useState } from "react";
// import "./movieList.css";
// import { useParams } from "react-router-dom";
// import Cards from "../card/card";

// const MovieList = () => {
//   const [movieList, setMovieList] = useState([]);
//   const { type } = useParams();

//   useEffect(() => {
//     getData();
//   }, []);

//   useEffect(() => {
//     getData();
//   }, [type]);

//   const getData = () => {
//     fetch(
//       `https://api.themoviedb.org/3/movie/${
//         type ? type : "popular"
//       }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
//     )
//       .then((res) => res.json())
//       .then((data) => setMovieList(data.results));
//   };

//   return (
//     <div className="movie__list">
//       <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
//       <div className="list__cards">
//         {movieList.map((movie) => (
//           <Cards movie={movie} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MovieList;
