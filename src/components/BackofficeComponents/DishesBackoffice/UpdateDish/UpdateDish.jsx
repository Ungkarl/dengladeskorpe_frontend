import { useParams, useOutletContext, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import styles from "./UpdateDish.module.css";
import { useForm } from "react-hook-form";
import { useFetch } from "../../../../hooks/useFetch";
import FullscreenLoader from "../../../FullscreenLoader/FullscreenLoader";




const UpdateDish = () => {
    const { dishes } = useFetch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [dish, setDish] = useState(null);
    const [loading, setLoading] = useState(false);
    const { updateDish } = useOutletContext();
    const [image, setImage] = useState('/vite.svg');
    const { register, handleSubmit, setValue } = useForm();


     //Function for changing the image
     const onImageChange = (e) => {
        let image = e.target.files[0];
        console.log(image);
        let objectUrl = window.URL.createObjectURL(e.target.files[0]);
        setImage(objectUrl);
        setValue("file", image);
       
    };

    const onSubmit = async (data) => {
        console.log(data);
        if (!data.file || data.file.length === 0) {
            console.log(data)
            return;
        }
        setLoading(true);

        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2000));
      
        let formData = new FormData();
        formData.append('file', data.file);
        formData.append("title", data.title);
        formData.append("price", JSON.stringify({
            normal: data.priceNormal,
            family: data.priceFamily
        }));
        const ingredientsArray = data.ingredients.split(',').map(ingredient => ingredient.trim());
        formData.append('ingredients', ingredientsArray);
        formData.append('category', data.category);
        formData.append('id', id);

       
        const updateDishResult = updateDish(formData);

        await Promise.all([minLoadingTime, updateDishResult]);

        setLoading(false);
        navigate('/backoffice/dishes');
    };


    useEffect(() => {
        const fetchDish = async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const dish = dishes.find(dish => dish._id === id);
            console.log(dish)
            setDish(dish);
            setImage(`${dish.image}`);
            
        }
        fetchDish();
    }, [dishes, id]);
    

    if (loading) { 
        return <FullscreenLoader />;
    }

    if (!dish) {
     return <FullscreenLoader />;
    }

    return (
        <div className={styles.updateDishContainer}>
            <form
                className={styles.formContainer}
                onSubmit={handleSubmit(onSubmit)}
            >
                 <Link to="/backoffice/dishes" className={styles.backButton}>
                    <IoIosArrowRoundBack />
                </Link>
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
               
               
                    <label htmlFor="priceFamily" className={styles.upd_label}>Price family
                    <input
                    className={styles.upd_input}
                        type="number"
                        name="priceFamily"
                        defaultValue={dish.price.family}
                        {...register("priceFamily")}
                    />
                    </label>
               
            
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
                    <input
                    className={styles.upd_input}
                        type="text"
                        name="category"
                        defaultValue={dish.category}
                        {...register("category")}
                    />
                    </label>
             
                <button
                    type="submit"
                    className={styles.updateConfirmBtn}
                >
                    Update Dish
                </button>
            </form>
        </div>
    );
    

    



};


export default UpdateDish;


