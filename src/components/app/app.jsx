import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import {useEffect, useReducer } from "react";
import { getIngredients} from "../../services/actions/actions";
import {useDispatch, useSelector} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {

  const dispatch = useDispatch();
  const {selectedIngredients, statusAvailableIngredients} = useSelector(state => state.ingredients);
 const [, dispatchSumIngredients] = useReducer(reducerBurgerSum, {price: 0}, undefined);

  function reducerBurgerSum(state, action) {
    if (action.type === 'price') {
      const price = selectedIngredients.bun.reduce((sum, element) => sum + element.price * 2, 0) +
        selectedIngredients.fillings.reduce((sum, element) => sum + element.price, 0);
      return {price: price}
    }
    return state;
  }

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatchSumIngredients({type: "price"})
  }, [selectedIngredients])

  function DownloadStatus() {
    switch (statusAvailableIngredients) {
      case undefined:
        return (<p className={"text_type_main-medium"}>Загрузка данных...</p>);
      case false:
        return (<p>Произошла ошибка при загрузке данных с сервера, попробуйте обновить страницу</p>);
      default:
        return undefined;
    }
  }

  return (
    <div className={`${styles.page}`}>
      <AppHeader/>
      <DownloadStatus/>
      <main className={styles.content}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor/>
        </DndProvider>
      </main>
    </div>
  );
}
export default App;