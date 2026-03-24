import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/products";

interface Props {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export default function CollectionGrid({ products, title, subtitle }: Props) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            {subtitle && (
              <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">{subtitle}</p>
            )}
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
            <div className="w-16 h-0.5 gradient-gold mx-auto mt-4" />
          </motion.div>
        )}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
