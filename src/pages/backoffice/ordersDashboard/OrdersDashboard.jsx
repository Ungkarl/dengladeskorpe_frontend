import { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate, Outlet } from "react-router-dom";
import OrdersList from "../../../components/BackofficeComponents/Orders/OrdersList";


const OrdersDashboard = () => {
const { role } = useAuth();
const navigate = useNavigate();
const { deleteOrder, updateOrder } = useAuth();


useEffect(() => {
    if (role === "guest") {
        navigate('/dashboard');
    }
}, [role, navigate]);



return (
    <div>
        {role === "admin" ? (
            <div>
                <OrdersList />
                <Outlet context={{ deleteOrder, updateOrder }} />
            </div>
        ) : null}
    </div>
);

};


export default OrdersDashboard;