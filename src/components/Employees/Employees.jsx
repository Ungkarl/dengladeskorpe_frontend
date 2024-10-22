import styles from "./Employees.module.css";
import { useFetch } from "../../hooks/useFetch";


const Employees = () => {
    const { employees } = useFetch();



    return (
      <div className={styles.employees_container}>
        <div className={styles.employees}>
          {employees.map((employee) => (
            <div key={employee.id} className={styles.employee_card}>
              <img src={employee.image} alt={employee.name} />
              <h3>{employee.name}</h3>
              <p>{employee.position}</p>
            </div>
          ))}
        </div>
      </div>   
    )




};


export default Employees;