import styles from "./WelcomeText.module.css";
import { useLocation } from "react-router-dom";
import usePageText from "../../hooks/usePageText";

const WelcomeText = () => {
  const location = useLocation();

  // Get the title and text for the current page using the usePageText hook
  const { title, text } = usePageText(location.pathname);

  return (
    <div className={styles.welcome_container}>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
};

export default WelcomeText;
