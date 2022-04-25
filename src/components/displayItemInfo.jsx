import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoItem from "./infoItem.jsx";
import { getMovieById } from "../services/movieService";

export default function DisplayItemInfo() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentMovie, setCurrentMovie] = useState({});

  let params = useParams();

  useEffect(() => {
    getSingleMovie(params.id);
    window.scrollTo(0, 0);
  }, [params.id]);

  const getSingleMovie = async (_movieId) => {
    setIsLoading(true);
    let tempMovie = {};

    const responseRes = await getMovieById(_movieId);
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
