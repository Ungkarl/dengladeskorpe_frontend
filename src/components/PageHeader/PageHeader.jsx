import { useState, useEffect } from "react";
import styles from "./PageHeader.module.css";
import { useLocation, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

const PageHeader = () => {
    const { dishes } = useFetch();
    //State for banner title
    const [bannerBottomTitle, setBannerBottomTitle] = useState("SKORPE");
    //Get id from url if its there
    const { id } = useParams();

    //Check if location is /dish/:id
    const location = useLocation();
    useEffect(() => {
        if (dishes && dishes.length > 0 && location.pathname === `/dish/${id}`) {
            const dish = dishes.find(dish => dish._id === id);
            if (dish) {
                setBannerBottomTitle(dish.title);
            }
        }
    }, [dishes, id, location.pathname]);


    



    return (
        <div className={styles.pageHeader}>
            <img src="/assets/images/headerImg.png" alt="" />
            <div className={styles.banner}>
                <h2>DEN</h2>
                <h2>GLADE</h2>
                <h2>{bannerBottomTitle}</h2>
            </div>
            <div className={styles.overlay}>
                
            </div>
        </div>
    )


   

};


export default PageHeader;