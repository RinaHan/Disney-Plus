import React from "react";
import "./MovieModal.css";

function MovieModal({
  title,
  backdrop_path,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen,
}) {
  return (
    <div className='presentation' role='presentation'>
      {/* {console.log("setModalOpen", setModalOpen===true)} */}
      <div className='wrapper-modal'>
        <div className='modal'>
          <span
            className='modal-close'
            onClick={() => {
              setModalOpen(false);
            }}
          >
            x
          </span>
          <img
            className='modal_poster-img'
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            art='modal-img'
          />
          <div className='modal_contents'>
            <p className='modal_details'>
              {/* class check */}
              <span className='modal_user_perc'>100% for you</span>{" "}
              {release_date ? release_date : first_air_date}
            </p>

            <h2 className='modal_title'>{title ? title : name}</h2>
            {/* <p className='modal_overview'>평점:{vote_average} </p> */}
            <p className='modal_overview'>{overview} </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
