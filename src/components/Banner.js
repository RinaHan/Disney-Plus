import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import requests from "../api/request";
import "./Banner.css";
import styled from "styled-components";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

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
    // console.log('moId', movieDetail.videos)

    setMovie(movieDetail);
    // console.log("movieD", movie?.videos?.results[0]?.key);
  };

  //   console.log('cehck', movie.video?.results)
  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + "..." : str;
  };

  if (isClicked) {
    return (
      <>
        <Container>
          <HomeContainer>
            <Iframe
              src={`https://www.youtube.com/embed/${movie?.videos?.results[0]?.key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos?.results[0].key}`}
              width='640'
              height='360'
              frameborder='0'
              allow='autoplay; fullscreen'
            ></Iframe>
            {/* <Iframe
            width='560'
            height='315'
            src='https://www.youtube.com/embed/cRbYxsLHyJU?si=Bv8seZLv-3DRXBO6'
            title='YouTube video player'
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowfullscreen
          ></Iframe> */}
          </HomeContainer>
        </Container>
        <button onClick={()=>setIsClicked(false)}>X</button>
      </>
    );
  } else {
    return (
      <header
        className='banner'
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className='banner_contents'>
          <h1 className='banner_title'>{movie.title || movie.name || movie.original_name}</h1>
          <div className='banner_buttons'>
            {/* {movie?.videos?.results[0]?.key && ( */}
            <button
              className='banner_button play'
              onClick={() => {
                setIsClicked(true);
              }}
            >
              Play
            </button>
            {/* )} */}
            {/* <button>test</button> */}
          </div>
          {/* <h1 className='banner_desc'>{movie.overview}</h1> */}
          <h1 className='banner_desc'>{truncate(movie.overview, 100)}</h1>
        </div>
        <div className='banner--fadeBottom' />
      </header>
    );
  }
}

export default Banner;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 50vh;
  /* height: 100vh; */
`;
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;
  &::afer {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;
