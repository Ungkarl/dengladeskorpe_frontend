import { useParams, useOutletContext, useNavigate, Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import styles from "./UpdateEmployee.module.css";
import { useForm } from "react-hook-form";
import { useFetch } from "../../../../hooks/useFetch";
import FullscreenLoader from "../../../FullscreenLoader/FullscreenLoader";


const UpdateEmployee = () => {
    const { employees } = useFetch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(false);
    const { updateEmployee } = useOutletContext();
    const [image, setImage] = useState('/vite.svg');
    const { register, handleSubmit, setValue } = useForm();

    //Function for changing the image 
    const onImageChange = (e) => {
        let image = e.target.files[0];
        console.log(image);
        let objectUrl = window.URL.createObjectURL(e.target.files[0]);
        setImage(objectUrl);
        setValue("file", image); //Setting the file to the form data
       
    };
    

    //Submit function using formData.
    const onSubmit = async (data) => {
        setLoading(true);

        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2000));
      
        let formData = new FormData();
        formData.append('file', data.file);
        formData.append("name", data.name);
        formData.append("position", data.position);
        formData.append('id', id);

       
        const updateEmployeeResult = updateEmployee(formData);
        //Wiating for both promises to resolve
        await Promise.all([minLoadingTime, updateEmployeeResult]);

        setLoading(false);
        navigate('/backoffice/employees');
    };
   

    //Fetching the employee if employees and id is available
    useEffect(() => {
        const fetchEmployee = async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const employee = employees.find(employee => employee._id === id);
            setEmployee(employee);
            setImage(`${employee.image}`);
        }
        fetchEmployee();
    }, [employees, id]);


    //Loading screens
    if (loading) { 
        return <FullscreenLoader />;
    }

    if (!employee) {
     return <FullscreenLoader />;
    }
    

    
    return (
        <div className={styles.editEmployeeContainer}>
            <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <Link to="/backoffice/employees" className={styles.backButton}>
                    <IoIosArrowRoundBack />
                </Link>
                <label className={`${styles.upd_label} ${styles.imgLabel}`}>
                    Upload Billede
                    <img className={styles.employeeImg} src={image} alt="Employee Preview" />
                    <input
              type="file"
              {...register("file")}
              onChange={onImageChange}
              className={`${styles.add_input} ${styles.ImgInputHidden}`}
            />
                </label>

                <label className={styles.upd_label}>
                    Name
                    <input
                        type="text"
                        {...register("name")}
                        defaultValue={employee.name}
                        className={styles.upd_input}
                    />
                </label>

                <label className={styles.upd_label}>
                    Position
                    <input
                        type="text"
                        {...register("position")}
                        defaultValue={employee.position}
                        className={styles.upd_input}
                    />
                </label>

                <button className={styles.updateConfirmBtn} type="submit">CONFIRM UPDATE</button>
            </form>
        </div>
    );
};

export default UpdateEmployee;
