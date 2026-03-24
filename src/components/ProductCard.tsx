import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Search } from "lucide-react";
import type { Product } from "@/lib/products";
import { getWhatsAppUrl } from "@/lib/products";
import { useInquiry } from "@/hooks/use-inquiry";

interface Props {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: Props) {
  const [hovered, setHovered] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const { toggleItem, hasItem } = useInquiry();
  const inList = hasItem(product.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoomPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group break-inside-avoid mb-4"
    >
      <div
        className="relative rounded-xl overflow-hidden shadow-card bg-card cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Image with zoom */}
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {/* Fabric Zoom Loupe */}
          {hovered && (
            <div
              className="absolute w-24 h-24 rounded-full border-2 border-primary/50 pointer-events-none overflow-hidden shadow-luxury"
              style={{
                left: `calc(${zoomPos.x}% - 48px)`,
                top: `calc(${zoomPos.y}% - 48px)`,
              }}
            >
              <img
                src={product.image}
                alt=""
                className="absolute w-[400%] h-[400%]"
                style={{
                  left: `-${zoomPos.x * 4 - 48}px`,
                  top: `-${zoomPos.y * 4 - 48}px`,
                }}
              />
            </div>
          )}
          {product.isNew && (
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full gradient-gold text-xs font-body font-semibold text-primary-foreground tracking-wider uppercase">
              New
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleItem(product);
            }}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              inList ? "bg-primary text-primary-foreground" : "glass text-foreground hover:bg-primary hover:text-primary-foreground"
            }`}
            aria-label={inList ? "Remove from inquiry list" : "Add to inquiry list"}
          >
            <Heart className={`w-4 h-4 ${inList ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs font-body text-muted-foreground tracking-wider uppercase mb-1">{product.fabric}</p>
          <h3 className="font-display text-base font-semibold text-foreground leading-snug mb-3">{product.name}</h3>
          <a
            href={getWhatsAppUrl(product.name, product.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-whatsapp text-primary-foreground font-body text-sm font-semibold transition-all hover:shadow-lg hover:brightness-110"
          >
            <Search className="w-4 h-4" />
            Check Wholesale Stock
          </a>
        </div>
      </div>
    </motion.div>
  );
}
