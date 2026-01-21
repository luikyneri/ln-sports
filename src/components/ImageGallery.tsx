import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export const ImageGallery = ({ images, alt }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({ backgroundImage: '', backgroundPosition: '0% 0%', display: 'none' });
  const containerRef = useRef<HTMLDivElement>(null);

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleMouseLeave();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleMouseLeave();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${images[currentIndex]})`,
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle(prev => ({ ...prev, display: 'none' }));
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-[#1A1A1A] group rounded-xl border border-white/5 shadow-2xl">
      <div 
        ref={containerRef}
        className="w-full h-full cursor-zoom-in relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${alt} - Foto ${currentIndex + 1}`}
          className="w-full h-full object-cover animate-fade-in"
          loading="lazy"
        />
        <div 
          className="absolute inset-0 z-10 pointer-events-none hidden md:block bg-no-repeat"
          style={{ ...zoomStyle, backgroundSize: '250%' }}
        />
      </div>

      {images.length > 1 && (
        <>
          <button onClick={goToPrevious} className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 flex items-center justify-center bg-black/60 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-[#D4AF37] hover:text-black text-white">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={goToNext} className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 flex items-center justify-center bg-black/60 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-[#D4AF37] hover:text-black text-white">
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
          {images.map((_, index) => (
            <div key={index} className={`h-1 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-[#D4AF37] w-6' : 'bg-white/30 w-2'}`} />
          ))}
        </div>
      )}
    </div>
  );
};