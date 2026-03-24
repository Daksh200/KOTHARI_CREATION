import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ShoppingBag } from "lucide-react";
import { useInquiry } from "@/hooks/use-inquiry";
import { getInquiryListWhatsAppUrl } from "@/lib/products";

const collections = [
  { label: "Kurtis", href: "/collections/kurtis" },
  { label: "Silk Sets", href: "/collections/silk-sets" },
  { label: "Cotton Specials", href: "/collections/cotton-specials" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const { count, items } = useInquiry();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        <Link to="/" className="font-display text-xl md:text-2xl font-bold tracking-wide text-foreground">
          KOTHARI <span className="text-gold-gradient">CREATION</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-body text-sm font-medium tracking-wide uppercase">
          <Link to="/" className={`transition-colors hover:text-primary ${location.pathname === "/" ? "text-primary" : "text-muted-foreground"}`}>
            Home
          </Link>
          <div className="relative group" onMouseEnter={() => setCollectionsOpen(true)} onMouseLeave={() => setCollectionsOpen(false)}>
            <button className="flex items-center gap-1 transition-colors hover:text-primary text-muted-foreground">
              Collections <ChevronDown className="w-3 h-3" />
            </button>
            <AnimatePresence>
              {collectionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute top-full left-0 mt-2 w-48 glass rounded-lg shadow-luxury overflow-hidden"
                >
                  {collections.map((c) => (
                    <Link
                      key={c.href}
                      to={c.href}
                      className="block px-4 py-3 text-sm text-foreground hover:bg-primary/10 transition-colors uppercase tracking-wide"
                    >
                      {c.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link to="/collections/new-arrivals" className={`transition-colors hover:text-primary ${location.pathname === "/collections/new-arrivals" ? "text-primary" : "text-muted-foreground"} uppercase tracking-wide`}>
            NEW ARRIVALS
          </Link>
          <Link to="/live-showroom" className={`transition-colors hover:text-primary ${location.pathname === "/live-showroom" ? "text-primary" : "text-muted-foreground"}`}>
            Live Showroom
          </Link>
          <Link to="/about" className={`transition-colors hover:text-primary ${location.pathname === "/about" ? "text-primary" : "text-muted-foreground"}`}>
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {count > 0 && (
            <a
              href={getInquiryListWhatsAppUrl(items)}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-body text-sm font-semibold shadow-luxury transition-transform hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Inquiry List</span>
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-foreground text-background text-xs flex items-center justify-center">
                {count}
              </span>
            </a>
          )}

          <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>

            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass border-t border-border"
          >
            <nav className="flex flex-col px-4 py-4 gap-3 font-body text-sm font-medium">
              <Link to="/" onClick={() => setMobileOpen(false)} className="py-2">Home</Link>
              <span className="py-2 text-muted-foreground text-xs uppercase tracking-widest">Collection</span>
              {collections.map((c) => (
                <Link key={c.href} to={c.href} onClick={() => setMobileOpen(false)} className="py-2 pl-4 uppercase tracking-wide">
                  {c.label}
                </Link>
              ))}
              <Link to="/collections/new-arrivals" onClick={() => setMobileOpen(false)} className="py-2 pl-4 uppercase tracking-wide">NEW ARRIVALS</Link>
              <Link to="/live-showroom" onClick={() => setMobileOpen(false)} className="py-2">Live Showroom</Link>
              <Link to="/about" onClick={() => setMobileOpen(false)} className="py-2">About</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
