import { configureStore } from "@reduxjs/toolkit";
import cardReduser from "./slice/cardReducer";

export const store = configureStore({
reducer:{
    cards:cardReduser
}
})