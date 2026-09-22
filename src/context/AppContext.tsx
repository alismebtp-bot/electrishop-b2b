import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { Product } from "@/data/products";

// Types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: string;
  date: string;
  shippingAddress: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "customer" | "admin";
  company?: string;
  siret?: string;
  address?: string;
  phone?: string;
}

export interface Quote {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "approved" | "rejected";
  date: string;
  notes?: string;
}

export interface AppState {
  cart: CartItem[];
  user: User | null;
  orders: Order[];
  quotes: Quote[];
  favorites: string[];
  language: string;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  date: string;
}

type AppAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_USER"; payload: User | null }
  | { type: "ADD_ORDER"; payload: Order }
  | { type: "UPDATE_ORDER_STATUS"; payload: { id: string; status: string; trackingNumber?: string } }
  | { type: "ADD_QUOTE"; payload: Quote }
  | { type: "UPDATE_QUOTE_STATUS"; payload: { id: string; status: Quote["status"] } }
  | { type: "TOGGLE_FAVORITE"; payload: string }
  | { type: "SET_LANGUAGE"; payload: string }
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "MARK_NOTIFICATION_READ"; payload: string }
  | { type: "CLEAR_NOTIFICATIONS" }
  | { type: "LOAD_STATE"; payload: Partial<AppState> };

const initialState: AppState = {
  cart: [],
  user: null,
  orders: [],
  quotes: [],
  favorites: [],
  language: "fr",
  notifications: [],
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cart.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, action.payload] };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "ADD_ORDER":
      return { ...state, orders: [action.payload, ...state.orders] };
    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id
            ? { ...order, status: action.payload.status, trackingNumber: action.payload.trackingNumber || order.trackingNumber }
            : order
        ),
      };
    case "ADD_QUOTE":
      return { ...state, quotes: [action.payload, ...state.quotes] };
    case "UPDATE_QUOTE_STATUS":
      return {
        ...state,
        quotes: state.quotes.map((quote) =>
          quote.id === action.payload.id ? { ...quote, status: action.payload.status } : quote
        ),
      };
    case "TOGGLE_FAVORITE": {
      const exists = state.favorites.includes(action.payload);
      return {
        ...state,
        favorites: exists
          ? state.favorites.filter((id) => id !== action.payload)
          : [...state.favorites, action.payload],
      };
    }
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };
    case "CLEAR_NOTIFICATIONS":
      return { ...state, notifications: [] };
    case "LOAD_STATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState, () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("electrishop-state");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return { ...initialState, ...parsed };
        } catch {
          return initialState;
        }
      }
    }
    return initialState;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("electrishop-state", JSON.stringify(state));
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

// Cart helpers
export function useCart() {
  const { state, dispatch } = useApp();
  const cartTotal = state.cart.reduce(
    (sum, item) => sum + item.product.priceHT * item.quantity,
    0
  );
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product, quantity = 1) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: Date.now().toString(),
        title: "Produit ajouté",
        message: `${product.name} a été ajouté au panier`,
        type: "success",
        read: false,
        date: new Date().toISOString(),
      },
    });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      dispatch({ type: "REMOVE_FROM_CART", payload: id });
      return;
    }
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return {
    cart: state.cart,
    cartTotal,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}

// User helpers
export function useUser() {
  const { state, dispatch } = useApp();
  return {
    user: state.user,
    isLoggedIn: !!state.user,
    isAdmin: state.user?.role === "admin",
    login: (user: User) => dispatch({ type: "SET_USER", payload: user }),
    logout: () => dispatch({ type: "SET_USER", payload: null }),
    updateUser: (updates: Partial<User>) => {
      if (state.user) {
        dispatch({ type: "SET_USER", payload: { ...state.user, ...updates } });
      }
    },
  };
}

// Order helpers
export function useOrders() {
  const { state, dispatch } = useApp();
  return {
    orders: state.orders,
    addOrder: (order: Order) => dispatch({ type: "ADD_ORDER", payload: order }),
    updateOrderStatus: (id: string, status: string, trackingNumber?: string) =>
      dispatch({ type: "UPDATE_ORDER_STATUS", payload: { id, status, trackingNumber } }),
  };
}

// Quote helpers
export function useQuotes() {
  const { state, dispatch } = useApp();
  return {
    quotes: state.quotes,
    addQuote: (quote: Quote) => dispatch({ type: "ADD_QUOTE", payload: quote }),
    updateQuoteStatus: (id: string, status: Quote["status"]) =>
      dispatch({ type: "UPDATE_QUOTE_STATUS", payload: { id, status } }),
  };
}

// Favorites helpers
export function useFavorites() {
  const { state, dispatch } = useApp();
  return {
    favorites: state.favorites,
    isFavorite: (id: string) => state.favorites.includes(id),
    toggleFavorite: (id: string) => dispatch({ type: "TOGGLE_FAVORITE", payload: id }),
  };
}

// Notification helpers
export function useNotifications() {
  const { state, dispatch } = useApp();
  return {
    notifications: state.notifications,
    unreadCount: state.notifications.filter((n) => !n.read).length,
    addNotification: (notification: Notification) =>
      dispatch({ type: "ADD_NOTIFICATION", payload: notification }),
    markAsRead: (id: string) => dispatch({ type: "MARK_NOTIFICATION_READ", payload: id }),
    clearAll: () => dispatch({ type: "CLEAR_NOTIFICATIONS" }),
  };
}

// Language helpers
export function useLanguage() {
  const { state, dispatch } = useApp();
  return {
    language: state.language,
    setLanguage: (lang: string) => dispatch({ type: "SET_LANGUAGE", payload: lang }),
  };
}
