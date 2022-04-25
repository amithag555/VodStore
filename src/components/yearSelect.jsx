import React from "react";
import { useNavigate } from "react-router-dom";

export default function YearSelect(props) {
  const navigation = useNavigate();

  const onClickYearSelect = (event) => {
    navigation(`/year/${event.target.value}/search/${props.searchQParam}`);
  };

  return (
    <select className="year_select form-select text-center mb-2 border-0" onChange={onClickYearSelect}>
      <option>Top Years</option>
      {props.yearArr.map((item) => {
        return (
          <option key={item} value={item}>
            {item}
          </option>
        );
      })}
    </select>
  );
}
