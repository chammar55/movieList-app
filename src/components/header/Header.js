import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import SearchMovies from "../../pages/searchMovies/SearchMovie";

// Search api
//  https://api.themoviedb.org/3/search/movie?query=man&api_key=9abd8c3499d4d44e696cc0deefa3f156

const Header = () => {
  const [searchMovie, setSearchMovie] = useState();
  const handleSearch = (e) => {
    e.preventDefault();
    window.location = `/searchMovie/${searchMovie}`;
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(
    //       `https://api.themoviedb.org/3/search/movie?query=${searchMovie}&api_key=9abd8c3499d4d44e696cc0deefa3f156`
    //     );
    //     const result = await response.json();
    //     setGetMovie(result.results);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
    // fetchData();
    setSearchMovie(" ");
  };

  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/">
          <img
            className="header__icon"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
          />
        </Link>
        <Link to="/movies/popular" style={{ textDecoration: "none" }}>
          <span>Popular</span>
        </Link>
        <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
          <span>Top Rated</span>
        </Link>
        <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
          <span>Upcoming</span>
        </Link>
      </div>
      <form className="search-div" onSubmit={handleSearch}>
        <input
          className="search-bar"
          type="text"
          onChange={(e) => {
            setSearchMovie(e.target.value);
          }}
          value={searchMovie}
          placeholder="Search"
        />
        <div className="search-icon" onClick={handleSearch}>
          <i class="fas fa-search"></i>
        </div>
      </form>
    </div>
  );
};

export default Header;
