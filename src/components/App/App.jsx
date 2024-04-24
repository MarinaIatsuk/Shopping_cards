import { useEffect } from 'react'
import { useDispatch,useSelector } from "react-redux";
import { getCardServer } from '../../store/slice/cardReducer';
import './App.css'
import Cards from '../Cards/Cards';

function App() {



  return (
    <>
     <Cards/>
    </>
  )
}

export default App
