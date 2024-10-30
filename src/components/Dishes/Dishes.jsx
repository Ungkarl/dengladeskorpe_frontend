import styles from "./Dishes.module.css";
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Dishes = () => {
  const { dishes, categories } = useFetch();
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  //Number of dishes per page
  const dishesPerPage = 6;
  const navigate = useNavigate(); 


  //Filter dishes based on the category chosen & search term
  const filteredDishes = dishes.filter((dish) => { 

    //Show dishes that match the category chosen. If no category is chosen, show all dishes.
    const matchesCategory = currentCategory === null || dish.category === currentCategory; 

    //Show dishes that match the search term. Title or ingredients.
    const matchesSearchTerm = 
      dish.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (Array.isArray(dish.ingredients) ? dish.ingredients.join(",").toLowerCase().includes(searchTerm.toLowerCase()) : false); //Show the dishes that match title or the ingredients, only if ingredients is an array
      
    return matchesCategory && matchesSearchTerm; //Returning the dishes that match
  }).sort(() => Math.random() - 0.5); // Randomize the order of the dishes, to make it more interesting
  
  
 
  const totalPages = Math.ceil(filteredDishes.length / dishesPerPage); //Calculate the number of pages based on dishes. Ceil rounds up.

 //Calculate the startindex for the currentpage the user is on. 
 //User is on page 1, currentPage will be 1. Since Arrays is 0-based, i minus 1, and multiply with dishesPerPage to get the startindex.
 //Page 2, currentPage will be 2. 2-1 = 1. 1*6 = 6. Startindex will be 6.
  const startIndex = (currentPage - 1) * dishesPerPage;

  //startindex + dishesperpage will be the endindex.
  const currentDishes = filteredDishes.slice(startIndex, startIndex + dishesPerPage);

  //When search term changes, update the searchTerm and set the currentPage to 1
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };


  //Function to handle the category click
  const handleCategoryClick = (category) => {
    if (currentCategory === category.name) {
      setCurrentCategory(null);
      setCurrentPage(1);
    } else {
      setCurrentCategory(category.name);
      setCurrentPage(1);
    }
  };

   // Function to handle the dish click
   const handleDishClick = (dishId) => {
    navigate(`/dish/${dishId}`);
  };

  // Function to go to the next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page
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
  className={`${styles.category} ${currentCategory === category.name ? styles.activeCategory : ""}`}
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
      
        {currentDishes.map((dish) => ( // Using the currentDishes array to map through
          <div key={dish._id} className={styles.dish}   onClick={() => handleDishClick(dish._id)}>
            <h3>{dish.title}</h3>
            <div className={styles.image_container}> <img src={dish.image} alt={dish.name} /></div>
          
          </div>
        ))}
      </div>

      {/* Pagination */}
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
