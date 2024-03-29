import {clsx} from "clsx";
import styles from "../burger-constructor-ingredient/burger-constructor-ingredient.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {DELETE_SELECTED_INGREDIENT, SORT_SELECTED_INGREDIENTS} from "../../services/actions/burger-constructor";
import React, {useRef} from "react";
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import {ingredientPropType} from "../../utils/prop-types";
import PropTypes from "prop-types";

function BurgerConstructorIngredient ({element, index}) {
  const { name, price, image } = element;
  const dispatch = useDispatch();
  const ingredientRef = useRef(null)

  const [{ isDragging }, drag] = useDrag({
    type: 'sortIngredient',
    item: () => {
      return { element, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{ handlerId }, drop] = useDrop({
    accept: 'sortIngredient',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ingredientRef.current) {
        return undefined;
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return undefined;
      }
      const hoverBoundingRect = ingredientRef.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return undefined;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return undefined;
      }
      dispatch({
        type: SORT_SELECTED_INGREDIENTS,
        payload: {
          dragIndex,
          hoverIndex
        }
      });
      item.index = hoverIndex
    },
  })

  const opacity = isDragging ? 0 : 1;

  drag(drop(ingredientRef));

  return (
    <li className={clsx(styles.burgerFillingElement, "ml-4") } ref={ingredientRef} data-handler-id={handlerId} style={{opacity}}>
      <DragIcon type={"primary"} />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() =>
          dispatch({type: DELETE_SELECTED_INGREDIENT, payload: index})}
      />
    </li>
  );
}

BurgerConstructorIngredient.propTypes = {
  element: ingredientPropType.isRequired,
  index: PropTypes.number.isRequired
};

export default BurgerConstructorIngredient;