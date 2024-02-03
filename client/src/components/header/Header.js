import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import SearchMovies from "../../pages/searchMovies/SearchMovie";
import DialogBox from "../Dialog-box/DialogBox";

// Search api
//  https://api.themoviedb.org/3/search/movie?query=man&api_key=9abd8c3499d4d44e696cc0deefa3f156

const Header = () => {
  const [searchMovie, setSearchMovie] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const auth = localStorage.getItem("email");

  const showPopup = () => {
    setPopupVisible(true);
    if (auth) {
      localStorage.clear();
      setPopupVisible(false);
      closeDropdown();
    } else {
      closeDropdown();
    }
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const handleUserImageClick = () => {
    setShowDropdown(!showDropdown); // Toggle the dropdown visibility
  };
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
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
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
        {/* ********************** User ***************************** */}
        <div className="userImg-div">
          <img
            className="user-img"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC"
            alt="user image"
            onClick={handleUserImageClick} // Toggle the dropdown on image click
          />
          {/* Dropdown content */}
          {showDropdown && (
            <div className="dropdown-content">
              {/* Add your user-related options here */}
              <p onClick={closeDropdown}>Profile</p>
              <p onClick={closeDropdown}>Movie List</p>
              <p onClick={showPopup}>{auth ? "Logout" : "Login"}</p>
            </div>
          )}
        </div>
        {/* popup duialog box***************************************** */}
        <DialogBox
          isPopupVisible={isPopupVisible}
          setPopupVisible={setPopupVisible}
        />
      </div>
    </div>
  );
};

export default Header;
