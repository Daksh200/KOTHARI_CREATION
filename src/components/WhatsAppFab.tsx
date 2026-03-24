import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/products";

export default function WhatsAppFab() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-whatsapp flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 text-primary-foreground" />
        </a>
      </motion.div>
    </div>
  );
}
