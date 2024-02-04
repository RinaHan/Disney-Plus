import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";

export const DetailPage = () => {
  let { movieId } = useParams();
  // let movieId = useParams().movieId
  // console.log("movieId", movieId);

  const [movie, setMovie] = useState({});
  // console.log('movie: ', movie);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/movie/${movieId}`);
      setMovie(response.data);
      // console.log("response", response.data.backdrop_path);
    }
    fetchData();
  }, [movieId]);

  if (!movie) return null;

  return (
    <section>
      <img
        className='modal_poster-img'
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt='img'
      />
    </section>
  );
};
