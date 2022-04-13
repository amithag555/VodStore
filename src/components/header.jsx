import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [userInput, setUserInput] = useState("");
  const navigation = useNavigate();

  return (
    <header className="row m-0 align-items-center justify-content-around shadow">
      <div className="title_div col-lg-5 text-center text-lg-start row align-items-center m-0 p-0">
        <a href="/">
          <h1 className="main_title m-0">VOD STORE</h1>
        </a>
      </div>

      <div className="search_div col-lg-4 row mt-2 m-md-0 p-1 align-items-center">
        <div className="col-10 p-0">
          <input
            onInput={(event) => {
              setUserInput(event.target.value);
            }}
            type="search"
            className="search_div border-0 w-100 p-2 text-white"
            placeholder="Search"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                navigation(`/search/${userInput}`);
              }
            }}
          />
        </div>

        <div className="col-2 p-0 fs-4 text-end ps-2 pe-3 pb-1">
          <Link to={`/search/${userInput}`}>
            <BsSearch className="text-white"></BsSearch>
          </Link>
        </div>
      </div>
    </header>
  );
}
