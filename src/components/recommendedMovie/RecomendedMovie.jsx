import React, { useEffect, useState } from "react";
import Cards from "../card/card";

function RecomendedMovie({ type, movieRecommend }) {
  return (
    <div>
      {" "}
      <div className="movie__heading">
        Recommended {type === "tv" ? "TV Shows" : "Movies"}
      </div>
      <div className="castMainDiv">
        <div className="list__cards">
          {movieRecommend.map((movie) => (
            <Cards movie={movie} itertainmentType={type} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecomendedMovie;
