import { useContext } from "react";
import { BasketContext } from "../context/basketContext";

export const useBasket = () => useContext(BasketContext);