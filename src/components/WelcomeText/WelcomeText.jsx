import styles from "./WelcomeText.module.css";
import { useLocation } from "react-router-dom";
import usePageText from "../../hooks/usePageText";

const WelcomeText = () => {
  // Få adgang til den aktuelle route
  const location = useLocation();

  // Brug custom hook til at få den passende tekst og titel baseret på pathname
  const { title, text } = usePageText(location.pathname);

  return (
    <div className={styles.welcome_container}>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
};

export default WelcomeText;
