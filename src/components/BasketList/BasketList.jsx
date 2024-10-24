import { useBasket } from "../../hooks/useBasket";
import styles from "./BasketList.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FullscreenLoader from "../FullscreenLoader/FullscreenLoader";

const BasketList = () => {
    const { basket, basketTotal, placeOrder, setBasket } = useBasket();
    const [comment, setComment] = useState("");
    const [orderStatus, setOrderStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const onOrderPlace = async () => {
        setIsLoading(true); 
    
        const order = {
            dishes: basket.map(item => ({
                dish: item.dish,
                amount: item.quantity,
                size: item.size,
                extraIngredients: item.extraIngredients,
            })),
            comment: comment,
            totalPrice: basketTotal,
        };
    
        // Tjek om kurven er tom
        if (order.dishes.length === 0) {
            setIsLoading(false);
            return;
        }
    
        // Fake loading
        await new Promise((resolve) => setTimeout(resolve, 2500));
    
        const placeOrderResult = await placeOrder(order);
        setTimeout(() => {
            navigate("/");
        }, 5000);  // Viderestil til forsiden efter 5 sekunder
        console.log(placeOrderResult);
        setIsLoading(false); // Sæt loading til false, når bestilling er færdig
    
        if (placeOrderResult.status === 'ok') {
            setOrderStatus(true);
            setBasket([]);     
        }
    };

  
  



return (
    <div className={styles.basket_container}>
        {isLoading ? (
            <FullscreenLoader /> // Vis loader, mens ordren behandles
        ) : orderStatus ? (
            <div className={styles.order_success}>
                <img src="/assets/images/pineapple.png" alt="" />
                <p className={styles.success_message}>Tak for din bestilling!</p>
                <p className={styles.success_message}>Du viderestilles nu til forsiden...</p>
                <div className={styles.success_overlay}></div>
            </div>
        ) : (
            <>
                {basket.map((item, index) => (
                    <div key={index} className={styles.basket_item}>
                        <p>{item.quantity} x <img src={item.dishImage} alt="" /> {item.dishTitle}</p>
                        <span><p>Ekstra: </p>{item.extraIngredients ? item.extraIngredients.map((ingredient, index) => (
                            <p key={index}>{ingredient}</p>
                        )) : null}</span>
                        <span><p>Størrelse: </p><p>{item.size}</p></span>
                        <span><p>Pris: </p><p>{item.price} kr.</p></span>
                    </div>
                ))}

                {/* Basket total price */}
                <div className={styles.basket_total}>
                    <p>Total: {basketTotal} kr.</p>
                </div>

                {/* Basket comment to order */}
                <div className={styles.basket_comment}>
                    <textarea
                        placeholder="Kommentar til ordren"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>

                {/* Basket order button */}
                <div className={styles.basket_order}>
                    <button onClick={onOrderPlace}>Afgiv ordre</button>
                </div>
            </>
        )}
    </div>
);
}


export default BasketList;