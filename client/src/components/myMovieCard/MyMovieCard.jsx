import React, { useEffect, useState } from "react";
import "./MyMovieCard.css";

function MyMovieCard({ myMovie, handleDelete }) {
  const [movie, setMovie] = useState();
  const [myScore, setMyScore] = useState(myMovie.myScore);
  const [status, setStatus] = useState(myMovie.status);
  // const { movie, setMovie } = useState({});
  const type = myMovie.type;
  const id = myMovie.movieId;

  useEffect(() => {
    getData();
    // window.scrollTo(0, 0);
  }, []);

  const getData = () => {
    let apiUrl;
    if (type === "movie") {
      apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`;
    } else if (type === "tv") {
      apiUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`;
    }

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  };

  const updateProduct = async (mId) => {
    // console.log(name, price, category, company);
    let result = await fetch(`http://localhost:5000/update-movieList/${mId}`, {
      method: "Put",
      body: JSON.stringify({ status, myScore }), //send updated values
      //we are sending token to productlist api
      //we are authenicating users by their tokens
      headers: {
        "Content-Type": "application/json",
        //bearer is to make auth more strong.we are checking it in verifyToken middleware in index.js file so that why we have to type it here with token itself
      },
    });
    result = await result.json();
    console.log(result);
    // navigate("/");
  };
  // const handleDelete = async (_id) => {
  //   let result = await fetch(`http://localhost:5000/delete-movieList/${_id}`, {
  //     method: "Delete",
  //   });
  //   result = await result.json();
  //   if (result) {
  //     alert("record is deleted");
  //     // getData();
  //     console.log(result);
  //   }
  // };

  const handleDeleteItem = (_id) => {
    handleDelete(_id);
  };

  // console.log(type);
  // console.log(type + ":--", movie);
  // console.log(status);
  return (
    <table>
      <tr>
        <td>
          <img
            className="muMoviePoster"
            src={`https://image.tmdb.org/t/p/original${
              movie ? movie?.poster_path : ""
            }`}
            alt="movie-img"
          />
        </td>
        <td>{movie?.original_title || movie?.name}</td>
        <td>{myMovie?.type}</td>
        {true ? (
          <td>
            {" "}
            <select
              id="rating"
              value={myScore}
              onChange={(e) => setMyScore(parseInt(e.target.value))}
            >
              <option value="0">Select Rating</option>
              <option value="1">(1) Appalling</option>
              <option value="2">(2) Horrible</option>
              <option value="3">(3) Very Bad</option>
              <option value="4">(4) Bad</option>
              <option value="5">(5) Average</option>
              <option value="6">(6) Fine</option>
              <option value="7">(7) Good</option>
              <option value="8">(8) Very Good</option>
              <option value="9">(9) Great</option>
              <option value="10">(10) Masterpiece</option>
            </select>
          </td>
        ) : (
          <td>{myMovie?.myScore}</td>
        )}

        {true ? (
          <td>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="0">Select Status</option>
              <option value="Watching">Watching</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
              <option value="Dropped">Dropped</option>
              <option value="Plan to Watch">Plan to Watch</option>
            </select>
          </td>
        ) : (
          <td>{myMovie?.status}</td>
        )}
        <td>
          <button onClick={() => updateProduct(myMovie._id)}>Edit </button>
        </td>
        <td>
          <button onClick={() => handleDeleteItem(myMovie._id)}>Delete</button>
        </td>
      </tr>
    </table>
  );
}

export default MyMovieCard;
