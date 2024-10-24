import styles from "./AddEmployee.module.css";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FullscreenLoader from "../../../FullscreenLoader/FullscreenLoader";

const AddEmployee = () => {
    const navigate = useNavigate();
    const { addEmployee } = useOutletContext();
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false); 
    const [image, setImage] = useState('/vite.svg');


    //Function to handle the image change, and set the image to the preview.
    const onImageChange = (e) => {
        let objectUrl = window.URL.createObjectURL(e.target.files[0]);
        setImage(objectUrl);
        console.log(e.target.files[0]);
    };

    //Function to handle the form submit.
    const onSubmit = async (data) => {
        setLoading(true);

        //Minimum loading time of 2 seconds
        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2000));
        //Formdata to send to the backend
        let formData = new FormData();
        formData.append('file', data.file[0]);
        formData.append("name", data.name);
        formData.append("position", data.description);

        
        const addEmployeeResult = await addEmployee(formData);
        ///Waiting for both promises to resolve
        await Promise.all([addEmployeeResult, minLoadingTime]);

        setLoading(false);
        navigate("/backoffice/employees");
    }; 
    
    //Loading screen
    if (loading) {
        return <FullscreenLoader />;
    }

    //Frontend for the add employee form.
    return (
      <div className={styles.addEmployeeContainer}>
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Link to="/backoffice/employees" className={styles.backButton}>
            <IoIosArrowRoundBack />
          </Link>
          <label className={`${styles.add_label} ${styles.imgLabel}`}>
            Upload Billede
            <img
              className={styles.employee_img}
              src={image}
              alt="Employee Preview"
            />
            <input
              type="file"
              {...register("file")}
              onChange={onImageChange}
              className={`${styles.add_input} ${styles.ImgInputHidden}`}
            />
          </label>

          <label className={styles.add_label}>
            Name
            <input
              type="text"
              {...register("name")}
              defaultValue="Medarbejder navn"
              className={styles.add_input}
            />
          </label>

          <label className={styles.add_label}>
            Description
            <input
              type="text"
              {...register("description")}
              defaultValue="Medarbjeder stilling"
              className={styles.add_input}
            />
          </label>

          <button className={styles.button} type="submit">
            OPRET MEDARBEJDER
          </button>
        </form>
      </div>
    );

};


export default AddEmployee;