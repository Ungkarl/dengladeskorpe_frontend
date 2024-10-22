import styles from "./Dishes.module.css";
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dishes = () => {
  const { dishes, categories } = useFetch();
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const dishesPerPage = 6; // Antal retter pr. side
  const navigate = useNavigate(); 

  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory = currentCategory === null || dish.category === currentCategory;
    const matchesSearchTerm = 
      dish.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (Array.isArray(dish.ingredients) ? dish.ingredients.join(",").toLowerCase().includes(searchTerm.toLowerCase()) : false);
      
    return matchesCategory && matchesSearchTerm; // Vis kun retter der matcher både kategori og søgeord
  }).sort(() => Math.random() - 0.5); // Randomiserer rækkefølgen
  // Beregn det samlede antal sider
  const totalPages = Math.ceil(filteredDishes.length / dishesPerPage);

  // Beregn hvilke retter der skal vises på den aktuelle side
  const startIndex = (currentPage - 1) * dishesPerPage;
  const currentDishes = filteredDishes.slice(startIndex, startIndex + dishesPerPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset til side 1, når der skrives i søgefeltet
  };


  // Handler til at ændre den aktuelle kategori
  const handleCategoryClick = (category) => {
    if (currentCategory === category.name) {
      setCurrentCategory(null);
      setCurrentPage(1);
    } else {
      setCurrentCategory(category.name);
      setCurrentPage(1);
    }
  };

   // Funktion til at navigere til dish-detaljesiden
   const handleDishClick = (dishId) => {
    navigate(`/dish/${dishId}`);
  };

  // Funktion til at gå til næste side
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Funktion til at gå til forrige side
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.dishes_container}>
      <h2 className={styles.dishes_title}>Vælg kategori</h2>
      <h3 className={styles.dishes_subTitle}>Eller kig igennem alle vores lækre retter</h3>
      <div className={styles.categories}>
        {categories.map((category) => (
          <div
            key={category._id}
            className={styles.category}
            onClick={() => handleCategoryClick(category)}
          >
            <h3>{category.name}</h3>
            <img src={category.image} alt={category.name} />
          </div>
        ))}
      </div>
      <input 
      className={styles.dish_search}
  type="text" 
  placeholder="Søg efter retter eller ingredienser..." 
  value={searchTerm} 
  onChange={handleSearchChange} 
/>

      <div className={styles.dishes}>
      
        {currentDishes.map((dish) => ( // Brug currentDishes i stedet for filteredDishes
          <div key={dish._id} className={styles.dish}   onClick={() => handleDishClick(dish._id)}>
            <h3>{dish.title}</h3>
            <div className={styles.image_container}> <img src={dish.image} alt={dish.name} /></div>
          
          </div>
        ))}
      </div>

      {/* Paginering */}
      <div className={styles.pagination}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Forrige
        </button>
        <span>Side {currentPage} af {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Næste
        </button>
      </div>
    </div>
  );
};

export default Dishes;
