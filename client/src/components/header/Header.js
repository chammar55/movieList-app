import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import SearchMovies from "../../pages/searchMovies/SearchMovie";
import DialogBox from "../Dialog-box/DialogBox";
import { useNavigate } from "react-router-dom";

// Search api
//  https://api.themoviedb.org/3/search/movie?query=man&api_key=9abd8c3499d4d44e696cc0deefa3f156

const Header = () => {
  const [searchMovie, setSearchMovie] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [pageType, setPageType] = useState();
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [userImage, setUserImage] = useState();

  const [activeLink, setActiveLink] = useState("");
  const auth = localStorage.getItem("user");

  // console.log(auth);
  const userId = auth ? JSON.parse(auth)._id : null;

  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".dropdown-content") && showDropdown) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, [showDropdown]);

  const handleClick = (link) => {
    setActiveLink(link);
  };

  const showRegister = (e) => {
    e.preventDefault();
    setPopupVisible(true);
    setPageType("register");
    closeDropdown();
  };

  const showLogin = (e) => {
    e.preventDefault();
    setPopupVisible(true);
    setPageType("login");
    if (auth) {
      localStorage.clear();
      setPopupVisible(false);
      closeDropdown();
    } else {
      closeDropdown();
    }
  };

  const closeDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(false);
  };

  const handleUserImageClick = () => {
    setShowDropdown(!showDropdown); // Toggle the dropdown visibility
  };
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/searchMovie/${searchMovie}`);
    handleClick("");
    // window.location = `/searchMovie/${searchMovie}`;
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

  useEffect(() => {
    if (userId) {
      // Add null check here
      getUserData();
    } else {
      setUserImage("");
      setUserName("");
    }
  }, [userId]);

  const getUserData = async () => {
    // console.log(params);
    let result = await fetch(`http://localhost:5000/get-user/${userId}`, {
      //we are sending token to productlist api
      //we are authenicating users by their tokens
      headers: {
        //bearer is to make auth more strong.we are checking it in verifyToken middleware in index.js file so that why we have to type it here with token itself
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();

    setUserImage(result[0].image);
    setUserName(result[0].name);
    // console.log(result[0]);
  };

  // slice word at 1st space and that name should not be greater then 8 characters
  let slicedName;
  if (userName) {
    const spaceIndex = userName.indexOf(" ");
    slicedName = userName
      ? spaceIndex !== -1
        ? userName.substring(0, Math.min(spaceIndex, 8))
        : userName.substring(0, 8)
      : "";
  }

  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/">
          <img
            className="header__icon"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
            onClick={() => handleClick("")}
          />
        </Link>
        <Link
          to="/movies/popular"
          className={activeLink === "/movies/popular" ? "Link active" : "Link"}
          style={{
            textDecoration: "none",
            color: activeLink === "/movies/popular" ? "red" : "gray", // Change color based on active link
          }}
          onClick={() => handleClick("/movies/popular")}
        >
          <span>Popular</span>
        </Link>
        <Link
          to="/movies/top_rated"
          className={
            activeLink === "/movies/top_rated" ? "Link active" : "Link"
          }
          style={{
            textDecoration: "none",
            color: activeLink === "/movies/top_rated" ? "red" : "gray",
          }}
          onClick={() => handleClick("/movies/top_rated")}
        >
          <span>Top Rated</span>
        </Link>
        <Link
          to="/movies/upcoming"
          className={activeLink === "/movies/upcoming" ? "Link active" : "Link"}
          style={{
            textDecoration: "none",
            color: activeLink === "/movies/upcoming" ? "red" : "gray",
          }}
          onClick={() => handleClick("/movies/upcoming")}
        >
          <span>Upcoming</span>
        </Link>
      </div>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
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
            <Link style={{ color: "black" }} to={`/searchMovie/${searchMovie}`}>
              <i class="fas fa-search"></i>
            </Link>
          </div>
        </form>
        {/* ********************** User ***************************** */}
        <div className="userImg-div">
          <div
            className={userName ? "margin-top" : ""}
            style={{
              display: "flex",
              flexDirection: "column",

              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleUserImageClick}
          >
            {userImage ? (
              <img
                className="user-img "
                onClick={handleUserImageClick}
                src={require(`../../images/${userImage}`)}
                alt=""
              />
            ) : (
              <img
                className="user-img"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC"
                alt="user image"
                onClick={handleUserImageClick} // Toggle the dropdown on image click
              />
            )}
            <p style={{}}>{userName ? slicedName : ""}</p>
          </div>
          {/* Dropdown content */}
          {showDropdown && (
            <div onClick={closeDropdown} className="dropdown-content">
              {/* Add your user-related options here */}
              <Link to="/ProfilePage">Profile</Link>
              <Link to="/showMyMovies">Movie List</Link>
              <Link to="" onClick={showRegister}>
                Register
              </Link>
              <Link to="" onClick={showLogin}>
                {auth ? "Logout" : "Login"}
              </Link>
            </div>
          )}
        </div>
        {/* popup duialog box***************************************** */}
        <DialogBox
          pageType={pageType}
          isPopupVisible={isPopupVisible}
          setPopupVisible={setPopupVisible}
        />
      </div>
    </div>
  );
};

export default Header;
