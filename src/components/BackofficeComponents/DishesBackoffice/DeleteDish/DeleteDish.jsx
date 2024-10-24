import { useParams, Link, useOutletContext, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import styles from "./DeleteDish.module.css";
import { useFetch } from "../../../../hooks/useFetch";
import FullscreenLoader from "../../../FullscreenLoader/FullscreenLoader";


const DeleteDish = () => {
    const { dishes } = useFetch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [dish, setDish] = useState(null);
    const [loading, setLoading] = useState(false); 
    const { deleteDish } = useOutletContext();

    useEffect(() => {
        const fetchDish = async () => {
            // Simulated waiting time of 2 seconds
            await new Promise((resolve) => setTimeout(resolve, 2000));
            //Finds the dish with the id
            const dish = dishes.find(dish => dish._id === id);
            // Sets the dish
            setDish(dish);
        }
        fetchDish();

    }, [dishes, id]);


    const handleDelete = async () => {
        setLoading(true); // Start loading

        // Simuleret ventetid på 2 sekunder
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Kald deleteDish fra useOutletContext
        await deleteDish(id);
        navigate('/backoffice/dishes');

        setLoading(false); // Stop loading
    }

    //Loading screens
    if (loading) {
        return <FullscreenLoader />;
    }

    if (!dish) {
        return <FullscreenLoader />;
    }


    return (
        <div className={styles.deleteDishContainer}>
            <div className={styles.dish}>
                <Link to="/backoffice/dishes" className={styles.dishBackButton}><IoIosArrowRoundBack /></Link>
                <div className={styles.dishImgContainer}>
                    <img className={styles.dishImg} src={`${dish.image}`} alt="Dish" />
                </div>
                <div className={styles.employeeInfo}>
                    <h2>{dish.title}</h2>
                    {dish.ingredients.map((ingredient, index) => (
                         <p key={index}>{ingredient}</p>
                        ))}
                   
                    
                    
                </div>
                <button className={styles.deleteConfirmBtn} onClick={handleDelete}>CONFIRM DELETION</button> 
            </div>
        </div>
    );



};


export default DeleteDish;