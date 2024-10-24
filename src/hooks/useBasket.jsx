import { useContext } from "react";
import { BasketContext } from "../context/basketContext";

// Custom hook to use the BasketContext
export const useBasket = () => useContext(BasketContext);