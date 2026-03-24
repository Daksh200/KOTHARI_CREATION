import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Heart, MessageCircle, Share2, Volume2, Music, ArrowLeft, MoreVertical } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

type Reel = {
  id: string;
  src: string;
};

const reels: Reel[] = [
  { id: '1', src: '/videos/reel-dvko.mp4' },
  { id: '2', src: '/videos/reel-duga.mp4' },
];

const InstagramReels: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const goToNext = useCallback(() => setCurrentIndex((prev) => (prev + 1) % reels.length), []);
  const goToPrev = useCallback(() => setCurrentIndex((prev) => (prev - 1 + reels.length) % reels.length), []);

  const handlers = useSwipeable({
    onSwipedUp: goToNext,
    onSwipedDown: goToPrev,
    trackMouse: true,
  });

  useEffect(() => {
    const video = videoRefs.current[currentIndex];
    if (video) {
      video.currentTime = 0;
      video.muted = isMuted;
      video.play().catch(console.error);
    }
    // Pause others
    videoRefs.current.forEach((v, i) => i !== currentIndex && v?.pause());
  }, [currentIndex, isMuted]);

  const toggleMute = () => setIsMuted((prev) => !prev);

  const whatsappUrl = `https://wa.me/917829395699?text=Hi! Interested in your reels collection. Please share wholesale catalog.`;

  return (
    <div {...handlers} className="fixed inset-0 h-screen w-screen bg-black overflow-hidden">
      {/* Top Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-40">
        <ArrowLeft className="w-8 h-8 text-white p-2 rounded-full bg-black/30 cursor-pointer hover:bg-black/50 transition-all" />
        <div className="text-white font-bold text-xl mx-auto">Reels</div>
        <MoreVertical className="w-8 h-8 text-white p-2 rounded-full bg-black/30 cursor-pointer hover:bg-black/50 transition-all" />
      </div>

      {/* Reels Container */}
      <div className="h-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide">
        {reels.map((reel, index) => (
          <section key={reel.id} className="h-screen snap-center relative flex items-center justify-center">
            <video
              ref={(el) => { videoRefs.current[index] = el; }}
              className="w-auto h-[95%] max-w-full object-contain mx-auto"
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              src={reel.src}
            />
            <Music className="absolute top-32 left-8 w-12 h-12 text-white/80 rotate-[-15deg]" />
          </section>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-24 left-6 right-6 flex justify-between items-center z-40">
        <div className="flex gap-3">
          {reels.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-8 bg-white scale-110' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-6">
          <Heart className="w-12 h-12 text-white cursor-pointer p-3 rounded-full bg-black/30 hover:bg-white/20 hover:scale-110 transition-all duration-200" />
          <MessageCircle className="w-12 h-12 text-white cursor-pointer p-3 rounded-full bg-black/30 hover:bg-white/20 hover:scale-110 transition-all duration-200" />
          <Share2 className="w-12 h-12 text-white cursor-pointer p-3 rounded-full bg-black/30 hover:bg-white/20 hover:scale-110 transition-all duration-200" />
        </div>
      </div>

      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        className="absolute bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 shadow-2xl w-16 h-16 rounded-full flex items-center justify-center text-white font-bold transition-all hover:scale-110 active:scale-95"
      >
        WA
      </a>

      {/* Mute */}
      <button
        onClick={toggleMute}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-40 bg-black/50 backdrop-blur-md rounded-full p-4 hover:bg-black/70 transition-all hover:scale-110"
      >
        <Volume2 className={`w-8 h-8 text-white ${isMuted ? 'opacity-60' : ''}`} />
      </button>
    </div>
  );
};

export default InstagramReels;

