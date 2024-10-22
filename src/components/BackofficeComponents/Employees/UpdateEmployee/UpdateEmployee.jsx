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
    //Get the id from the URL
    const { id } = useParams();
    //State for the product from ID
    const [employee, setEmployee] = useState(null);
    //State for loading
    const [loading, setLoading] = useState(false);
    //outlet context, where the updateProduct function is from the parent component
    const { updateEmployee } = useOutletContext();
    //State for the image
    const [image, setImage] = useState('/vite.svg');
    //React hook form
    const { register, handleSubmit, setValue } = useForm();

    //Function for changing the image
    const onImageChange = (e) => {
        let image = e.target.files[0];
        console.log(image);
        let objectUrl = window.URL.createObjectURL(e.target.files[0]);
        setImage(objectUrl);
        setValue("file", image);
       
    };
    //Function for submitting the updated employee, where the loading is set to true, 
    //to simulate a loading time for a minimum time. Afterwards, i wait for both the minimum loading time and the updateEmployee
    //function to finish, to then set the loading to false and navigate to the 'employees page in the backoffice.
    const onSubmit = async (data) => {
        console.log(data);
        if (!data.file || data.file.length === 0) {
            console.log(data)
            return;
        }
        setLoading(true);

        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2000));
      
        let formData = new FormData();
        formData.append('file', data.file);
        formData.append("name", data.name);
        formData.append("position", data.position);
        formData.append('id', id);

       
        const updateEmployeeResult = updateEmployee(formData);

        await Promise.all([minLoadingTime, updateEmployeeResult]);

        setLoading(false);
        navigate('/backoffice/employees');
    };
    //UseEffect for fetching the Employee from the employees array, where the id matches the id from the URL.
    useEffect(() => {
        const fetchEmployee = async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const employee = employees.find(employee => employee._id === id);
            setEmployee(employee);
            setImage(`${employee.image}`);
        }
        fetchEmployee();
    }, [employees, id]);


    //If loading is true, i return a loading spinner, if the employee is null, it loads while fetching it.
    if (loading) { 
        return <FullscreenLoader />;
    }

    if (!employee) {
     return <FullscreenLoader />;
    }
    //Frontend for the update employee form, where i use react hook form for the form handling.
    return (
        <div className={styles.editProductContainer}>
            <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <Link to="/backoffice/employees" className={styles.backButton}>
                    <IoIosArrowRoundBack />
                </Link>
                <label className={`${styles.upd_label} ${styles.imgLabel}`}>
                    Upload Billede
                    <img className={styles.productImg} src={image} alt="Employee Preview" />
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
