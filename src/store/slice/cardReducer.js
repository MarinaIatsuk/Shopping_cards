import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCardServer = createAsyncThunk("getCardServer", async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products/");
    if (!response.ok) {
      throw new Error("Server error");
    }
    const data = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const cardSlice = createSlice({
  name: "cards",
  initialState: {
    cards: [],
    id: null,
    title: null,
    price: null,
    image: null
  },
  reducers: {
    donloadCards(state, action) {
      state.cards = action.payload.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image
      }));
    },
    removeCard(state, action) {
      state.cards = state.cards.filter(card => card.id !== action.payload); //action.payload здесь это конкретный id карточки. при вызове removeCard передаю в него id карточки для удаления, этот id становится значением action.payload
      localStorage.setItem("cards", JSON.stringify(state.cards));
    },
  },

  
  extraReducers(builder) {
    builder
      .addCase(getCardServer.fulfilled, (state, action) => { //регистрируем donloadCards как обработчик для getCardServer: 
        state.cards = action.payload;
        localStorage.setItem("cards", JSON.stringify(action.payload));
      })
      .addCase(getCardServer.rejected, (state, action) => {
        // Обработка ошибок, если нужно
      });
  },
});


export const { donloadCards, removeCard } = cardSlice.actions;
export default cardSlice.reducer;
