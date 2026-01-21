import { useState } from "react";
import { ShoppingCart, Search } from "lucide-react";
import { ImageGallery } from "./ImageGallery";
import { AddToCartModal } from "./AddToCartModal";
import { BASE_PRICE } from "@/hooks/useCart";

// Interface baseada nos dados do seu Firebase
interface FirebaseShirt {
  id: string;
  time: string;
  modelo: string;
  preco: number;
  imagens: string[];
  liga?: string;
}

interface ShirtCardProps {
  shirt: FirebaseShirt;
  index: number;
}

export const ShirtCard = ({ shirt, index }: ShirtCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleOpenCart = () => {
    const event = new CustomEvent("open-cart");
    window.dispatchEvent(event);
  };

  return (
    <>
      <article
        className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500 animate-fade-in shadow-sm hover:shadow-xl hover:shadow-[#D4AF37]/5"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Clique na imagem abre o Modal de seleção */}
        <div 
          className="relative overflow-hidden cursor-zoom-in"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="transition-transform duration-700 group-hover:scale-110">
            <ImageGallery 
              images={shirt.imagens} 
              alt={`${shirt.time} - ${shirt.modelo}`} 
            />
          </div>
          
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/20">
              <Search className="text-white w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-grow p-4 gap-3 bg-gradient-to-b from-card to-secondary/10">
          <div className="flex-grow">
            <h3 className="font-display text-sm md:text-base font-bold text-foreground leading-tight uppercase tracking-tight group-hover:text-[#D4AF37] transition-colors">
              {shirt.time}
            </h3>
            <p className="text-[10px] md:text-xs text-muted-foreground mt-1 tracking-widest font-body uppercase opacity-80">
              {shirt.modelo}
            </p>
            <div className="flex items-center justify-between mt-3">
               <p className="text-lg md:text-xl text-[#D4AF37] font-bold font-display">
                {formatPrice(shirt.preco || BASE_PRICE)}
              </p>
            </div>
          </div>

          {/* ÚNICA AÇÃO: Abrir Modal para escolher tamanho e adicionar ao carrinho */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-3 px-4 bg-[#D4AF37] text-black text-[10px] md:text-xs uppercase tracking-[0.2em] font-black rounded-lg hover:bg-yellow-500 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-900/10"
          >
            <ShoppingCart size={14} strokeWidth={3} />
            <span>Comprar</span>
          </button>
        </div>
      </article>

      <AddToCartModal 
        shirt={shirt as any}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOpenCart={handleOpenCart}
      />
    </>
  );
};