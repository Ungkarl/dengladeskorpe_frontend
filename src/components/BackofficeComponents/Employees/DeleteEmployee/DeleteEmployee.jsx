import { useParams, Link, useOutletContext, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import styles from "./DeleteEmployee.module.css";
import { useFetch } from "../../../../hooks/useFetch";
import FullscreenLoader from "../../../FullscreenLoader/FullscreenLoader";

const DeleteEmployee = () => {
    const { employees } = useFetch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(false); 
    const { deleteEmployee } = useOutletContext();



    //Fetching the employee if employees and id is available
    useEffect(() => {
        const fetchEmployee = async () => {
            // Simulated waiting time of 2 seconds
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const employee = employees.find(employee => employee._id === id);
            setEmployee(employee);
        }
        fetchEmployee();
    }, [employees, id]);


    //Function to handle the deletion of the employee
    const handleDelete = async () => {

        setLoading(true); 

        // Simulated waiting time of 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Call deleteEmployee from useOutletContext
        await deleteEmployee(id);
        navigate('/backoffice/employees');

        setLoading(false);
    }


    //Loading screens
    if (loading) {
        return <FullscreenLoader />;
    }

    if (!employee) {
        return <FullscreenLoader />;
    }

    return (
        <div className={styles.deleteEmployeeContainer}>
            <div className={styles.employee}>
                <Link to="/backoffice/employees" className={styles.employeeBackButton}><IoIosArrowRoundBack /></Link>
                <div className={styles.employeeImgContainer}>
                    <img className={styles.employeeImg} src={`${employee.image}`} alt="Employee" />
                </div>
                <div className={styles.employeeInfo}>
                    <h2>{employee.name}</h2>
                    <p>{employee.position}</p>
                    
                    
                </div>
                <button className={styles.deleteConfirmBtn} onClick={handleDelete}>CONFIRM DELETION</button> 
            </div>
        </div>
    );
};

export default DeleteEmployee;
