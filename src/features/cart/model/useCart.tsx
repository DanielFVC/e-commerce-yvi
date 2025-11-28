"use client";

import { useContext } from "react";
import { useCartContext } from "../context/CartProvider";

export const useCart = () => {
  return useCartContext();
};

export default useCart;
