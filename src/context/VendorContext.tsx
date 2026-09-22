import React, { createContext, useContext, useReducer, useEffect } from "react";

export interface Vendor {
  id: string;
  name: string;
  email: string;
  company: string;
  status: "pending" | "active" | "suspended";
  commission: number;
  products: number;
  revenue: number;
  joinDate: string;
  address?: string;
  phone?: string;
  siret?: string;
}

export interface VendorProduct {
  id: string;
  vendorId: string;
  name: string;
  price: number;
  stock: number;
  status: "active" | "inactive" | "out_of_stock";
}

export interface VendorOrder {
  id: string;
  vendorId: string;
  productId: string;
  productName: string;
  quantity: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
}

interface VendorState {
  vendors: Vendor[];
  products: VendorProduct[];
  orders: VendorOrder[];
  currentVendor: Vendor | null;
}

type VendorAction =
  | { type: "SET_VENDORS"; payload: Vendor[] }
  | { type: "ADD_VENDOR"; payload: Vendor }
  | { type: "UPDATE_VENDOR"; payload: Vendor }
  | { type: "SET_PRODUCTS"; payload: VendorProduct[] }
  | { type: "ADD_PRODUCT"; payload: VendorProduct }
  | { type: "SET_ORDERS"; payload: VendorOrder[] }
  | { type: "SET_CURRENT_VENDOR"; payload: Vendor | null }
  | { type: "LOAD_STATE"; payload: Partial<VendorState> };

const initialState: VendorState = {
  vendors: [],
  products: [],
  orders: [],
  currentVendor: null,
};

function vendorReducer(state: VendorState, action: VendorAction): VendorState {
  switch (action.type) {
    case "SET_VENDORS":
      return { ...state, vendors: action.payload };
    case "ADD_VENDOR":
      return { ...state, vendors: [...state.vendors, action.payload] };
    case "UPDATE_VENDOR":
      return {
        ...state,
        vendors: state.vendors.map((v) =>
          v.id === action.payload.id ? action.payload : v
        ),
      };
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };
    case "SET_ORDERS":
      return { ...state, orders: action.payload };
    case "SET_CURRENT_VENDOR":
      return { ...state, currentVendor: action.payload };
    case "LOAD_STATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const VendorContext = createContext<{
  state: VendorState;
  dispatch: React.Dispatch<VendorAction>;
} | null>(null);

export function VendorProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(vendorReducer, initialState, () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("electrishop-vendor-state");
      if (saved) {
        try {
          return { ...initialState, ...JSON.parse(saved) };
        } catch {
          return initialState;
        }
      }
    }
    return initialState;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("electrishop-vendor-state", JSON.stringify(state));
    }
  }, [state]);

  return (
    <VendorContext.Provider value={{ state, dispatch }}>
      {children}
    </VendorContext.Provider>
  );
}

export function useVendor() {
  const context = useContext(VendorContext);
  if (!context) {
    throw new Error("useVendor must be used within a VendorProvider");
  }
  return context;
}
