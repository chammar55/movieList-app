import React, { useEffect, useState } from "react";
import "./ShowMyMovies.css";
import MyMovieCard from "../../components/myMovieCard/MyMovieCard";

function ShowMyMovies() {
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

  //   console.log(myMovie);

  const handleDelete = async (_id) => {
    let result = await fetch(`http://localhost:5000/delete-movieList/${_id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      // alert("record is deleted");

      getdataValues();
      console.log(result);
    }
  };

  // console.log("hello");

  return (
    <div>
      {/* ShowMyMovies */}
      {/* <div className="mCard">
         <h1>Image</h1>
        <h1>Title</h1>
        <h1>Score</h1>
        <h1>Type</h1>
        <h1>Edit</h1>  </div> */}
      <table>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Type</th>
          <th>Score</th>
          <th>Status</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </table>
      {myMovie.length > 0 &&
        myMovie.map((item, index) => (
          <MyMovieCard key={index} myMovie={item} handleDelete={handleDelete} />
        ))}
    </div>
  );
}

export default ShowMyMovies;
