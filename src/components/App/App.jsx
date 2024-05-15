import style from "./App.module.scss";
import Cards from "../Cards/Cards";
import Filter from "../Filter/Filter";

function App() {
  return (
    <div className={style.wrapper}>
      <Filter />
      <Cards />
    </div>
  );
}
export default App;
