import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/card";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const { type } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [itertainmentType, setItertainmentType] = useState("movie");
  const [btnClicked, setBtnClicked] = useState("movie");

  useEffect(() => {
    getData();
  }, [page, itertainmentType, type]);

  const getData = () => {
    if (page > 1) {
      setLoadingVisible(true);
    }

    setLoading(true);

    // just for upcoming page
    if (type === "upcoming") {
      setItertainmentType("movie");
    }
    fetch(
      `https://api.themoviedb.org/3/${itertainmentType}/${
        type ? type : "popular"
      }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        const filteredResults = data.results.filter(
          (result) => result.backdrop_path
        );

        setMovieList((prevData) =>
          page === 1 ? filteredResults : [...prevData, ...filteredResults]
        );

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
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
          {(type ? type : "POPULAR").toUpperCase()}
          <span style={{ marginLeft: "18px" }}>
            {(itertainmentType === "movie"
              ? "movies"
              : "tv Shows"
            ).toUpperCase()}
          </span>
        </h2>
        {type !== "upcoming" && (
          <div className="nav-btnn">
            <button
              className={btnClicked === "movie" ? "clicked" : "notClicked"}
              onClick={() => handleInterType("movie")}
            >
              <div style={{ width: "70px" }}>Movies</div>
            </button>
            <button
              className={btnClicked === "tv" ? "clicked" : "notClicked"}
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

export default MovieList;

//code with out infinity loading rather load more button

// import React, { useEffect, useState } from "react";
// import "./movieList.css";
// import { useParams } from "react-router-dom";
// import Cards from "../card/card";

// const MovieList = () => {
//   const [movieList, setMovieList] = useState([]);
//   const [page, setPage] = useState(1); // Track the current page
//   const { type } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [itertainmentType, setItertainmentType] = useState("movie");
//   const [btnClicked, setBtnClicked] = useState(true);

//   useEffect(() => {
//     getData();
//   }, [page, itertainmentType, type]); // Fetch data whenever the page or type changes

//   //   const getData = () => {
//   //
//   //     fetch(
//   //       `https://api.themoviedb.org/3/movie/${
//   //         type ? type : "popular"
//   //       }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${page}`
//   //     )
//   //       .then((res) => res.json())
//   //       .then((data) => {
//   //         // If it's the first page, replace the existing data
//   //         // Otherwise, concatenate the new data with the existing data
//   //         setMovieList((prevData) =>
//   //           page === 1 ? data.results : [...prevData, ...data.results]
//   //         );
//   //       });
//   //   };
//   const getData = () => {
//     setLoading(true); // Set loading to true before fetching data

// just for upcoming page
//  if (type === "upcoming") {
//   setItertainmentType("movie");
// }
//     fetch(
//       `https://api.themoviedb.org/3/${itertainmentType}/${
//         type ? type : "popular"
//       }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${page}`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         // Filter out entries with missing or undefined backdrop_path
//         const filteredResults = data.results.filter(
//           (result) => result.backdrop_path
//         );

//         // Set the state with the filtered results
//         setMovieList((prevData) =>
//           page === 1 ? filteredResults : [...prevData, ...filteredResults]
//         );

//         setLoading(false); // Set loading to false after data is fetched
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setLoading(false); // Set loading to false on error
//       });
//   };

//   const handleLoadMore = () => {
//     setPage((prevPage) => prevPage + 1);
//   };

//   const handleInterType = (item) => {
//     setItertainmentType(item);
//     setBtnClicked(!btnClicked);
//     setPage(1);
//   };

//   // console.log(movieList);

//   return (
//     <div className="movie__list">
//       <div className="page-nav">
//         <h2 className="list__title">
//           {(type ? type : "POPULAR").toUpperCase()}
//           <span style={{ marginLeft: "18px" }}>
//             {(itertainmentType === "movie"
//               ? "movies"
//               : "tv Shows"
//             ).toUpperCase()}
//           </span>
//         </h2>
//         {type !== "upcoming" && (
//           <div className="nav-btnn" style={{ display: "flex" }}>
//             <button
//               style={{
//                 borderTopLeftRadius: "10px",
//                 borderBottomLeftRadius: "10px",
//                 flex: 1, // Use flex to make the buttons equal width
//                 whiteSpace: "nowrap",
//               }}
//               className={btnClicked ? "clicked" : "notClicked"}
//               onClick={() => handleInterType("movie")}
//             >
//               <div style={{ width: "70px" }}>Movies</div>
//             </button>
//             <button
//               style={{
//                 borderTopRightRadius: "10px",
//                 borderBottomRightRadius: "10px",
//                 flex: 1, // Use flex to make the buttons equal width
//                 whiteSpace: "nowrap",
//               }}
//               className={!btnClicked ? "clicked" : "notClicked"}
//               onClick={() => handleInterType("tv")}
//             >
//               <div style={{ width: "70px" }}>Tv Shows</div>
//             </button>
//           </div>
//         )}
//       </div>
//       <div className="list__cards">
//         {movieList.map((movie) => (
//           <Cards
//             key={movie.id}
//             movie={movie}
//             itertainmentType={itertainmentType}
//           />
//         ))}
//       </div>
//       <div className="loadMore-div">
//         {/* <button onClick={handleLoadMore} className="loadMore-btn">
//           Load More
//         </button> */}
//         <button
//           className="loadMore-btn"
//           onClick={handleLoadMore}
//           disabled={loading}
//         >
//           {loading ? "Loading..." : "Load More"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MovieList;

// // import React, { useEffect, useState } from "react";
// // import "./movieList.css";
// // import { useParams } from "react-router-dom";
// // import Cards from "../card/card";

// // const MovieList = () => {
// //   const [movieList, setMovieList] = useState([]);
// //   const { type } = useParams();

// //   useEffect(() => {
// //     getData();
// //   }, []);

// //   useEffect(() => {
// //     getData();
// //   }, [type]);

// //   const getData = () => {
// //     fetch(
// //       `https://api.themoviedb.org/3/movie/${
// //         type ? type : "popular"
// //       }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
// //     )
// //       .then((res) => res.json())
// //       .then((data) => setMovieList(data.results));
// //   };

// //   return (
// //     <div className="movie__list">
// //       <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
// //       <div className="list__cards">
// //         {movieList.map((movie) => (
// //           <Cards movie={movie} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MovieList;
