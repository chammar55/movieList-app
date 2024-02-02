import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/home";
import MovieList from "./components/movieList/movieList";
import Movie from "./pages/movieDetail/movie";
import SearchMovies from "./pages/searchMovies/SearchMovie";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />}></Route>
          {/* <Route path="movie/:id" element={<Movie />}></Route>
          <Route path="tv/:id" element={<Movie />}></Route> */}
          <Route path="/details/:type/:id" element={<Movie />} />
          <Route path="movies/:type" element={<MovieList />}></Route>
          <Route path="movies/:type" element={<MovieList />}></Route>
          <Route
            path="searchMovie/:movieName"
            element={<SearchMovies />}
          ></Route>
          <Route path="/*" element={<h1>Error Page</h1>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
