import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import Scene3D from "./Scene3D";

function useHeroPerformanceMode() {
  const [useStaticBg, setUseStaticBg] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const hasWebGL = !!window.WebGLRenderingContext;
    // @ts-ignore
    const mem = (navigator as any).deviceMemory;
    const lowEnd = mq.matches || (mem !== undefined && mem < 4);

    setUseStaticBg(lowEnd || !hasWebGL);
  }, []);

  return useStaticBg;
}

export default function HeroSection() {
  const useStaticBg = useHeroPerformanceMode();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-foreground/40" />
      </div>

      {!useStaticBg && (
        <div className="absolute inset-0">
          <Scene3D />
          <div className="absolute inset-0 bg-foreground/30 pointer-events-none" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-body text-sm md:text-base tracking-[0.3em] uppercase text-pearl/80 mb-4"
          >
            Wholesale Ethnic Wear from Mysuru
          </motion.p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-pearl leading-tight mb-6">
            Where Tradition Meets{" "}
            <span className="text-gold-gradient">Elegance</span>
          </h1>
          <p className="font-body text-base md:text-lg text-pearl/70 max-w-lg mb-8">
            Discover handcrafted kurtis, silk sets, and cotton specials — curated for retailers who value quality and heritage.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/collections/new-arrivals"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full gradient-gold text-primary-foreground font-body font-semibold text-sm tracking-wide shadow-luxury transition-transform hover:scale-105"
            >
              Explore Collection <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/917829395699"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-pearl/30 text-pearl font-body font-semibold text-sm tracking-wide transition-all hover:bg-pearl/10"
            >
              Contact on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
