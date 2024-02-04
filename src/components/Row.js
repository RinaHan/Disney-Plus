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
        breakpoints={{
          1378: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
      >
        <Content id={id}>
          {movies.map((movie) => (
            // console.log('mov', movie.id)
            <SwiperSlide>
              <Wrap>
                <img
                  key={movie.id}
                  // className='row_poster'
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
const Wrap = styled.div`
width: 95%;
height: 95%;
padding-top: 56.25%;
border-radius: 10px;
box-shadow: rgb(0 0 0 0/69%) 0px 26px 30px -10px,
rgb(0 0 0 0/73% 0px 16px 10px -10px);
cursor: pointer;
overflow:hidden;
position:relative;
transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
border: 3px solid #484747eb;

img{
  inset: 0px;
  display:block;
  height:100%;
  object-fit:cover:
  opacity: 1;
  position: absolute;
  width:100%;
  transition: opacity 500ms ease-in-out;
  z-index:1;
}
&:hover{
  box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
  rgb(0 0 0 / 72%) 0px 30px 22px -40px;
  transform: scale(0.98);
  border-color: rgba(249, 249, 249, 0.8);
}
`;
