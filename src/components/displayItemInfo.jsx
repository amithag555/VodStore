import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import omdbApi from "../omdbApi.js";
import InfoItem from "./infoItem.jsx";

export default function DisplayItemInfo() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentMovie, setCurrentMovie] = useState({});

  let params = useParams();

  useEffect(() => {
    getMovieById(params.id);
  }, [params.id]);

  const getMovieById = async (_movieId) => {
    setIsLoading(true);
    let tempMovie = {};

    const responseRes = await omdbApi.get(`&i=${_movieId}`);
    tempMovie = responseRes.data;

    if (tempMovie.Poster === "N/A") {
      tempMovie.Poster = "/imageNotFound.png";
    }

    setCurrentMovie(tempMovie);
    setIsLoading(false);
  };

  return (
    <div className="container">
      {isLoading ? (
        <div className="text-center">
          <img src="/loadingGif.gif" alt="loading" className="w-50" />
        </div>
      ) : (
        <InfoItem movie={currentMovie} />
      )}
    </div>
  );
}
