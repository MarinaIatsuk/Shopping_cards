import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCardServer = createAsyncThunk("getCardServer", async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products/");
    if (!response.ok) {
      throw new Error("Server error");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Ошибка загрузки с сервера:${error}`);
  }
});

const cardSlice = createSlice({
  name: "cards",
  initialState: {
    cards: [],
    likedCards: [],
    id: null,
    title: null,
    price: null,
    image: null,
  },
  reducers: {
    //редьюсер для загрузки карточек из АПИ
    downloadCards(state, action) {
      state.cards = action.payload.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
      }));
    },

    //редьюсер для удаления карточки из локального хранилища. Все карточки=все карточки, кроме выбранной по id карточки //прим для меня: action.payload здесь это конкретный id карточки. при вызове removeCard передаю в него id карточки для удаления, этот id становится значением action.payload
    removeCard(state, action) {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
      localStorage.setItem("cards", JSON.stringify(state.cards));
    },

    //редьюсер для добавления айди выбранной карточки в новый массив под имененем likedCard. Далее его добавляем в локальное хранилище
    likeCard(state, action) {
      state.likedCards.push(action.payload);
      localStorage.setItem("likedCard", JSON.stringify(state.likedCards));
    },

    //редьюсер для удаления айди карточки из массива likedCard. Логика: данные (айди) в массиве likedCards= всем айди, которые в нем уже есть, кроме выбранного айди. Устанавливае итоговый массив без этого айди в локальное хранилище (обновляем)
    unlikeCard(state, action) {
      state.likedCards = state.likedCards.filter(
        (cardId) => cardId !== action.payload
      );
      localStorage.setItem("likedCard", JSON.stringify(state.likedCards));
    },

    //редьюсер для фильтрации. Логика: данные по всем карточкам = данным по карточкам, чьи айди находятся в массиве likedCards
    filterCards(state) {
      state.cards = state.cards.filter((card) =>
        state.likedCards.includes(card.id)
      );
    },
  },

  extraReducers(builder) {
    builder
      //регистрируем downloadCards как обработчик для getCardServer и записываем пришедшие данные в локальное хранилище под именем cards:
      .addCase(getCardServer.fulfilled, (state, action) => {
        //сохраняем данные в хранилище
        localStorage.setItem("cards", JSON.stringify(action.payload));
        // Обновляем состояние Redux для моментальной отрисовки компонента
      state.cards = action.payload.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
      }));
      })
  },
});


export const { downloadCards, removeCard, likeCard, unlikeCard, filterCards } =
  cardSlice.actions;
export default cardSlice.reducer;
