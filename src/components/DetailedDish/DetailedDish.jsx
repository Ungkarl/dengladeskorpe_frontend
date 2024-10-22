import styles  from "./DetailedDish.module.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useBasket } from "../../hooks/useBasket";
import FullscreenLoader from "../FullscreenLoader/FullscreenLoader";


const DetailedDish = () => {
    const { addToBasket, basket, setBasket } = useBasket();
    const { dishes } = useFetch();
    const { id } = useParams();
    const [dish, setDish] = useState(null);
    const [selectedSize, setSelectedSize] = useState('normal');
    const [extraIngredients, setExtraIngredients] = useState([]);



    useEffect(() => {
        const fetchDish = async () => {
            //Simuleret ventetid på 2 sekunder
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const dish = dishes.find(dish => dish._id === id);
            setDish(dish)
        };
        fetchDish();
    }, [dishes, id]);

    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value); // Dynamisk værdi ændres
    };

    const toggleExtraIngredient = (ingredient) => {
      if (extraIngredients.includes(ingredient)) {
          setExtraIngredients(extraIngredients.filter(i => i !== ingredient));
      } else {
          setExtraIngredients([...extraIngredients, ingredient]);
      }
  };

  const handleAddToBasket = () => {
    const existingItemIndex = basket.findIndex(item => 
        item.dish === dish._id && 
        item.size === selectedSize && 
        JSON.stringify(item.extraIngredients) === JSON.stringify(extraIngredients)
    );

    if (existingItemIndex > -1) {
        // Hvis retten allerede findes, opdater antallet
        const updatedBasket = [...basket];
        updatedBasket[existingItemIndex].quantity += 1; // Øg antallet med 1
        setBasket(updatedBasket); // Opdater kurven
    } else {
        // Hvis retten ikke findes, tilføj den til kurven
        addToBasket({
            dish: dish._id,
            dishTitle: dish.title,
            dishImage: dish.image,
            size: selectedSize,
            extraIngredients: extraIngredients,
            price: selectedSize === 'normal' ? dish.price.normal : dish.price.family,
            quantity: 1
        });
    }
};





    return (
      <div className={styles.dish_container}>
        {dish ? (
          <div className={styles.dish}>
            <div className={styles.dish_image}><img src={dish.image} alt={dish.name} /></div>
           

            <div className={styles.dish_info}>
              <h2 className={styles.dish_info_title}>{dish.title}</h2>
              <ul>
    {/* Vis eksisterende ingredienser */}
    {dish.ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
    ))}
    {/* Vis ekstra ingredienser, hvis der er nogen valgt */}
    Ekstra:
    {extraIngredients.map((ingredient, index) => (
        <li key={`extra-${index}`} className={styles.extra_ingredient}>
            {ingredient}
        </li>
    ))}
</ul>

              {/* ADD EXTRA INGREDIENT BUTTONS */}
              <div className={styles.extra_ingredients}>
    <h3 className={styles.extra_ingredients_title}>Tilføj ekstra ingredienser</h3>
    <div className={styles.extra_ingredients_buttons}>
    {["Hvidløg", "Pepperoni", "Chili"].map((ingredient) => (
    <p
        key={ingredient}
        className={`${styles.extra_ingredient} ${extraIngredients.includes(ingredient) ? styles.selected : styles.not_selected}`}
        onClick={() => toggleExtraIngredient(ingredient)}
    >
        {ingredient}
    </p>
))}
    </div>
</div>
            
            </div>

            <div className={styles.dish_size}>
                <h3 className={styles.dish_size_title}>Vælg størrelse</h3>
                {/* dropdown */}
                <select value={selectedSize} onChange={handleSizeChange}>
                            <option value="normal">Lille - {dish.price.normal} DKK</option>
                            <option value="family">Familie - {dish.price.family} DKK</option>
                </select>
                <div className={styles.price}>
                    <h3>Pris</h3>
                    <p>{selectedSize === 'normal' ? dish.price.normal : dish.price.family} DKK</p>
                </div>
            </div>

        <div onClick={handleAddToBasket} className={styles.dish_add_to_basket}>Tilføj {dish.title} til kurv</div>   
            <Link className={styles.dish_back} to="/">Tilbage til forside</Link>
          </div>
        ) : (
          <FullscreenLoader />
        )}
      </div>
    );
};


export default DetailedDish;