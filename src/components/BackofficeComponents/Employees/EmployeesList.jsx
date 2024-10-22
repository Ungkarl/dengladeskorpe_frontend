import { useState } from "react";
import styles from "./EmployeesList.module.css";
import { IoMdAdd } from "react-icons/io";

import { Link } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";


const EmployeesList = () => {
    const { employees } = useFetch();
   
    const [searchTerm, setSearchTerm] = useState("");


    const filteredEmployees = (employees || []).filter(employee =>
        employee?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );


    

    return (
        <div className={styles.employee_container}>
            <h1>EMPLOYEES ADMIN</h1>
            <div className={styles.search_employee_bar}>
                <input
                    type="text"
                    placeholder="Search Employee"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Link to="/backoffice/employees/add" className={styles.employee_add_button}><IoMdAdd /></Link>
            </div>
            
            <div className={styles.employee_list}>
                {filteredEmployees.map(employee => (
                    <div key={employee._id} className={styles.employee_card}>
                        <div className={styles.employee_image}>
                            <img src={employee.image} alt={employee.title} />
                        </div>
                        <div className={styles.employee_title}>{employee.name}</div>
                        <div className={styles.employee_description}>
                            <p>{employee.position}</p>
                        </div>
                        <div className={styles.employee_actions}>
                            <Link className={styles.edit_link} to={`/backoffice/employees/edit/${employee._id}`}>Edit</Link>
                            <Link className={styles.delete_link} to={`/backoffice/employees/delete/${employee._id}`}>Delete</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmployeesList;

