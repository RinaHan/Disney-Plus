/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "./SearchPage.css";
import { useDebounce } from "../../hooks/useDebounce";

export const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  // console.log('searchResults: ', searchResults[0]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  //
  const searchTerm = query.get("q");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
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
    } catch (error) {}
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + "..." : str;
  };

  //
  // if (searchResults) {
  if (searchResults.length > 0) {
    return (
      <section className='search-container'>
        {searchResults.map((movie) => {
          // console.log("title", movie);

          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            //
            return (
              <div className='movie' key={movie.id}>
                <div className='movie_poster_wrap' onClick={() => navigate(`/${movie.id}`)}>
                  {/* <div onClick={() => Navigate(`/${movie.id}`)} className='movie_poster_wrap'> */}
                  <img className='movie_poster' src={movieImageUrl} alt='movie' />
                  <div className='movie_desc_wrap'>
                    <div className='movie_desc'>
                      <div className='movie_title'>
                        {movie.title ? `"` + movie.title + `"` : `"` + movie.original_name + `"`}
                      </div>
                      <div className='movie_overview'>{truncate(movie.overview, 70)}</div>
                    </div>
                    <div className="my_list">My List</div>
                  </div>
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
