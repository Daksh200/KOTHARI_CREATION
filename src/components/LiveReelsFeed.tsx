import React, { useEffect, useRef, useState } from "react";
import { Volume2, MessageSquare } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/products";

type ReelItem = {
  id: string;
  title?: string;
  src: string; // mp4 url
  productName?: string;
  productId?: string;
};

const sampleFeed: ReelItem[] = [
  {
    id: "r1",
    title: "Reel DVkoC8HAYjw",
    src: "/videos/reel-dvko.mp4",
    productName: "Maroon Royal Embroidered Kurti",
    productId: "kc-001",
  },
  {
    id: "r2",
    title: "Reel DU-ga3cAdg7",
    src: "/videos/reel-duga.mp4",
    productName: "Emerald Zari Embroidered Kurti",
    productId: "kc-003",
  },
];

function useOnScreen<T extends Element>(ref: React.RefObject<T>, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { root: null, rootMargin, threshold: 0.6 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isIntersecting;
}

interface VideoCardProps {
  item: ReelItem;
  fullscreen?: boolean;
}

function VideoCard({ item, fullscreen }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(containerRef, "-10% 0px -10% 0px");
  const [muted, setMuted] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isVisible) {
      v.muted = muted;
      v.play().catch(() => {
        // autoplay might be blocked; leave paused
      });
    } else {
      v.pause();
    }
  }, [isVisible, muted]);

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMuted((m) => !m);
    if (videoRef.current) {
      videoRef.current.muted = !muted;
    }
  };

  const buildWhatsAppLink = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const productUrl = item.productId ? `${origin}/product/${item.productId}` : "";
    return getWhatsAppUrl(item.productName, item.productId, productUrl);
  };

  return (
    <div
      ref={containerRef}
className="snap-start flex-shrink-0 w-full h-screen flex items-center justify-center bg-[#000] overflow-hidden relative rounded-none"
    >
      <video
        ref={videoRef}
        className="w-auto h-full max-h-full max-w-full object-contain mx-auto"
        playsInline
        muted={muted}
        loop
        onLoadedData={() => setLoaded(true)}
        preload="metadata"
        controls={false}
        src={item.src}
      />

      <button
        onClick={handleToggleMute}
        className="absolute left-4 bottom-20 bg-black/70 backdrop-blur-sm text-white rounded-full p-4 flex items-center gap-2 shadow-2xl hover:scale-110 transition-all z-30"
        aria-label={muted ? "Unmute" : "Mute"}
      >
        <Volume2 className={`w-5 h-5 ${muted ? 'opacity-50' : ''}`} />
      </button>

      <a
        href={buildWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-4 bottom-20 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-2xl hover:scale-110 transition-all z-30 font-semibold"
        aria-label="Inquire via WhatsApp"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="text-sm">WhatsApp</span>
      </a>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-1 rounded-full text-xs z-20">
        {item.title}
      </div>
    </div>
  );
}

export default function LiveReelsFeed({ feed = sampleFeed }: { feed?: ReelItem[] }) {
  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      <div className="h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide">
        {feed.map((item) => (
          <VideoCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

