import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import {useEffect, useReducer, useState} from "react";
import {SelectedIngredientsContext} from "../../services/appContext";
import {sendRequest, checkResponse} from "../../utils/api";

function App() {

  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [statusData, setStatusData] = useState(undefined);

  const selectedIngredientsState= useReducer(reducerSelectedIngredients, {bun: [], fillings: []}, undefined);
  const [selectedIngredients, setSelectedIngredients] = selectedIngredientsState;

  const [sumIngredients, dispatchSumIngredients] = useReducer(reducerBurgerSum, {price: 0}, undefined);

  function reducerBurgerSum (state, action) {
    switch (action.type) {
      case 'price':
        const price = selectedIngredients.bun.reduce((sum, element) => sum + element.price * 2, 0) +
          selectedIngredients.fillings.reduce((sum, element) => sum + element.price, 0);
        return {price: price}
      default: return state;
    }
  }
  function reducerSelectedIngredients(state, action) {
    switch (action.type) {
      case "addIngredient":
        return action.ingredient.type === 'bun'
          ? {bun: [action.ingredient], fillings: [...state.fillings]}
          : {...state, fillings: [...state.fillings, action.ingredient]};
      default: return state;
    }
  }

 const handleSetData = dataIngredients => {
    setStatusData(dataIngredients.status);
    if (dataIngredients.status) {
      setAvailableIngredients(dataIngredients.data);
    }
  }

  useEffect(() => {
    sendRequest('ingredients')
      .then(checkResponse)
      .then(json => {
        const dataIngredients = json.success ? {status: json.success, data: json.data} : {status: false};
        handleSetData(dataIngredients);
      })
      .catch(error => {
        console.log(`Ошибка при загрузке данных с сервера ${error}`);
        handleSetData({status: false})
      });

  }, []);

  useEffect(()=>{
    if (!selectedIngredients.bun.length && !selectedIngredients.fillings.length) {
    availableIngredients.forEach(element => {
      setSelectedIngredients({type: "addIngredient", ingredient: element});
     })}
  }, [availableIngredients])

  useEffect(() => {
    dispatchSumIngredients({type: "price"})
  }, [selectedIngredients])

  return (
    <div className={`${styles.page}`}>
      <AppHeader />
      <main className={styles.content}>
        {statusData === undefined ? (
          <p className={"text_type_main-medium"}>Загрузка данных...</p>
        ) : statusData ? (
          <SelectedIngredientsContext.Provider value={{selectedIngredientsState, sumIngredients}}>
            <BurgerIngredients
              availableIngredients={availableIngredients}
            />
            <BurgerConstructor />
           </SelectedIngredientsContext.Provider>
        ) : (
          <p>
            Произошла ошибка при загрузке данных с сервера, попробуйте обновить
            страницу
          </p>
        )}
      </main>
    </div>
  );
}

export default App;
