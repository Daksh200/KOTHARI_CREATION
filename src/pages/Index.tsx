import HeroSection from "@/components/HeroSection";
import CollectionGrid from "@/components/CollectionGrid";
import { products } from "@/lib/products";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const features = [
  { title: "Handcrafted Quality", desc: "Every piece is meticulously crafted by skilled artisans from Mysuru" },
  { title: "Wholesale Pricing", desc: "Direct factory prices for retailers and bulk buyers across India" },
  { title: "Heritage Since Generations", desc: "Trusted name on Ashoka Road with a legacy of fine ethnic wear" },
];

export default function Index() {
  return (
    <main>
      <HeroSection />

      {/* Trust Bar */}
      <section className="py-12 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="flex justify-center gap-1 mb-3 text-primary">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CollectionGrid
        products={products}
        title="Our Collections"
        subtitle="Curated for You"
      />
    </main>
  );
}

