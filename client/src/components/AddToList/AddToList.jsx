import React, { useEffect, useState } from "react";
import "./AddToList.css";

function AddToList({ movieId, type }) {
  const [myScore, setMyScore] = useState("-");
  const [status, setStatus] = useState("Plan to watch");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [myMovie, setMyMovie] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    getdataValues();
  }, []);
  // useEffect(() => {
  //   getdataValues();
  // }, [myMovie]);

  const getdataValues = async () => {
    const res = await fetch(`http://localhost:5000/get-movieList/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setMyMovie(data);
    }
  };

  // console.log(myMovie);
  const desiredMovie = myMovie.find((movie) => movie.movieId === movieId);

  // console.log(desiredMovie);
  // console.log(desiredMovie._id);

  const handleDelete = async (_id) => {
    let result = await fetch(
      `http://localhost:5000/delete-movieList/${desiredMovie._id}`,
      {
        method: "Delete",
      }
    );
    result = await result.json();
    if (result) {
      // alert("record is deleted");

      getdataValues();
      console.log(result);
    }
  };

  const handleAddToCart = async () => {
    setIsButtonDisabled(true);
    // Perform the logic for adding to cart
    // console.log(`Added to cart with rating: ${myScore} and Status ${status}`);

    const userId = JSON.parse(localStorage.getItem("user"))._id; // get user id from localStorage, User that is logged in
    // console.log(movieId);
    let result = await fetch("http://localhost:5000/add-movieList", {
      method: "post",
      body: JSON.stringify({ movieId, myScore, status, userId, type }),
      //we are sending token to productlist api
      //we are authenicating users by their tokens
      headers: {
        "Content-Type": "application/json",
        //bearer is to make auth more strong.we are checking it in verifyToken middleware in index.js file so that why we have to type it here with token itself
        // authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();

    // console.log(result);
  };

  return (
    <div>
      {desiredMovie ? (
        <button
          className="deleteFromList-btn"
          type="button"
          onClick={handleDelete}
        >
          Delete from list
        </button>
      ) : (
        <form>
          {/* Movie Title, Price, or other details can be added here */}

          <div className="rating-div ">
            {/* <label htmlFor="rating">Select Rating:</label> */}

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
            {/* <button
            className="addToList-btn"
            type="button"
            onClick={handleAddToCart}
            disabled={isButtonDisabled}
          >
            Add to List
          </button> */}
            <button
              className={`addToList-btn ${isButtonDisabled ? "disabled" : ""}`}
              type="button"
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? "Added" : "Add to List"}
            </button>
            {/* {message && <p className="success-message">{message}</p>} */}
          </div>
        </form>
      )}
    </div>
  );
}

export default AddToList;
