import { useState } from "react";
import styles from "./OrdersList.module.css";
import { Link } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";



const OrdersList = () => {
   const { orders } = useFetch();
    const [searchTerm, setSearchTerm] = useState("");


    //Converts the shipped value to a string and checks if it includes the search term. True or false.
    const filteredOrders = (orders || []).filter(order => {
        return String(order?.shipped).toLowerCase().includes(searchTerm.toLowerCase())
    })

    return (
        <div className={styles.orders_container}>
            ORDERS ADMIN
            <div className={styles.search_order_bar}>
                <input
                    type="text"
                    placeholder="Search Orders"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className={styles.order_list}>
                {filteredOrders.map((order) => (
                    <div key={order._id} className={styles.order_card}>
                        <div className={styles.order_id}><p>Ordre nr.</p>{order._id}</div>
                        <div className={styles.order_description}>
                            <p>Kommentar: {order.comment}</p>
                            <label>Leveret: <input type="checkbox" checked={order.shipped} disabled /></label>

                        </div>
                        <div className={styles.order_actions}>
                            <Link
                                className={styles.edit_link}
                                to={`/backoffice/orders/edit/${order._id}`}
                            >
                                Edit
                            </Link>
                            <Link
                                className={styles.delete_link}
                                to={`/backoffice/orders/delete/${order._id}`}
                            >
                                Delete
                            </Link>
                        </div>
                    </div>
                ))}
            </div>







        </div>
    )



};



export default OrdersList;