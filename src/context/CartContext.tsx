// Adaptateur : expose le panier global (AppContext) sous la forme
// { state: { items }, dispatch } attendue par les composants du site.
// Un seul panier pour toute l'appli.
import { useCallback, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { getProductById, type Product } from "@/data/products";

export interface CartLine {
  id: string;
  name: string;
  priceHT: number;
  image: string;
  quantity: number;
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: CartLine }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_CART" };

export function useCart() {
  const app = useApp();

  const items: CartLine[] = useMemo(
    () =>
      app.state.cart.map(({ product, quantity }) => ({
        id: product.id,
        name: product.name,
        priceHT: product.priceHT,
        image: product.image,
        quantity,
      })),
    [app.state.cart]
  );

  const dispatch = useCallback(
    (action: CartAction) => {
      switch (action.type) {
        case "ADD_ITEM": {
          const { quantity, ...line } = action.payload;
          const base = getProductById(line.id);
          const product: Product = base
            ? { ...base, priceHT: line.priceHT }
            : {
                ref: line.id,
                brand: "",
                category: "",
                categorySlug: "",
                description: "",
                stock: 0,
                rating: 0,
                reviewCount: 0,
                ...line,
              };
          app.dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
          break;
        }
        case "UPDATE_QUANTITY":
          if (action.payload.quantity < 1) {
            app.dispatch({ type: "REMOVE_FROM_CART", payload: action.payload.id });
          } else {
            app.dispatch({ type: "UPDATE_QUANTITY", payload: action.payload });
          }
          break;
        case "REMOVE_ITEM":
          app.dispatch({ type: "REMOVE_FROM_CART", payload: action.payload });
          break;
        case "CLEAR_CART":
          app.dispatch({ type: "CLEAR_CART" });
          break;
      }
    },
    [app]
  );

  return { state: { items }, dispatch };
}
