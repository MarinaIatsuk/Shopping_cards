import { useEffect } from 'react'
import { useDispatch,useSelector } from "react-redux";
import { getCardServer, donloadCards, removeCard } from '../../store/slice/cardReducer';
import style from './Cards.module.scss'

export default function Card() {
    const dispatch = useDispatch();

    useEffect(() => {
      // Если данных в локальном хранилище нет, делаем запрос к API
    if (!localStorage.getItem("cards")) {
      dispatch(getCardServer());
    } else {
      // Если данные уже есть в хранилище, загружаем их в Redux state
      const storedCards = JSON.parse(localStorage.getItem("cards"));
      dispatch(donloadCards(storedCards));
    };
    }, []);
  
    const cards = useSelector(state => state.cards.cards);
    //cards.map(card=>(console.log(card.id)))

function deleteCard(id) {
  dispatch(removeCard(id));
}
  return (
    <div className={style.wrapper}>
    {cards.map(card => (
        <div className={style.card}key={card.id}>
          <div className={style.card__delete} onClick={() => deleteCard(card.id)}>x</div>
          <img src={card.image} alt={card.title} className={style.card__image}/>
          <h3 className={style.card__title}>{card.title}</h3>
          <p className={style.card__price}>Цена: {card.price}</p>
          <div className={style.card__like}>like</div>
        </div>
    ))}
</div>
  )
}
