import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsStarHalf, BsStarFill, BsArrowReturnLeft } from "react-icons/bs";
import "./infoItem.css";

export default function InfoItem(props) {
  const { movie } = props;
  const [starArr, setStarArr] = useState([]);

  const navigation = useNavigate();

  useEffect(() => {
    let wholeNumber = Number(movie.imdbRating?.slice(0, 1));
    let tempArr = [];

    if (wholeNumber < movie.imdbRating) {
      for (let index = 0; index < wholeNumber + 1; index++) {
        if (index == wholeNumber) {
          tempArr.push(<BsStarHalf className="text-warning"></BsStarHalf>);
        } else {
          tempArr.push(<BsStarFill className="text-warning"></BsStarFill>);
        }
      }
    } else {
      for (let index = 0; index < wholeNumber; index++) {
        tempArr.push(<BsStarFill className="text-warning"></BsStarFill>);
      }
    }

    setStarArr(tempArr);
  }, []);

  return (
    <div className="container py-5 text-white px-0 px-lg-3">
      <div className="movie_div row p-0">
        <div className="img_info_div mx-md-auto col-lg-4 p-0">
          <img src={movie.Poster} alt={movie.Title} className="w-100 h-100" />
        </div>

        <div className="info_div col-lg-8 row p-0 m-0 mx-md-auto align-items-lg-center">
          <div className="in_info_div">
            <h2 className="fw-bold">{movie.Title}</h2>

            <div className="mt-3">
              <span>{movie.Genre} | </span>

              <span>{movie.Year} | </span>

              <span>
                {starArr.map((item, i) => {
                  return <span key={i}>{item}</span>;
                })}
              </span>
            </div>

            <p className="mt-3 fs-5">{movie.Plot}</p>

            <div
              className="arrow_div col-1 fs-1 text-center"
              onClick={() => {
                navigation(-1);
              }}
            >
              <BsArrowReturnLeft></BsArrowReturnLeft>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
