import React, { useEffect, useState } from "react";
import "./movie.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import Cards from "../../components/card/card";
import YouTube from "react-youtube";

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState();
  const { id, type } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [topCast, setTopCast] = useState();
  const [movieRecommend, setmMovieRecommend] = useState();
  const [movieSimilar, setmMovieSimilar] = useState();
  const [movieTrailer, setMovieTrailer] = useState();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
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

    // *************** Top Cast Data *************************************
    let castUrl;
    if (type === "movie") {
      castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US&api_key=9abd8c3499d4d44e696cc0deefa3f156`;
    } else if (type === "tv") {
      castUrl = `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US&api_key=9abd8c3499d4d44e696cc0deefa3f156`;
    }
    fetch(castUrl)
      .then((res) => res.json())
      .then((data1) => setTopCast(data1.cast.slice(0, 5)));

    // *************** Movie Recommend Data *************************************
    let movieRecomm;
    if (type === "movie") {
      movieRecomm = `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1?language=en-US&api_key=9abd8c3499d4d44e696cc0deefa3f156`;
    } else if (type === "tv") {
      movieRecomm = `https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1?language=en-US&api_key=9abd8c3499d4d44e696cc0deefa3f156`;
    }
    fetch(movieRecomm)
      .then((res) => res.json())
      .then((data) => setmMovieRecommend(data.results.slice(0, 8)));

    // *************** Similar Movie Data *************************************
    let similarMovie;
    if (type === "movie") {
      similarMovie = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1?language=en-US&api_key=9abd8c3499d4d44e696cc0deefa3f156`;
    } else if (type === "tv") {
      similarMovie = `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1?language=en-US&api_key=9abd8c3499d4d44e696cc0deefa3f156`;
    }
    fetch(similarMovie)
      .then((res) => res.json())
      .then((data) => setmMovieSimilar(data.results.slice(0, 8)));

    // *************** Movie Trailer Data *************************************
    let movietrail;
    if (type === "movie") {
      movietrail = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&page=1?language=en-US&api_key=9abd8c3499d4d44e696cc0deefa3f156`;
    } else if (type === "tv") {
      movietrail = `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US&page=1?language=en-US&api_key=9abd8c3499d4d44e696cc0deefa3f156`;
    }
    fetch(movietrail)
      .then((res) => res.json())
      // .then((data) => setMovieTrailer(data.results));
      .then((data) => {
        // Filter out videos of type "Teaser"
        const teaserVideos = data.results.filter(
          (video) => video.type === "Teaser" || video.type === "Trailer"
        );

        // Assuming you want to show the first teaser video, if available
        const firstTeaserVideo =
          teaserVideos.length > 0 ? teaserVideos[0].key : null;

        // Now, you can set the first teaser video key in your state
        setMovieTrailer(firstTeaserVideo);
      });
  };

  console.log("Recommended ");
  console.log(movieRecommend);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // autoplay: 1,
    },
  };
  return (
    <>
      {isLoading ? (
        <div className="movie">
          <div className="movie__intro">
            {/* <img className="" src={""} /> */}
            <div className="movie__backdrop">
              <SkeletonTheme color="#202020" highlightColor="#444">
                <Skeleton height={490} duration={2} />
              </SkeletonTheme>
            </div>
          </div>
          <div className="movie__detail">
            <div className="movie__detailLeft">
              <div className="movie__posterBox">
                <div className="movie__poster">
                  {" "}
                  <SkeletonTheme color="#202020" highlightColor="#444">
                    <Skeleton height={490} duration={2} />
                  </SkeletonTheme>
                </div>
              </div>
            </div>
            <div className="movie__detailRight">
              <div className="movie__detailRightTop">
                <div className="movie__name">
                  <SkeletonTheme color="#202020" highlightColor="#444">
                    <Skeleton height={70} duration={2} />
                  </SkeletonTheme>
                </div>
                <div className="movie__tagline">
                  <SkeletonTheme color="#202020" highlightColor="#444">
                    <Skeleton
                      height={20}
                      style={{ width: "50%" }}
                      duration={2}
                    />
                  </SkeletonTheme>
                </div>
                <div className="movie__rating">
                  <SkeletonTheme color="#202020" highlightColor="#444">
                    <Skeleton
                      height={20}
                      style={{ width: "50%" }}
                      duration={2}
                    />
                  </SkeletonTheme>
                  <span className="movie__voteCount">
                    <SkeletonTheme color="#202020" highlightColor="#444">
                      <Skeleton
                        height={20}
                        style={{ width: "50%" }}
                        duration={2}
                      />
                    </SkeletonTheme>
                  </span>
                </div>
                <div className="movie__runtime">
                  <SkeletonTheme color="#202020" highlightColor="#444">
                    <Skeleton
                      height={20}
                      style={{ width: "50%" }}
                      duration={2}
                    />
                  </SkeletonTheme>
                </div>
                <div className="movie__releaseDate">
                  <SkeletonTheme color="#202020" highlightColor="#444">
                    <Skeleton
                      height={20}
                      style={{ width: "50%" }}
                      duration={2}
                    />
                  </SkeletonTheme>
                </div>

                <div className="movie__genres">
                  <SkeletonTheme color="#202020" highlightColor="#444">
                    <Skeleton
                      height={40}
                      style={{ width: "50%" }}
                      duration={2}
                    />
                  </SkeletonTheme>
                </div>
              </div>
              <div className="movie__detailRightBottom">
                <div className="synopsisText">Synopsis</div>
                <div>
                  <SkeletonTheme color="#202020" highlightColor="#444">
                    <Skeleton
                      height={40}
                      style={{ width: "80%" }}
                      count={3}
                      duration={2}
                    />
                  </SkeletonTheme>
                </div>
              </div>
            </div>
          </div>
          <div className="movie__links">
            <div className="movie__heading">Useful Links</div>

            <SkeletonTheme color="#202020" highlightColor="#444">
              <Skeleton height={40} style={{ width: "100%" }} duration={2} />
            </SkeletonTheme>
          </div>
          <div className="movie__heading">Production companies</div>
          <div className="movie__production">
            <div className="productionCompanyImage">
              <div className="movie__productionComapany">
                <SkeletonTheme color="#202020" highlightColor="#444">
                  <Skeleton
                    height={40}
                    style={{ width: "100%" }}
                    duration={2}
                  />
                </SkeletonTheme>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="movie">
          <div className="movie__intro">
            <img
              className="movie__backdrop"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.backdrop_path : ""
              }`}
            />
          </div>
          <div className="movie__detail">
            <div className="movie__detailLeft">
              <div className="movie__posterBox">
                <img
                  className="movie__poster"
                  src={`https://image.tmdb.org/t/p/original${
                    currentMovieDetail ? currentMovieDetail.poster_path : ""
                  }`}
                />
              </div>
            </div>
            <div className="movie__detailRight">
              <div className="movie__detailRightTop">
                <div className="movie__name">
                  {currentMovieDetail
                    ? currentMovieDetail.original_title ||
                      currentMovieDetail.original_name
                    : ""}
                </div>
                <div className="movie__tagline">
                  {currentMovieDetail ? currentMovieDetail.tagline : ""}
                </div>
                <div className="movie__rating">
                  {currentMovieDetail ? currentMovieDetail.vote_average : ""}{" "}
                  <i class="fas fa-star" />
                  <span className="movie__voteCount">
                    {currentMovieDetail
                      ? "(" + currentMovieDetail.vote_count + ") votes"
                      : ""}
                  </span>
                </div>
                <div className="movie__runtime">
                  {currentMovieDetail
                    ? currentMovieDetail.runtime
                      ? currentMovieDetail.runtime + " mins"
                      : " "
                    : " "}
                </div>
                {currentMovieDetail
                  ? currentMovieDetail.release_date
                    ? "Release date: " + currentMovieDetail.release_date
                    : currentMovieDetail.first_air_date
                    ? "Release date: " + currentMovieDetail.first_air_date
                    : "Release date not available"
                  : "Movie/TV show details not available"}
                <div className="movie__genres">
                  {currentMovieDetail && currentMovieDetail.genres
                    ? currentMovieDetail.genres.map((genre) => (
                        <>
                          <span className="movie__genre" id={genre.id}>
                            {genre.name}
                          </span>
                        </>
                      ))
                    : ""}
                </div>
              </div>
              <div className="movie__detailRightBottom">
                <div className="synopsisText">Synopsis</div>
                <div>
                  {currentMovieDetail ? currentMovieDetail.overview : ""}
                </div>
              </div>
            </div>
          </div>
          {/* ***************************** Top Cast********************************** */}
          <div className="movie__heading">Top Cast</div>
          <div className="castMainDiv">
            {topCast.map((cast) => (
              <div>
                <div className="cast-img">
                  <img
                    src={`https://image.tmdb.org/t/p/original${
                      cast ? cast.profile_path : ""
                    }`}
                  />
                </div>
                <h4>{cast ? cast.original_name : ""}</h4>
                <p>{cast ? cast.character : ""}</p>
              </div>
            ))}
          </div>

          {/* ***************************** Official Video********************************** */}
          <div className="movie__heading">Official Video</div>
          <YouTube
            videoId={movieTrailer}
            opts={opts}
            containerClassName="youtube-container"
          />

          {/* ***************************** Similar Movies/TV********************************** */}

          <div className="movie__heading">
            Similar {type === "tv" ? "TV Shows" : "Movies"}
          </div>
          <div className="castMainDiv">
            {movieSimilar.length > 0 ? (
              <div className="list__cards">
                {movieSimilar.map((movie) => (
                  <Cards key={movie.id} movie={movie} itertainmentType={type} />
                ))}
              </div>
            ) : (
              <p>
                No Similar {type === "tv" ? "TV Shows" : "Movies"} available.
              </p>
            )}
          </div>

          {/* ***************************** Recommended Movies/TV********************************** */}

          <div className="movie__heading">
            Recommended {type === "tv" ? "TV Shows" : "Movies"}
          </div>
          <div className="castMainDiv">
            {movieRecommend.length > 0 ? (
              <div className="list__cards">
                {movieRecommend.map((movie) => (
                  <Cards key={movie.id} movie={movie} itertainmentType={type} />
                ))}
              </div>
            ) : (
              <p>
                No recommended {type === "tv" ? "TV Shows" : "Movies"}{" "}
                available.
              </p>
            )}
          </div>

          {/* <div className="movie__links">
            <div className="movie__heading">Useful Links</div>
            {currentMovieDetail && currentMovieDetail.homepage && (
              <a
                href={currentMovieDetail.homepage}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <p>
                  <span className="movie__homeButton movie__Button">
                    Homepage <i className="newTab fas fa-external-link-alt"></i>
                  </span>
                </p>
              </a>
            )}
            {currentMovieDetail && currentMovieDetail.imdb_id && (
              <a
                href={
                  "https://www.imdb.com/title/" + currentMovieDetail.imdb_id
                }
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <p>
                  <span className="movie__imdbButton movie__Button">
                    IMDb<i className="newTab fas fa-external-link-alt"></i>
                  </span>
                </p>
              </a>
            )}
          </div> */}
          <div className="movie__heading">Production companies</div>
          <div className="movie__production">
            {currentMovieDetail &&
              currentMovieDetail.production_companies &&
              currentMovieDetail.production_companies.map((company) => (
                <>
                  {company.logo_path && (
                    <span className="productionCompanyImage">
                      <img
                        className="movie__productionComapany"
                        src={
                          "https://image.tmdb.org/t/p/original" +
                          company.logo_path
                        }
                      />
                      <span>{company.name}</span>
                    </span>
                  )}
                </>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;
