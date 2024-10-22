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
    const [loading, setLoading] = useState(false); // Loading state
    const { deleteEmployee } = useOutletContext();

    useEffect(() => {
        const fetchProduct = async () => {
            // Simuleret ventetid på 2 sekunder
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const employee = employees.find(employee => employee._id === id);
            setEmployee(employee);
        }
        fetchProduct();
    }, [employees, id]);

    const handleDelete = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        // Simuleret ventetid på 2 sekunder
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Kald deleteUser fra useOutletContext
        await deleteEmployee(id);
        navigate('/backoffice/employees');

        setLoading(false); // Stop loading
    }

    if (loading) {
        return <FullscreenLoader />;
    }

    if (!employee) {
        return <FullscreenLoader />;
    }

    return (
        <div className={styles.deleteProductContainer}>
            <div className={styles.product}>
                <Link to="/backoffice/employees" className={styles.productBackButton}><IoIosArrowRoundBack /></Link>
                <div className={styles.productImgContainer}>
                    <img className={styles.productImg} src={`${employee.image}`} alt="Employee" />
                </div>
                <div className={styles.productInfo}>
                    <h2>{employee.name}</h2>
                    <p>{employee.position}</p>
                    
                    
                </div>
                <button className={styles.deleteConfirmBtn} onClick={handleDelete}>CONFIRM DELETION</button> 
            </div>
        </div>
    );
};

export default DeleteEmployee;
