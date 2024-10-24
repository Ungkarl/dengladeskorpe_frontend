import { useParams, Link, useOutletContext, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./DeleteOrder.module.css";
import { IoIosArrowRoundBack } from "react-icons/io";

import { useFetch } from "../../../../hooks/useFetch";
import FullscreenLoader from "../../../FullscreenLoader/FullscreenLoader";


const DeleteOrder = () => {
    const { orders } = useFetch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const { deleteOrder } = useOutletContext();


    useEffect(() => {
        const fetchOrder = async () => { 
            await new Promise(resolve => setTimeout(resolve, 2000));
            const order = orders.find(order => order._id === id);
            console.log(order);
            setOrder(order);
        };
        fetchOrder();
    } , [orders, id]);



    const handleDelete = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        // Simulated waiting time of 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Call deleteUser from useOutletContext
        await deleteOrder(id);
        navigate("/backoffice/orders");
        setLoading(false); // Stop loading
    };


    if (loading) {
        return <FullscreenLoader />;
    }

    if (!order) {
        return  <FullscreenLoader />;
    }


    return (
        <div className={styles.deleteOrderContainer}>
        <div className={styles.order}>
            <Link to="/backoffice/orders" className={styles.orderBackButton}>
                <IoIosArrowRoundBack />
            </Link>
            <div className={styles.orderInfo}>
                <h2>{order._id}</h2>
                <p>{order.totalPrice} dkk.</p>
                <label>Afsendt: <input type="checkbox" checked={order.shipped} disabled /></label>
            </div>
            <button className={styles.deleteConfirmBtn} onClick={handleDelete}>
                BEKRÆFT SLETNING
            </button>
        </div>
    </div>
    )


};


export default DeleteOrder;