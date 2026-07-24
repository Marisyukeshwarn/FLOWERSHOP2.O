"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  size: string;
  thickness: string;
  flower: string;
  quantity: number;
  slug: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  image: string;
  price: number;
  slug: string;
  category: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  rewardPoints: number;
  role: "customer" | "admin";
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

// ─── Cart Context ─────────────────────────────────────────────────────────────

interface CartState {
  items: CartItem[];
  couponCode: string;
  couponDiscount: number;
  giftWrap: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QTY"; payload: { id: string; qty: number } }
  | { type: "CLEAR_CART" }
  | { type: "APPLY_COUPON"; payload: { code: string; discount: number } }
  | { type: "REMOVE_COUPON" }
  | { type: "TOGGLE_GIFT_WRAP" }
  | { type: "HYDRATE"; payload: CartState };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find(
        (i) =>
          i.productId === action.payload.productId &&
          i.size === action.payload.size &&
          i.thickness === action.payload.thickness
      );
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === exists.id ? { ...i, quantity: i.quantity + action.payload.quantity } : i
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) };
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: Math.max(1, action.payload.qty) } : i
        ),
      };
    case "CLEAR_CART":
      return { items: [], couponCode: "", couponDiscount: 0, giftWrap: false };
    case "APPLY_COUPON":
      return { ...state, couponCode: action.payload.code, couponDiscount: action.payload.discount };
    case "REMOVE_COUPON":
      return { ...state, couponCode: "", couponDiscount: 0 };
    case "TOGGLE_GIFT_WRAP":
      return { ...state, giftWrap: !state.giftWrap };
    case "HYDRATE":
      return action.payload;
    default:
      return state;
  }
}

// ─── Wishlist Context ─────────────────────────────────────────────────────────

interface WishlistState {
  items: WishlistItem[];
}

type WishlistAction =
  | { type: "ADD"; payload: WishlistItem }
  | { type: "REMOVE"; payload: string }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; payload: WishlistItem[] };

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "ADD":
      if (state.items.find((i) => i.id === action.payload.id)) return state;
      return { items: [...state.items, action.payload] };
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.payload) };
    case "CLEAR":
      return { items: [] };
    case "HYDRATE":
      return { items: action.payload };
    default:
      return state;
  }
}

// ─── Auth Context ─────────────────────────────────────────────────────────────

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  addresses: Address[];
  isHydrated: boolean;
}

type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "ADD_ADDRESS"; payload: Address }
  | { type: "REMOVE_ADDRESS"; payload: string }
  | { type: "SET_DEFAULT_ADDRESS"; payload: string }
  | { type: "HYDRATE"; payload: AuthState };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "LOGOUT":
      return { user: null, isAuthenticated: false, addresses: [], isHydrated: state.isHydrated };
    case "ADD_ADDRESS":
      return { ...state, addresses: [...state.addresses, action.payload] };
    case "REMOVE_ADDRESS":
      return { ...state, addresses: state.addresses.filter((a) => a.id !== action.payload) };
    case "SET_DEFAULT_ADDRESS":
      return {
        ...state,
        addresses: state.addresses.map((a) => ({ ...a, isDefault: a.id === action.payload })),
      };
    case "HYDRATE":
      return { ...action.payload, isHydrated: true };
    default:
      return state;
  }
}

// ─── Contexts ─────────────────────────────────────────────────────────────────

// ─── Products Context ─────────────────────────────────────────────────────────

interface ProductsState {
  items: any[];
  isLoading: boolean;
}

type ProductsAction =
  | { type: "SET_PRODUCTS"; payload: any[] }
  | { type: "ADD_PRODUCT"; payload: any }
  | { type: "UPDATE_PRODUCT"; payload: any }
  | { type: "DELETE_PRODUCT"; payload: string };

function productsReducer(state: ProductsState, action: ProductsAction): ProductsState {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { items: action.payload, isLoading: false };
    case "ADD_PRODUCT":
      return { ...state, items: [...state.items, action.payload] };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        items: state.items.map((i) => (i.id === action.payload.id ? action.payload : i)),
      };
    case "DELETE_PRODUCT":
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) };
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  totalItems: number;
  subtotal: number;
  total: number;
  deliveryCharge: number;
  taxes: number;
} | null>(null);

const WishlistContext = createContext<{
  state: WishlistState;
  dispatch: React.Dispatch<WishlistAction>;
  isWishlisted: (id: string) => boolean;
} | null>(null);

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
} | null>(null);

const ProductsContext = createContext<{
  state: ProductsState;
  dispatch: React.Dispatch<ProductsAction>;
} | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

import { products as fallbackProducts } from "@/lib/data";

const VALID_COUPONS: Record<string, number> = {
  BLOOM10: 10,
  WEDDING20: 20,
  FESTIVAL15: 15,
  FIRST50: 50,
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    items: [],
    couponCode: "",
    couponDiscount: 0,
    giftWrap: false,
  });

  const [wishlistState, wishlistDispatch] = useReducer(wishlistReducer, { items: [] });

  const [authState, authDispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    addresses: [],
    isHydrated: false,
  });

  const [productsState, productsDispatch] = useReducer(productsReducer, {
    items: [], // Start empty
    isLoading: true,
  });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("mahalakshmi-cart");
      if (savedCart) cartDispatch({ type: "HYDRATE", payload: JSON.parse(savedCart) });

      const savedWishlist = localStorage.getItem("mahalakshmi-wishlist");
      if (savedWishlist) wishlistDispatch({ type: "HYDRATE", payload: JSON.parse(savedWishlist) });

      const savedAuth = localStorage.getItem("mahalakshmi-auth");
      if (savedAuth) authDispatch({ type: "HYDRATE", payload: JSON.parse(savedAuth) });
      else authDispatch({ type: "HYDRATE", payload: { user: null, isAuthenticated: false, addresses: [], isHydrated: true } });

      const savedProducts = localStorage.getItem("mahalakshmi-products");
      if (savedProducts) {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed)) {
          productsDispatch({ type: "SET_PRODUCTS", payload: parsed });
        }
      }
    } catch {
      authDispatch({ type: "HYDRATE", payload: { user: null, isAuthenticated: false, addresses: [], isHydrated: true } });
    }
  }, []);

  // Fetch products from API on mount — always prefer server as source of truth
  useEffect(() => {
    let eventSource: EventSource | null = null;
    let reconnectTimeout: NodeJS.Timeout;
    let reconnectAttempts = 0;

    const connectSSE = () => {
      eventSource = new EventSource('/api/events');
      
      eventSource.onopen = () => {
        reconnectAttempts = 0; // Reset attempts on successful connection
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'ADD_PRODUCT') {
            productsDispatch({ type: 'ADD_PRODUCT', payload: data.product });
          } else if (data.type === 'UPDATE_PRODUCT') {
            productsDispatch({ type: 'UPDATE_PRODUCT', payload: data.product });
          } else if (data.type === 'DELETE_PRODUCT') {
            productsDispatch({ type: 'DELETE_PRODUCT', payload: data.productId });
          }
        } catch (e) {
          // ignore parse errors
        }
      };

      eventSource.onerror = () => {
        eventSource?.close();
        // Exponential backoff: 2s, 4s, 8s, max 30s
        const timeout = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
        reconnectAttempts++;
        reconnectTimeout = setTimeout(connectSSE, timeout);
      };
    };

    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          productsDispatch({ type: 'SET_PRODUCTS', payload: data });
        } else {
          productsDispatch({ type: 'SET_PRODUCTS', payload: [] });
        }
      })
      .catch(() => {
        productsDispatch({ type: 'SET_PRODUCTS', payload: [] });
      })
      .finally(() => {
        // Connect SSE only AFTER initial fetch resolves to prevent race conditions
        connectSSE();
      });

    return () => {
      if (eventSource) eventSource.close();
      clearTimeout(reconnectTimeout);
    };
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("mahalakshmi-cart", JSON.stringify(cartState));
  }, [cartState]);

  useEffect(() => {
    localStorage.setItem("mahalakshmi-wishlist", JSON.stringify(wishlistState.items));
  }, [wishlistState]);

  useEffect(() => {
    localStorage.setItem("mahalakshmi-auth", JSON.stringify(authState));
  }, [authState]);

  const totalItems = cartState.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = cartState.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryCharge = subtotal >= 2000 || subtotal === 0 ? 0 : 80;
  const taxes = subtotal * 0.05;
  const giftWrapCharge = cartState.giftWrap ? 50 : 0;
  const discountAmount = (subtotal * cartState.couponDiscount) / 100;
  const total = subtotal + taxes + deliveryCharge + giftWrapCharge - discountAmount;

  const isWishlisted = (id: string) => wishlistState.items.some((i) => i.id === id);

  return (
    <AuthContext.Provider value={{ state: authState, dispatch: authDispatch }}>
      <ProductsContext.Provider value={{ state: productsState, dispatch: productsDispatch }}>
        <WishlistContext.Provider value={{ state: wishlistState, dispatch: wishlistDispatch, isWishlisted }}>
          <CartContext.Provider
            value={{ state: cartState, dispatch: cartDispatch, totalItems, subtotal, total, deliveryCharge, taxes }}
          >
            {children}
          </CartContext.Provider>
        </WishlistContext.Provider>
      </ProductsContext.Provider>
    </AuthContext.Provider>
  );
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within StoreProvider");
  return ctx;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within StoreProvider");
  return ctx;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within StoreProvider");
  return ctx;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within StoreProvider");
  return ctx;
}

export { VALID_COUPONS };
