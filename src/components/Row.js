import axios from "../api/axios";
import React, { useCallback, useEffect, useState } from "react";
import "./Row.css";
import MovieModal from "./MovieModal";

// import requests from "../api/request";

const Row = (props, id) => {
  // const Row = (title, id, fetchUrl) => {
  // console.log('fet',props.fetchUrl)
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({})

  const fetchMovieData = useCallback(async () => {
    // const response = await axios.get(fetchUrl);
    const response = await axios.get(props.fetchUrl);
    // const response = await axios.get(requests.fetchComedyMovies);
    // console.log("respo", response);
    setMovies(response.data.results);
  }, [props.fetchUrl]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie)
    console.log('handleclick', movie)
  };

  return (
    <div>
      <h2>{props.title}</h2>
      <div className='slider'>
        <div className='slider_arrow left'>
          <span
            className='arrow'
            onClick={() => {
              document.getElementById(props.id).scrollLeft -= window.innerWidth - 80;
            }}
          >
            {"<"}
          </span>
        </div>
        {/* {console.log("id", document.getElementById(props.id))} */}
        <div id={props.id} className='row_posters'>
          {movies.map((movie) => (
            // console.log('mov', movie.id)
            <img
              key={movie.id}
              className='row_poster'
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.name}
              onClick={() => handleClick(movie)}
            />
          ))}
        </div>
        <div className='slider_arrow right'>
          <span
            className='arrow'
            onClick={() => {
              document.getElementById(props.id).scrollLeft += window.innerWidth + 80;
            }}
          >
            {">"}
          </span>
        </div>
      </div>
      {modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />}
    </div>
  );
};

export default Row;
