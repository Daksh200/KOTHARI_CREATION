import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Volume2, MessageSquare } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/products";

type Reel = { id: string; src: string; title?: string; productName?: string; productId?: string };

const sampleReels: Reel[] = [
  { id: "r1", src: "/videos/reel-dvko.mp4", title: "Maroon Royal Embroidered Kurti", productName: "Maroon Royal Embroidered Kurti", productId: "kc-001" },
  { id: "r2", src: "/videos/reel-duga.mp4", title: "Emerald Zari Embroidered Kurti", productName: "Emerald Zari Embroidered Kurti", productId: "kc-003" },
];

function useOnScreen<T extends Element>(ref: React.RefObject<T>, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), { root: null, rootMargin, threshold: 0.6 });
    obs.observe(node);
    return () => obs.disconnect();
  }, [ref, rootMargin]);
  return isIntersecting;
}

function VideoCard({ reel }: { reel: Reel }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isVisible = useOnScreen(ref, "-10% 0px -10% 0px");
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isVisible) {
      v.muted = muted;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [isVisible, muted]);

  return (
    <section ref={ref} className="h-[85vh] snap-center flex items-center justify-center bg-transparent overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center bg-black">
        <video
          ref={videoRef}
          src={reel.src}
          className="max-h-full w-auto max-w-full object-contain"
          playsInline
          loop
          muted={muted}
          preload="auto"
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            setMuted((m) => !m);
            if (videoRef.current) videoRef.current.muted = !muted;
          }}
          className="absolute left-3 bottom-3 bg-black/60 backdrop-blur-sm text-white rounded-full p-2 flex items-center justify-center shadow-lg hover:scale-105 transition-all z-30"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          <Volume2 className={`w-5 h-5 ${muted ? 'opacity-70' : ''}`} />
        </button>

        <a
          href={getWhatsAppUrl(reel.productName, reel.productId, typeof window !== 'undefined' ? `${window.location.origin}/product/${reel.productId}` : '')}
          target="_blank"
          rel="noreferrer"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white w-11 h-11 rounded-full flex items-center justify-center shadow-lg z-30"
          aria-label={`Inquire ${reel.productName || 'product'}`}
        >
          <MessageSquare className="w-5 h-5" />
        </a>

        {reel.title && (
          <div className="absolute left-4 bottom-6 bg-gradient-to-r from-black/70 via-black/50 to-transparent text-white px-3 py-1 rounded text-sm z-20 max-w-[85%] truncate">
            {reel.title}
          </div>
        )}
      </div>
    </section>
  );
}

export default function LiveShowroom() {
  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <header className="w-full py-3 px-4 md:px-8 flex items-center gap-4 border-b border-white/5 bg-transparent">
        <a href="/" className="flex items-center gap-3 text-white/90">
          <ArrowLeft className="w-6 h-6" />
          <span className="hidden sm:inline font-semibold">Back</span>
        </a>
        <h1 className="mx-auto text-lg font-bold">Live Showroom</h1>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <div className="w-full md:w-[720px] lg:w-[920px] h-[85vh] bg-black/80 rounded-2xl overflow-hidden shadow-2xl border border-white/5">
            <div className="h-full snap-y snap-mandatory overflow-y-auto scrollbar-hide">
              {sampleReels.map((r) => (
                <VideoCard key={r.id} reel={r} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
