import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { useEffect, useState } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";

function App() {
  const URL = "https://norma.nomoreparties.space/api/ingredients";

  const [data, setData] = useState([]);
  const [statusData, setStatusData] = useState(undefined);

  const [modalData, setModalData] = useState({ active: true });

  const handleSetModalData = (newModalData) => {
    setModalData(newModalData);
    // console.log(newModalData);
  };

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          setStatusData(json.success);
          setData(json.data);
        } else setStatusData(false);
      })
      .catch((error) => {
        setStatusData(false);
        console.log(`Ошибка при загрузке данных с сервера ${error}`);
      });
  }, []);

  return (
    <div className={`${styles.page}`}>
      <AppHeader />
      <main className={styles.content}>
        {statusData === undefined ? (
          <p className={"text_type_main-medium"}>Загрузка данных...</p>
        ) : statusData ? (
          <>
            <BurgerIngredients
              data={data}
              handleSetActiveModal={handleSetModalData}
            />
            <BurgerConstructor
              data={data}
              handleSetModalData={handleSetModalData}
            />
            {/*<ModalOverlay {...modalData} setModalData={setModalData}>*/}
            {/*  <div>d</div>*/}
            {/*</ModalOverlay>*/}
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
