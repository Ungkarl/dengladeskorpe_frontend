import styles from "./AddDish.module.css";
import {Link, useOutletContext, useNavigate} from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FullscreenLoader from "../../../FullscreenLoader/FullscreenLoader";


const AddDish = () => {
    const navigate = useNavigate();
    const { addDish } = useOutletContext();
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState('/vite.svg');


    const onImageChange = (e) => {
        let objectUrl = window.URL.createObjectURL(e.target.files[0]);
        setImage(objectUrl);
    }


    const onSubmit = async (data) => {
        console.log(data);
        if (!data.file || data.file.length === 0) {
            console.log(data)
            return;
        }
        setLoading(true);
    
        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2000));
    
        let formData = new FormData();
        formData.append('file', data.file[0]);
        formData.append('title', data.title);
    
        // Prices: sending as a JSON string since FormData does not handle objects directly
        formData.append('price', JSON.stringify({
            normal: data.priceNormal,
            family: data.priceFamily
        }));
    
        // Ingredients: converting array to a JSON string
        const ingredientsArray = data.ingredients.split(',').map(ingredient => ingredient.trim());
        formData.append('ingredients', ingredientsArray);
    
        formData.append('category', data.category);
    
        const addDishResult = await addDish(formData);
        await Promise.all([addDishResult, minLoadingTime]);
    
        setLoading(false);
        navigate("/backoffice/dishes");
    };

    if (loading) {
        return <FullscreenLoader />;
    }

    return (
        <div className={styles.addEmployeeContainer}>
          <form
            className={styles.formContainer}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Link to="/backoffice/employees" className={styles.backButton}>
              <IoIosArrowRoundBack />
            </Link>
            
            <label className={`${styles.add_label} ${styles.imgLabel}`}>
              Upload Billede
              <img
                className={styles.employee_img}
                src={image}
                alt="Dish Preview"
              />
              <input
                type="file"
                {...register("file")}
                onChange={onImageChange}
                className={`${styles.add_input} ${styles.ImgInputHidden}`}
              />
            </label>
      
            <label className={styles.add_label}>
              Title
              <input
                type="text"
                {...register("title")}
                placeholder="Indtast titel"
                className={styles.add_input}
              />
            </label>
      
            <label className={styles.add_label}>
              Normal Price
              <input
                type="number"
                {...register("priceNormal")}
                placeholder="Normal pris"
                className={styles.add_input}
              />
            </label>
      
            <label className={styles.add_label}>
              Family Price
              <input
                type="number"
                {...register("priceFamily")}
                placeholder="Familie pris"
                className={styles.add_input}
              />
            </label>
      
            <label className={styles.add_label}>
              Ingredients (separate with commas)
              <input
                type="text"
                {...register("ingredients")}
                placeholder="Indtast ingredienser"
                className={styles.add_input}
              />
            </label>
      
            <label className={styles.add_label}>
              Category
              <input
                type="text"
                {...register("category")}
                placeholder="Indtast kategori"
                className={styles.add_input}
              />
            </label>
      
            <label className={styles.add_label}>
              Description
              <input
                type="text"
                {...register("description")}
                placeholder="Indtast beskrivelse"
                className={styles.add_input}
              />
            </label>
      
            <button className={styles.button} type="submit">
              OPRET RET
            </button>
          </form>
        </div>
      );

}





export default AddDish;