"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import type { CartLine, PaperType, PrintSize } from "@/lib/types";

interface CartContextValue {
  lines: CartLine[];
  addLine: (line: CartLine) => void;
  updateQuantity: (productId: string, size: PrintSize, paper: PaperType, qty: number) => void;
  removeLine: (productId: string, size: PrintSize, paper: PaperType) => void;
  clear: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "archive-and-bloom-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // Ignore — proceed with empty cart
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Ignore quota / privacy errors
    }
  }, [lines, hydrated]);

  const addLine = useCallback((line: CartLine) => {
    setLines((prev) => {
      const idx = prev.findIndex(
        (l) => l.productId === line.productId && l.size === line.size && l.paper === line.paper
      );
      if (idx === -1) return [...prev, line];
      const next = [...prev];
      next[idx] = { ...next[idx], quantity: next[idx].quantity + line.quantity };
      return next;
    });
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: PrintSize, paper: PaperType, quantity: number) => {
      setLines((prev) =>
        prev
          .map((l) =>
            l.productId === productId && l.size === size && l.paper === paper
              ? { ...l, quantity }
              : l
          )
          .filter((l) => l.quantity > 0)
      );
    },
    []
  );

  const removeLine = useCallback(
    (productId: string, size: PrintSize, paper: PaperType) => {
      setLines((prev) =>
        prev.filter(
          (l) => !(l.productId === productId && l.size === size && l.paper === paper)
        )
      );
    },
    []
  );

  const clear = useCallback(() => setLines([]), []);

  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);

  const value = useMemo(
    () => ({ lines, addLine, updateQuantity, removeLine, clear, itemCount }),
    [lines, addLine, updateQuantity, removeLine, clear, itemCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
