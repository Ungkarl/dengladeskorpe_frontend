import { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useOutletContext, useNavigate, Outlet } from "react-router-dom";
import EmployeesList from "../../../components/BackofficeComponents/Employees/EmployeesList";
const EmployeesDashboard = () => {
    const { role } = useOutletContext();
    const navigate = useNavigate();
    const {  addEmployee, deleteEmployee, updateEmployee } = useAuth(); 

    useEffect(() => {
        if (role === "guest") {
            navigate('/management');
        }
    }, [role, navigate]);

  

    return (
        <div>
            {role === "admin" ? (
                <div> 
                    <EmployeesList />
                    <Outlet context={{ addEmployee, deleteEmployee, updateEmployee }} />
                </div>
            ) : null}
        </div>
    );
};

export default EmployeesDashboard;
