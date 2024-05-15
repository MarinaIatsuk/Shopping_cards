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
    downloadCards(state, action) {
      state.cards = action.payload.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
      }));
    },

    removeCard(state, action) {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
      localStorage.setItem("cards", JSON.stringify(state.cards));
    },

    likeCard(state, action) {
      state.likedCards.push(action.payload);
      localStorage.setItem("likedCard", JSON.stringify(state.likedCards));
    },

    unlikeCard(state, action) {
      state.likedCards = state.likedCards.filter(
        (cardId) => cardId !== action.payload
      );
      localStorage.setItem("likedCard", JSON.stringify(state.likedCards));
    },

    filterCards(state) {
      state.cards = state.cards.filter((card) =>
        state.likedCards.includes(card.id)
      );
    },
  },

  extraReducers(builder) {
    builder.addCase(getCardServer.fulfilled, (state, action) => {
      localStorage.setItem("cards", JSON.stringify(action.payload));
      state.cards = action.payload.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
      }));
    });
  },
});

export const { downloadCards, removeCard, likeCard, unlikeCard, filterCards } =
  cardSlice.actions;
export default cardSlice.reducer;
