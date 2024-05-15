import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCardServer,
  downloadCards,
  removeCard,
  likeCard,
  unlikeCard,
} from "../../store/slice/cardReducer";
import style from "./Cards.module.scss";
import iconFullfield from "../../assets/images/icons/icon-heart-fullfield.png";
import iconEmpty from "../../assets/images/icons/icon-heart-empty.png";

export default function Card() {
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cards")) {
      dispatch(getCardServer());
    } else {
      const storedCards = JSON.parse(localStorage.getItem("cards"));
      dispatch(downloadCards(storedCards));
    }
  }, []);

  const cards = useSelector((state) => state.cards.cards);

  function deleteCard(id) {
    dispatch(removeCard(id));
  }

  const likedCards = useSelector((state) => state.cards.likedCards);

  function clickLikeCard(id) {
    if (likedCards.includes(id)) {
      dispatch(unlikeCard(id));
    } else {
      dispatch(likeCard(id));
    }
    setLike(!like);
  }

  return (
    <div className={style.wrapper}>
      {cards.map((card) => (
        <div className={style.card} key={card.id}>
          <div
            className={style.card__delete}
            onClick={() => deleteCard(card.id)}
          >
            x
          </div>
          <img
            src={card.image}
            alt={card.title}
            className={style.card__image}
          />
          <h3 className={style.card__title}>{card.title}</h3>
          <p className={style.card__price}>Цена: {card.price}</p>
          {likedCards.includes(card.id) ? (
            <img
              src={iconFullfield}
              alt=""
              onClick={() => clickLikeCard(card.id)}
              className={style.card__like}
            />
          ) : (
            <img
              src={iconEmpty}
              alt=""
              onClick={() => clickLikeCard(card.id)}
              className={style.card__like}
            />
          )}
        </div>
      ))}
    </div>
  );
}
