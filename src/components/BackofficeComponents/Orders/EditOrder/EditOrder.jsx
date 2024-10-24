import { useParams,  Link, useOutletContext, useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./EditOrder.module.css";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useFetch } from "../../../../hooks/useFetch";
import FullscreenLoader from "../../../FullscreenLoader/FullscreenLoader";
import { useForm } from "react-hook-form";



const EditOrder = () => {
    const { orders } = useFetch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const { updateOrder } = useOutletContext();
    const { register, handleSubmit } = useForm();


useEffect(() => {
    const fetchOrder = async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const order = orders.find(order => order._id === id);
        console.log(order);
        setOrder(order);
    };
    fetchOrder();
}, [orders, id]);


const handleUpdate = async (data) => {
    setLoading(true); // Start loading

    // Simulated waiting time of 2 seconds
    const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2000));

    let formData = new FormData();
    formData.append("id", id);
    formData.append("shipped", data.status);

    const updateOrderResult = updateOrder(formData);
    await Promise.all([minLoadingTime, updateOrderResult]);

    setLoading(false); // Stop loading
    navigate("/backoffice/orders");


};

if (loading) {
    return <FullscreenLoader />;
}

if (!order) {
    return <FullscreenLoader />;
}

return (
    <div className={styles.editOrderContainer}>
        <div className={styles.order}>
            <Link to="/backoffice/orders" className={styles.OrderBackButton}>
                <IoIosArrowRoundBack />
            </Link>
        </div>
        <form className={styles.editOrderForm} onSubmit={handleSubmit(handleUpdate)}>
            <div className={styles.OrderInfo}>
                <h2>{order._id}</h2>
            </div>
            <label className={styles.upd_label}>
                <span>Totalpris</span>
                <input className={styles.upd_input} type="text" disabled defaultValue={order.totalPrice} {...register("subject")} />
            </label>
            <label className={styles.upd_label}>
                <span>Afsendt</span>
                <input className={styles.upd_tickbox} type="checkbox" defaultChecked={order.shipped} {...register("status")} />
            </label>
            <button className={styles.updateConfirmBtn} type="submit">Opdater ordre</button>
        </form>
    </div>
)


};


export default EditOrder;