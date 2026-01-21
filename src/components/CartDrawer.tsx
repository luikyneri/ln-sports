import { useEffect } from "react";
import { X, Plus, Minus, MessageCircle } from "lucide-react";
import { useCart, PERSONALIZATION_PRICE, BASE_PRICE } from "@/hooks/useCart";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void; 
}

export const CartDrawer = ({ isOpen, onClose, onOpen }: CartDrawerProps) => {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCart();

  useEffect(() => {
    const handleOpenSignal = () => { if (onOpen) onOpen(); };
    window.addEventListener("open-cart", handleOpenSignal);
    return () => window.removeEventListener("open-cart", handleOpenSignal);
  }, [onOpen]);

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    let message = "*NOVO PEDIDO - LN SPORTS*\n\n";
    items.forEach((item, index) => {
      const pCamisa = Number(item.shirt.preco) || BASE_PRICE;
      const pTotal = pCamisa + (item.personalization ? PERSONALIZATION_PRICE : 0);
      message += `*${index + 1}. ${item.shirt.time}*\n`;
      message += `Tamanho: ${item.size}\n`;
      if (item.personalization) message += `Personalização: ${item.personalization.name} | Nº ${item.personalization.number}\n`;
      message += `Subtotal: ${formatPrice(pTotal * item.quantity)}\n\n`;
    });
    message += `*TOTAL: ${formatPrice(getTotal())}*`;
    window.open(`https://wa.me/5583996167676?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150]">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#121212] border-l border-white/10 flex flex-col">
        
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#1A1A1A]">
          <span className="font-display text-sm font-black text-white uppercase tracking-widest">Sua Sacola ({items.length})</span>
          <button onClick={onClose} className="text-white"><X /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.map((item) => {
            const pCamisa = Number(item.shirt.preco) || BASE_PRICE;
            const pTotal = pCamisa + (item.personalization ? PERSONALIZATION_PRICE : 0);
            return (
              <div key={item.id} className="flex gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                <img src={item.shirt.imagens[0]} className="w-20 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white uppercase">{item.shirt.time}</h4>
                  
                  {/* EXIBIÇÃO DA PERSONALIZAÇÃO */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-[9px] px-1.5 py-0.5 bg-white/10 text-white rounded font-bold">TAM: {item.size}</span>
                    {item.personalization && (
                      <span className="text-[9px] px-1.5 py-0.5 bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 rounded font-bold uppercase">
                        {item.personalization.name} #{item.personalization.number}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3 bg-black/40 rounded-lg p-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-white"><Minus size={12}/></button>
                      <span className="text-xs font-bold text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-white"><Plus size={12}/></button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#D4AF37]">{formatPrice(pTotal * item.quantity)}</p>
                      <button onClick={() => removeItem(item.id)} className="text-[10px] text-red-500 uppercase font-bold">Remover</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#1A1A1A]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-white/60 text-xs uppercase font-bold">Total do Pedido</span>
              <span className="text-2xl text-[#D4AF37] font-black">{formatPrice(getTotal())}</span>
            </div>
            <button onClick={handleWhatsAppCheckout} className="w-full py-4 bg-[#D4AF37] text-black font-black rounded-xl flex items-center justify-center gap-3">
              <MessageCircle size={20} /> ENVIAR PEDIDO
            </button>
          </div>
        )}
      </div>
    </div>
  );
};