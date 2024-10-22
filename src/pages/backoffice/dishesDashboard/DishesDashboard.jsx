import { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate, Outlet } from "react-router-dom";
import DishesList from "../../../components/BackofficeComponents/DishesBackoffice/DishesList";


const DishesDashboard = () => {
    const { role } = useAuth();
    const navigate = useNavigate();
    const { deleteDish, updateDish, addDish } = useAuth();
    useEffect(() => {
        if (role === "guest") {
            navigate('/');
        }
    }, [role, navigate]);

    return (
        <div>
            {role === "admin" ? (
                <div>
                    <DishesList />
                    <Outlet context={{ deleteDish, updateDish, addDish }} />
                </div>
            ) : null}
        </div>
    );


};


export default DishesDashboard;