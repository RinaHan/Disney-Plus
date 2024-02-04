import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

export const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  // console.log("query: ", query.get("q"));
  const searchTerm = query.get("q");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm) {
      fetchSearchMovie(searchTerm);
    }
  }, [searchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const response = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`);
      // console.log("response: ", response.data.results.length>0);
      setSearchResults(response.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };
  // console.log("length", searchResults);
  // if (searchResults) {
  if (searchResults.length > 0) {
    return (
      <section className='search-container'>
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            // console.log('movieImageUrl: ', movieImageUrl);
            return (
              <div className='movie' key={movie.id}>
                <div className='movie_column-poster' onClick={() => navigate(`/${movie.id}`)}>
                  {/* <div onClick={() => Navigate(`/${movie.id}`)} className='movie_column-poster'> */}
                  <img src={movieImageUrl} alt='movie' className='movie_poster' />
                </div>
              </div>
            );
          }
        })}
      </section>
    );
  } else {
    return (
      <section className='no-results'>
        <div className='no-results_text'>
          <p>no results of "{searchTerm}"</p>
        </div>
      </section>
    );
  }
};

// const
