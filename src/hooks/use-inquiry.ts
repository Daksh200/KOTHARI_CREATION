import { useSyncExternalStore } from "react";
import { inquiryStore } from "@/lib/inquiry-store";
import type { Product } from "@/lib/products";

export function useInquiry() {
  const items = useSyncExternalStore(
    inquiryStore.subscribe,
    inquiryStore.getItems
  );

  return {
    items,
    addItem: inquiryStore.addItem,
    removeItem: inquiryStore.removeItem,
    toggleItem: inquiryStore.toggleItem,
    clearItems: inquiryStore.clearItems,
    hasItem: (id: string) => items.some((i) => i.id === id),
    count: items.length,
  };
}
