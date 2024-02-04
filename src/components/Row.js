import axios from "../api/axios";
import React, { useCallback, useEffect, useState } from "react";
import "./Row.css";
import MovieModal from "./MovieModal";
// import requests from "../api/request";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styled from "styled-components";

const Row = (props, id) => {
  // const Row = (title, id, fetchUrl) => {
  // console.log('fet',props.fetchUrl)
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

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
    setMovieSelected(movie);
    // console.log('handleclick', movie)
  };

  return (
    <Container>
      <h2>{props.title}</h2>
      <Swiper
        //install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true} //use loop ability
        navigation //arrow button
        pagination={{ clickable: true }} //page button
      >
        <Content id={id}>
          {movies.map((movie) => (
            // console.log('mov', movie.id)
            <SwiperSlide>
              <Wrap>
                <img
                  key={movie.id}
                  className='row_poster'
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={movie.name}
                  onClick={() => handleClick(movie)}
                />
              </Wrap>
            </SwiperSlide>
          ))}
        </Content>
      </Swiper>
      {modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />}
    </Container>
  );
};

export default Row;

const Container = styled.div`
  padding: 0 0 26px;
`;

const Content = styled.div``;
const Wrap = styled.div``