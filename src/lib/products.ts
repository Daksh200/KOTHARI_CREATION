import kurti1 from "@/assets/kurti-1.jpg";
import kurti2 from "@/assets/kurti-2.jpg";
import kurti3 from "@/assets/kurti-3.jpg";
import kurti4 from "@/assets/kurti-4.jpg";
import kurti5 from "@/assets/kurti-5.jpg";
import kurti6 from "@/assets/kurti-6.jpg";
import kurti7 from "@/assets/kurti-7.jpg";
import kurti8 from "@/assets/kurti-8.jpg";

export interface Product {
  id: string;
  name: string;
  category: "kurtis" | "silk-sets" | "cotton-specials" | "new-arrivals";
  image: string;
  fabric: string;
  isNew?: boolean;
}

export const products: Product[] = [
  { id: "kc-001", name: "Maroon Royal Embroidered Kurti", category: "kurtis", image: kurti1, fabric: "Silk Blend" },
  { id: "kc-002", name: "Royal Blue Silver Thread Kurti", category: "kurtis", image: kurti2, fabric: "Pure Silk" },
  { id: "kc-003", name: "Emerald Zari Embroidered Kurti", category: "kurtis", image: kurti3, fabric: "Georgette", isNew: true },
  { id: "kc-004", name: "Blush Pink Chikankari Kurti", category: "cotton-specials", image: kurti4, fabric: "Cotton" },
  { id: "kc-005", name: "Purple Gold Brocade Silk Set", category: "silk-sets", image: kurti5, fabric: "Banarasi Silk" },
  { id: "kc-006", name: "Mustard Block Print Cotton Kurti", category: "cotton-specials", image: kurti6, fabric: "Cotton", isNew: true },
  { id: "kc-007", name: "Ivory Pearl Mirror Work Anarkali", category: "new-arrivals", image: kurti7, fabric: "Georgette", isNew: true },
  { id: "kc-008", name: "Teal Lucknowi Embroidered Kurti", category: "kurtis", image: kurti8, fabric: "Chanderi Silk" },
];

export const WHATSAPP_NUMBER = "917829395699";

/**
 * Returns a wa.me URL with a templated message that includes product name and product URL (if available).
 * productUrl can be passed explicitly (recommended) or it will attempt to build a relative URL in the browser.
 */
export function getWhatsAppUrl(productName?: string, productId?: string, productUrl?: string): string {
  const baseUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (productName) {
    let url = productUrl || "";
    if (!url && typeof window !== "undefined" && productId) {
      try {
        url = `${window.location.origin}/product/${productId}`;
      } catch (e) {
        url = "";
      }
    }
    const message = encodeURIComponent(
      `Hi Kothari Creation, I'm interested in the ${productName} seen on your website (${url}). Please share the wholesale price list.`
    );
    return `${baseUrl}?text=${message}`;
  }
  return baseUrl;
}

/**
 * Build a single WhatsApp message URL listing all items with optional origin to build full product links.
 * Example message:
 * Hi Kothari Creation, I'm interested in the following items from your website:
 *
 * • Maroon Royal Embroidered Kurti (kc-001) - https://.../product/kc-001
 * • ...
 *
 * Please share the wholesale price list for these items.
 */
export function getInquiryListWhatsAppUrl(items: Product[], origin?: string): string {
  const itemList = items
    .map((p) => {
      const url = origin ? `${origin}/product/${p.id}` : "";
      return url ? `• ${p.name} (${p.id}) - ${url}` : `• ${p.name} (${p.id})`;
    })
    .join("\n");

  const message = encodeURIComponent(
    `Hi Kothari Creation, I'm interested in the following items from your website:\n\n${itemList}\n\nPlease share the wholesale price list for these items.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}
