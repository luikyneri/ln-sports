import { useState, useEffect } from "react";
import { Menu, ShoppingCart, X, Ruler, Sparkles, Instagram } from "lucide-react";
import logoTransparent from "@/assets/logo-transparent.png";
import { useCart } from "@/hooks/useCart";
import { CartDrawer } from "./CartDrawer";
import { SizeTableModal } from "./SizeTableModal";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSizeTableOpen, setIsSizeTableOpen] = useState(false);
  const { items } = useCart();
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // ESCUTA O SINAL DO BOTÃO FINALIZAR (DO MODAL)
  useEffect(() => {
    const handleOpenCart = () => {
      setIsCartOpen(true);
      setIsMenuOpen(false);
    };

    window.addEventListener("open-cart", handleOpenCart);
    return () => window.removeEventListener("open-cart", handleOpenCart);
  }, []);

  const handleSizeTableClick = () => {
    setIsMenuOpen(false);
    setIsSizeTableOpen(true);
  };

  return (
    <>
      <header className="w-full py-4 md:py-6 border-b border-[#D4AF37]/20 bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-card rounded-lg transition-colors"
            aria-label="Abrir menu"
          >
            <Menu className="w-6 h-6 text-[#D4AF37]" />
          </button>

          {/* Logo */}
          <img 
            src={logoTransparent} 
            alt="LN Sports" 
            className="h-10 md:h-14 lg:h-16 w-auto object-contain"
          />

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 hover:bg-card rounded-lg transition-colors relative"
            aria-label="Abrir carrinho"
          >
            <ShoppingCart className="w-6 h-6 text-[#D4AF37]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-black text-[10px] font-black rounded-full flex items-center justify-center animate-in zoom-in">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Side Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60]">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-[#1A1A1A] border-r border-white/10 shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#111]">
              <span className="font-display text-xs font-black text-[#D4AF37] uppercase tracking-[0.2em]">LN SPORTS - MENU</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <nav className="p-4 space-y-3">
              <button
                onClick={handleSizeTableClick}
                className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-xl transition-all text-white w-full text-left group border border-transparent hover:border-white/5"
              >
                <Ruler className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                <span className="font-body text-xs font-bold uppercase tracking-widest">Tabela de Medidas</span>
              </button>
              
              <a
                href="https://www.instagram.com/lnsportsmantos/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-xl transition-all text-white group border border-transparent hover:border-white/5"
                onClick={() => setIsMenuOpen(false)}
              >
                <Instagram className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                <div className="flex flex-col">
                  <span className="font-body text-xs font-bold uppercase tracking-widest">Nosso Instagram</span>
                  <span className="text-[10px] text-[#D4AF37]/60 font-mono">@lnsportsmantos</span>
                </div>
              </a>
            </nav>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onOpen={() => setIsCartOpen(true)}
      />

      {/* Size Table Modal */}
      <SizeTableModal isOpen={isSizeTableOpen} onClose={() => setIsSizeTableOpen(false)} />
    </>
  );
};