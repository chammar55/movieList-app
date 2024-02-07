import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";
import { useNavigate } from "react-router-dom";
import "./home.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Home() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const [popularMovies, setPopularMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
    )
      .then((res) => res.json())
      .then((data) => setPopularMovies(data.results));
  }, []);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        // onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {/* <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
        {popularMovies.map((movie) => (
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={`/details/movie/${movie.id}`}
          >
            <SwiperSlide
              style={{ cursor: "pointer" }}
              onClick={(event) => {
                // Manually navigate to the desired URL
                navigate(`/details/movie/${movie.id}`);
                // Prevent the default behavior of the link
                event.preventDefault();
              }}
            >
              <div className="posterImage">
                <img
                  src={`https:image.tmdb.org/t/p/original${
                    movie && movie.backdrop_path
                  }`}
                />
              </div>
              <div className="posterImage__overlay">
                <div className="posterImage__title">
                  {movie ? movie.original_title : ""}
                </div>
                <div className="posterImage__runtime">
                  {movie ? movie.release_date : ""}
                  <span className="posterImage__rating">
                    {movie ? movie.vote_average : ""}
                    <i className="fas fa-star" />{" "}
                  </span>
                </div>
                <div className="posterImage__description">
                  {movie ? movie.overview : ""}
                </div>
              </div>
            </SwiperSlide>
          </Link>
        ))}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
      <MovieList />
    </>
  );
}

// import React, { useEffect, useState } from "react";
// import "./home.css";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
// import { Link } from "react-router-dom";
// import MovieList from "../../components/movieList/movieList";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const [popularMovies, setPopularMovies] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch(
//       "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
//     )
//       .then((res) => res.json())
//       .then((data) => setPopularMovies(data.results));
//   }, []);

//   return (
//     <>
//       <div className="poster">
//         <Carousel
//           showThumbs={false}
//           autoPlay={true}
//           transitionTime={3}
//           infiniteLoop={true}
//           showStatus={false}
//         >
//           {popularMovies.map((movie) => (
//             <Link
//               style={{ textDecoration: "none", color: "white" }}
//               to={`/details/movie/${movie.id}`}
//             >
//               <div className="posterImage">
//                 <img
//                   src={`https://image.tmdb.org/t/p/original${
//                     movie && movie.backdrop_path
//                   }`}
//                 />
//               </div>
//               <div className="posterImage__overlay">
//                 <div className="posterImage__title">
//                   {movie ? movie.original_title : ""}
//                 </div>
//                 <div className="posterImage__runtime">
//                   {movie ? movie.release_date : ""}
//                   <span className="posterImage__rating">
//                     {movie ? movie.vote_average : ""}
//                     <i className="fas fa-star" />{" "}
//                   </span>
//                 </div>
//                 <div className="posterImage__description">
//                   {movie ? movie.overview : ""}
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </Carousel>
//         <MovieList />
//       </div>
//     </>
//   );
// };

// export default Home;
