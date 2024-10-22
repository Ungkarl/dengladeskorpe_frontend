import { useState } from "react";
import styles from "./DishesList.module.css";
import { Link } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import { IoMdAdd } from "react-icons/io";

const DishesList = () => {
    const { dishes } = useFetch();
    const [searchTerm, setSearchTerm] = useState("");

//FILTER TO DO
const filteredDishes = (dishes || []).filter(dish =>
  dish?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  dish?.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  dish?.ingredients?.join(" ").toLowerCase().includes(searchTerm.toLowerCase())
);


return (
  <div className={styles.dish_container}>
    <h1>DISHES ADMIN</h1>
    <div className={styles.search_dish_bar}>
      <input
        type="text"
        placeholder="Search Dishes"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/*ADD BUTTON*/}
      <Link to="/backoffice/dishes/add" className={styles.dish_add_button}>
        <IoMdAdd />
      </Link>
    </div>

    <div className={styles.dish_list}>
      {filteredDishes.map((dish) => (
        <div key={dish._id} className={styles.dish_card}>
          <div className={styles.dish_image}>
            <img src={dish.image} alt={dish.title} />
          </div>
          <div className={styles.dish_name}>{dish.title}</div>
          <div className={styles.dish_description}>
            {dish.ingredients.map((ingredient, index) => (
              <div key={index}>{ingredient}</div>
            ))}
          </div>
          <div className={styles.dish_category}>{dish.category}</div>
          <div className={styles.dish_price_normal}>
            {dish.price.normal} kr.
          </div>
          <div className={styles.dish_price_large}>{dish.price.family} kr.</div>

          <div className={styles.dish_actions}>
            <Link
              className={styles.edit_link}
              to={`/backoffice/dishes/edit/${dish._id}`}
            >
              Edit
            </Link>
            <Link
              className={styles.delete_link}
              to={`/backoffice/dishes/delete/${dish._id}`}
            >
              Delete
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}


export default DishesList;