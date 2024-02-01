import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import requests from "../api/request";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    //call now playing movies
    const response = await axios.get(requests.fetchNowPlaying);
    // console.log("re", response.data.results.length);

    //call a movie id
    const movieId =
      response.data.results[Math.floor(Math.random() * response.data.results.length)].id;
    // console.log('mo', movieId)

    //call the movie's detail using the movie's id
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "video" },
    });
    // console.log('moId', movieDetail)

    setMovie(movieDetail);
    console.log("movieD", movie?.videos?.results[0]?.key);
  };

  return (
    <header
      className='banner'
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
        height: "300px",
      }}
    >
      <div className='banner_contents'>
        <hi className='banner_title'>{movie.title || movie.name || movie.original_name}</hi>
        <div className='banner_buttons'>
          {movie?.videos?.results[0]?.key && <button className='banner_button play'>Play</button>}
        </div>
        <h1 className='banner_desc'>{movie.overview}</h1>
      </div>
      <div className='banner--fadeBottom' />
    </header>
  );
}

export default Banner;
