import React from "react";
import { Link } from "react-router-dom";

export default function YearNav(props) {
  return (
    <nav className="year_nav row py-3 px-3 justify-content-center align-items-center">
      <h3 className="text-center m-0 py-2 text-white col-md-4 col-xxl-2">Top Years</h3>

      {props.yearArr.map((item) => {
        return (
          <Link
            key={item}
            to={`/year/${item}/search/${props.searchQParam}`}
            className="link col-md-1 my-2 mx-2 text-center rounded"
          >
            {item}
          </Link>
        );
      })}
    </nav>
  );
}
