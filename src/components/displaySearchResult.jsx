import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./displaySearchResult.css";
import omdbApi from "../omdbApi.js";
import SearchResultItem from "./searchResultItem";

export default function DisplaySearchResult() {
  const yearArr = ["2017", "2018", "2019", "2020", "2021"];
  const [movieArr, setMovieArr] = useState([]);
  const [notFoundRes, setNotFoundRes] = useState();
  const [searchQParam, setSearchQParam] = useState();
  const [isLoading, setIsLoading] = useState(false);

  let params = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    if (!params.searchQ) {
      getMovieBySearchWord("car");
      setSearchQParam("car");
    } else {
      setSearchQParam(params.searchQ);
    }
  }, []);

  useEffect(() => {
    if (params.searchQ && !params.YYYY) {
      getMovieBySearchWord(params.searchQ);
      setSearchQParam(params.searchQ);
    }
  }, [params.searchQ]);

  useEffect(() => {
    if (params.YYYY) {
      getMovieByYear(params.searchQ, params.YYYY);
    }
  }, [params.YYYY]);

  const getMovieBySearchWord = async (_searchWord) => {
    setIsLoading(true);

    let tempArr = [];
    const responseRes = await omdbApi.get(`&s=${_searchWord}`);

    if (responseRes.data.Error) {
      setNotFoundRes(responseRes.data.Error);
    } else {
      tempArr = responseRes.data.Search;

      tempArr.forEach((item) => {
        if (item.Poster === "N/A") {
          item.Poster = "/imageNotFound.png";
        }

        if (item.Title.length > 23) {
          item.Title = `${item.Title.slice(0, 22)}...`;
        }
      });

      setNotFoundRes();
      setMovieArr(tempArr);
    }

    setIsLoading(false);
  };

  const getMovieByYear = async (_searchWord, _year) => {
    setIsLoading(true);

    let tempArr = [];
    const responseRes = await omdbApi.get(`&s=${_searchWord}&y=${_year}`);

    if (responseRes.data.Error) {
      setNotFoundRes(responseRes.data.Error);
      console.log(notFoundRes);
    } else {
      tempArr = responseRes.data.Search;

      tempArr.forEach((item) => {
        if (item.Poster === "N/A") {
          item.Poster = "/imageNotFound.png";
        }

        if (item.Title.length > 23) {
          item.Title = `${item.Title.slice(0, 22)}...`;
        }
      });

      setNotFoundRes();
      setMovieArr(tempArr);
    }

    setIsLoading(false);
  };

  const onClick = (event) => {
    navigation(`/year/${event.target.value}/search/${searchQParam}`);
  };

  return (
    <React.Fragment>
      <nav className="year_nav row py-3 px-3 justify-content-center align-items-center">
        <h3 className="text-center m-0 py-2 text-white col-md-4 col-xxl-2">Top Years</h3>

        {yearArr.map((item) => {
          return (
            <Link
              key={item}
              to={`/year/${item}/search/${searchQParam}`}
              className="link col-md-1 my-2 mx-2 text-center rounded"
            >
              {item}
            </Link>
          );
        })}
      </nav>

      <div className="container py-4 ">
        <select className="year_select form-select text-center mb-2 border-0" onChange={onClick}>
          <option>Top Years</option>
          {yearArr.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>

        {notFoundRes || isLoading ? (
          isLoading ? (
            <div className="text-center">
              <img src="/loadingGif.gif" alt="loading" className="w-50" />
            </div>
          ) : (
            <h2 className="text-center text-white"> {notFoundRes}</h2>
          )
        ) : (
          <div className="row">
            {movieArr.map((item) => {
              return <SearchResultItem key={item.imdbID} item={item} />;
            })}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
