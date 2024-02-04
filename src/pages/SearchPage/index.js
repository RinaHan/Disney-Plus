import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "./SearchPage.css";
import { useDebounce } from "../../hooks/useDebounce";

export const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  // 
  const searchTerm = query.get("q");
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  // const debouncedSearchTerm = useDebounce(query.get('q'), 500)
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);
  // useEffect(() => {
  //   if (searchTerm) {
  //     fetchSearchMovie(searchTerm);
  //   }
  // }, [searchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const response = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`);
      // 
      setSearchResults(response.data.results);
    } catch (error) {
      
    }
  };
  // 
  // if (searchResults) {
  if (searchResults.length > 0) {
    return (
      <section className='search-container'>
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            // 
            return (
              <div className='movie' key={movie.id}>
                <div className='movie_column-poster' onClick={() => navigate(`/${movie.id}`)}>
                  {/* <div onClick={() => Navigate(`/${movie.id}`)} className='movie_column-poster'> */}
                  <img className='movie_poster' src={movieImageUrl} alt='movie' />
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
          <p>There are no results of "{searchTerm}"</p>
        </div>
      </section>
    );
  }
};

// const
