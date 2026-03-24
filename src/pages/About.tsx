import { motion } from "framer-motion";
import { MapPin, Star, Phone, Heart } from "lucide-react";

export default function About() {
  return (
    <main className="pt-20">
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-14"
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Our Story</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              The Heart of <span className="text-gold-gradient">Mysuru</span>
            </h1>
            <div className="w-16 h-0.5 gradient-gold mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 font-body text-muted-foreground leading-relaxed"
          >
            <p>
              Nestled on the historic Ashoka Road in Mysuru, Kothari Creation has been a beacon of ethnic fashion excellence for generations. Our journey began with a simple vision — to bring the finest handcrafted Indian wear to retailers who share our passion for quality.
            </p>
            <p>
              Every piece in our collection tells a story of skilled craftsmanship, from intricate Chikankari to luxurious Banarasi silk. We work directly with artisan communities to ensure that the heritage of Indian textile art continues to thrive.
            </p>
            <p>
              As a trusted B2B wholesale partner, we serve thousands of retailers across India, offering competitive pricing without compromising on quality. Our Google 5-star rating is a testament to the relationships we build with every customer.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14"
          >
            {[
{ icon: MapPin, label: <><a href="https://maps.app.goo.gl/uvQaKZowwxRa1NdN6" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline">Ashoka Road, Mysuru</a></>, },

              { icon: Star, label: "Google 5-Star Rated" },
              { icon: Phone, label: "+91 78293 95699" },
              { icon: Heart, label: "Trusted by 1000+ Retailers" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="text-center p-6 rounded-xl glass shadow-card">
                <Icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <p className="font-body text-sm text-foreground font-medium">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
