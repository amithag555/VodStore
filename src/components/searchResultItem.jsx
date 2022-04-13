import { BsFillInfoCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./searchResultItem.css";

export default function SearchResultItem(props) {
  const { item } = props;
  const navigation = useNavigate();

  return (
    <div className="item_div col-lg-3 py-3 m-0">
      <div
        className="img_div text-center m-0 p-0 mx-auto"
        onClick={() => {
          navigation(`/infoLayout/video/${item.imdbID}`);
        }}
      >
        <img src={item.Poster} className="w-100 h-100" alt={item.Title} />
      </div>

      <div
        className="card_title_div row m-0 p-0 row align-items-center mx-auto"
        onClick={() => {
          navigation(`/infoLayout/video/${item.imdbID}`);
        }}
      >
        <div className="col-9 col-xl-10 py-1 text-white">{item.Title}</div>
        <div className="col-3 col-xl-2 text-center text-info fs-3 px-2">
          <BsFillInfoCircleFill></BsFillInfoCircleFill>
        </div>
      </div>
    </div>
  );
}
