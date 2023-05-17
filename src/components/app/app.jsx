import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { useEffect, useState } from "react";

function App() {
  const URL = "https://norma.nomoreparties.space/api/ingredients";
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [statusData, setStatusData] = useState(undefined);

  useEffect(() => {
    fetch(URL)
      .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка ${response.status}`);
      }
      })
      .then((json) => {
        if (json.success) {
          setStatusData(json.success);
          setAvailableIngredients(json.data);
        } else setStatusData(false);
      })
      .catch((error) => {
        setStatusData(false);
        console.log(`Ошибка при загрузке данных с сервера ${error}`);
      });
  }, []);

  useEffect(()=> {
    if (availableIngredients.length) {
      setSelectedIngredients([
        availableIngredients[0],
        availableIngredients[3],
        availableIngredients[1],
        availableIngredients[10],
        availableIngredients[9],
        availableIngredients[2],
        availableIngredients[4],
        availableIngredients[3],
        availableIngredients[6]])
    }
    },[availableIngredients])

  return (
    <div className={`${styles.page}`}>
      <AppHeader />
      <main className={styles.content}>
        {statusData === undefined ? (
          <p className={"text_type_main-medium"}>Загрузка данных...</p>
        ) : statusData ? (
          <>
            <BurgerIngredients
              availableIngredients={availableIngredients}
              selectedIngredients={selectedIngredients}
            />
            <BurgerConstructor
              selectedIngredients={selectedIngredients}
            />
          </>
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
