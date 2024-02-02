import axios from "../api/axios";
import React, { useCallback, useEffect, useState } from "react";
// import requests from "../api/request";

const Row = (props) => {
  // const Row = (title, id, fetchUrl) => {
  // console.log('fet',props.fetchUrl)
  const [movies, setMovies] = useState([]);

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

  return (
    <div>
      <h2>{props.title}</h2>
      <div className='slider'>
        <div className='slider_arrow-left'>
          <span className='arrow'>{"<"}</span>
        </div>
        <div id={props.id} className='row_posters'>
          {movies.map((movie) => (
            // console.log('mov', movie.id)
            <img
              key={movie.id}
              className='row_poster'
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.name}
            />
          ))}
        </div>
        <div className='slider_arrow-right'>
          <span className='arrow'>{">"}</span>
        </div>
      </div>
    </div>
  );
};

export default Row;
