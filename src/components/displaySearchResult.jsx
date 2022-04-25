import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./displaySearchResult.css";
import SearchResultItem from "./searchResultItem";
import YearSelect from "./yearSelect";
import YearNav from "./yearNav";
import { getMovieByYear, getMovieBySearchWord } from "../services/movieService";

export default function DisplaySearchResult() {
  const yearArr = ["2017", "2018", "2019", "2020", "2021"];
  const [movieArr, setMovieArr] = useState([]);
  const [notFoundRes, setNotFoundRes] = useState();
  const [searchQParam, setSearchQParam] = useState();
  const [isLoading, setIsLoading] = useState(false);

  let params = useParams();

  useEffect(() => {
    if (!params.searchQ) {
      getMovieBySearchParams("car");
      setSearchQParam("car");
    } else {
      setSearchQParam(params.searchQ);
    }
  }, []);

  useEffect(() => {
    if (params.searchQ && !params.YYYY) {
      window.scrollTo(0, 0);
      getMovieBySearchParams(params.searchQ);
      setSearchQParam(params.searchQ);
    }
  }, [params.searchQ]);

  useEffect(() => {
    if (params.YYYY) {
      getMovieBySearchParams(params.searchQ, params.YYYY);
    }
  }, [params.YYYY]);

  const getMovieBySearchParams = async (_searchWord, _year) => {
    setIsLoading(true);

    let tempArr = [];
    let responseRes;

    if (!_year) {
      responseRes = await getMovieBySearchWord(_searchWord);
    } else {
      responseRes = await getMovieByYear(_searchWord, _year);
    }

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

  return (
    <React.Fragment>
      <YearNav searchQParam={searchQParam} yearArr={yearArr} />

      <div className="container py-4 ">
        <YearSelect searchQParam={searchQParam} yearArr={yearArr} />

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
