import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">
              KOTHARI <span className="text-gold">CREATION</span>
            </h3>
            <p className="font-body text-sm text-background/60 leading-relaxed">
              Wholesale ethnic wear from the heart of Mysuru. Ashoka Road heritage, trusted by thousands of retailers across India.
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2 font-body text-sm text-background/60">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <Link to="/collections/kurtis" className="hover:text-gold transition-colors">Kurtis</Link>
              <Link to="/collections/silk-sets" className="hover:text-gold transition-colors">Silk Sets</Link>
              <Link to="/about" className="hover:text-gold transition-colors">About Us</Link>
            </nav>
          </div>
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
            <div className="font-body text-sm text-background/60 space-y-2">
              <p><a href="https://maps.app.goo.gl/uvQaKZowwxRa1NdN6" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Ashoka Road, Mysuru, Karnataka</a></p>

              <p>+91 78293 95699</p>
              <p>Google Rating: ⭐⭐⭐⭐⭐</p>
              <p><a href="https://www.instagram.com/7sh_ades/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Instagram</a></p>

            </div>

          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-background/10 text-center font-body text-xs text-background/40">
          © {new Date().getFullYear()} Kothari Creation. All rights reserved. | Created by <a href="tel:+918431485394" className="hover:text-gold underline">DAKSH</a> (+91 8431485394)
        </div>

      </div>
    </footer>
  );
}
