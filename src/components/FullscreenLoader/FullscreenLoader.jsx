import { RotateLoader } from "react-spinners";
import styles from "./FullscreenLoader.module.css";


const FullscreenLoader = () => {
    return (
        <div className={styles.fullscreen_loader}>
            <RotateLoader color="#1a1a1a" size={15} />
        </div>
    )
};

export default FullscreenLoader;