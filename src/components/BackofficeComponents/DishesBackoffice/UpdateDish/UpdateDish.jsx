import { useParams, useOutletContext, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import styles from "./UpdateDish.module.css";
import { useForm } from "react-hook-form";
import { useFetch } from "../../../../hooks/useFetch";
import FullscreenLoader from "../../../FullscreenLoader/FullscreenLoader";




const UpdateDish = () => {
    const { dishes, categories } = useFetch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [dish, setDish] = useState(null);
    const [loading, setLoading] = useState(false);
    const { updateDish } = useOutletContext();
    const [image, setImage] = useState('/vite.svg');
    const { register, handleSubmit, setValue } = useForm();
    const [chosenCategory, setChosenCategory] = useState(null);


    

     //Function for changing the image
     const onImageChange = (e) => {
        let image = e.target.files[0];
        let objectUrl = window.URL.createObjectURL(e.target.files[0]);
        setImage(objectUrl);
        setValue("file", image);
       
    };
    
    //Submit function using formData.
    const onSubmit = async (data) => {
        setLoading(true);

        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2000));
      
        let formData = new FormData();
        formData.append('file', data.file);
        formData.append("title", data.title);
        const price = {
            normal: data.priceNormal,
            family: chosenCategory === "Pizzaer" ? data.priceFamily : null
        };
        formData.append("price", JSON.stringify(price));
        const ingredientsArray = data.ingredients.split(',').map(ingredient => ingredient.trim());
        formData.append('ingredients', ingredientsArray);
        formData.append('category', chosenCategory);
        formData.append('id', id);

       
        const updateDishResult = updateDish(formData);
        //Wiating for both promises to resolve
        await Promise.all([minLoadingTime, updateDishResult]);

        setLoading(false);
        navigate('/backoffice/dishes');
    };

    //Fetching the dish if dishes and id is available
    useEffect(() => {
        const fetchDish = async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const dish = dishes.find(dish => dish._id === id);
            console.log(dish)
            setDish(dish);
            setChosenCategory(dish.category);
            setImage(`${dish.image}`);
            
        }
        fetchDish();
    }, [dishes, id]);
    
    //Loading screens
    if (loading) { 
        return <FullscreenLoader />;
    }

    if (!dish) {
     return <FullscreenLoader />;
    }

    return (
        <div className={styles.updateDishContainer}>
            <div className={styles.outerFormContainer}>
            <Link to="/backoffice/dishes" className={styles.backButton}>
                    <IoIosArrowRoundBack />
                </Link>
            <form
                className={styles.formContainer}
                onSubmit={handleSubmit(onSubmit)}
            >
                 
                <label className={`${styles.upd_label} ${styles.imgLabel}`}>
                    Upload Billede
                    <img className={styles.dishImg} src={image} alt="Dish Preview" />
                    <input
              type="file"
              {...register("file")}
              onChange={onImageChange}
              className={`${styles.add_input} ${styles.imgInputHidden}`}
            />

                </label>
               
                    <label htmlFor="title" className={styles.upd_label}>Title
                    <input
                    className={styles.upd_input}
                        type="text"
                        name="title"
                        defaultValue={dish.title}
                        {...register("title")}
                    />
                    </label>
             
               
                    <label htmlFor="priceNormal" className={styles.upd_label}>Price normal
                    <input
                    className={styles.upd_input}
                        type="number"
                        name="priceNormal"
                        defaultValue={dish.price.normal}
                        {...register("priceNormal")}
                    />
                    </label>
               
               
                    {chosenCategory === "Pizzaer" && (
  <label className={styles.upd_label}>
    Family Price
    <input
      type="number"
      {...register("priceFamily")}
      placeholder="Familie pris"
      className={styles.upd_input}
      required={chosenCategory === "Pizzaer"}
      defaultValue={dish.price.family}
    />
  </label>
)}
               
            
                    <label htmlFor="ingredients" className={styles.upd_label}>Ingredients
                    <input
                    className={styles.upd_input}
                        type="text"
                        name="ingredients"
                        defaultValue={dish.ingredients.join(', ')}
                        {...register("ingredients")}
                    />
                    </label>
           
                    <label htmlFor="category" className={styles.upd_label}>Category
                    <select {...register("category")} className={styles.add_input} onChange={(e) => setChosenCategory(e.target.value)}>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
                    </label>
             
                <button
                    type="submit"
                    className={styles.updateConfirmBtn}
                >
                    Update Dish
                </button>
            </form>

            </div>
            
        </div>
    );
    

    



};


export default UpdateDish;


