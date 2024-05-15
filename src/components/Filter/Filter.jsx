import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { downloadCards, filterCards } from "../../store/slice/cardReducer";
import style from "./Filter.module.scss";

export default function Filter() {
  const dispatch = useDispatch();
  const [favourite, setFavourite] = useState(false);

  useEffect(() => {
    if (favourite) {
      dispatch(filterCards());
    } else {
      const storedCards = JSON.parse(localStorage.getItem("cards"));
      dispatch(downloadCards(storedCards));
    }
  }, [favourite, dispatch]);

  function filter() {
    setFavourite(!favourite);
  }

  return (
    <button onClick={filter}>
      {favourite ? <p>Вернуться к общему списку</p> : <p>Показать избранное</p>}
    </button>
  );
}
