import { create } from "zustand";
import type { Product } from "./products";

interface InquiryStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  clearItems: () => void;
  hasItem: (productId: string) => boolean;
}

// Simple store without zustand dependency - using React context pattern instead
let _items: Product[] = [];
let _listeners: (() => void)[] = [];

function notify() {
  _listeners.forEach((l) => l());
}

export const inquiryStore = {
  getItems: () => _items,
  subscribe: (listener: () => void) => {
    _listeners.push(listener);
    return () => {
      _listeners = _listeners.filter((l) => l !== listener);
    };
  },
  addItem: (product: Product) => {
    if (!_items.find((i) => i.id === product.id)) {
      _items = [..._items, product];
      notify();
    }
  },
  removeItem: (productId: string) => {
    _items = _items.filter((i) => i.id !== productId);
    notify();
  },
  toggleItem: (product: Product) => {
    if (_items.find((i) => i.id === product.id)) {
      inquiryStore.removeItem(product.id);
    } else {
      inquiryStore.addItem(product);
    }
  },
  clearItems: () => {
    _items = [];
    notify();
  },
  hasItem: (productId: string) => _items.some((i) => i.id === productId),
};
