import styles from "./GlobalFooter.module.css";



const GlobalFooter = () => {



    return (
        <div className={styles.global_footer}>
            <img src="/assets/images/logo.png" alt="" />
            <div className={styles.footer_contact}>
                <p>Email: gladskorpe@pizzaglad.dk</p>
                <p>Telefon: 88 88 88 88</p>
                <p>Adresse: Pizzavej 1, 1234 Pizza City</p>
            </div>
        </div>
    )



};

export default GlobalFooter;