import { useState } from "react";
import { X, Check, Search, Ruler } from "lucide-react"; // Importamos o ícone Ruler
import { Shirt } from "@/data/shirts";
import { useCart } from "@/hooks/useCart";
import { ImageGallery } from "./ImageGallery";
import { SizeTableModal } from "./SizeTableModal"; // Importamos o novo modal

interface AddToCartModalProps {
  shirt: Shirt;
  isOpen: boolean;
  onClose: () => void;
  onOpenCart?: () => void;
}

const SIZES = ["P", "M", "G", "GG", "XGG"];

export const AddToCartModal = ({ shirt, isOpen, onClose, onOpenCart }: AddToCartModalProps) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [wantsPersonalization, setWantsPersonalization] = useState(false);
  const [personalizationName, setPersonalizationName] = useState("");
  const [personalizationNumber, setPersonalizationNumber] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  
  // ESTADO PARA A TABELA DE MEDIDAS
  const [showSizeTable, setShowSizeTable] = useState(false);
  
  const { addItem } = useCart();

  if (!isOpen) return null;

  const handleClose = () => {
    setShowSuccess(false);
    setSelectedSize("");
    setWantsPersonalization(false);
    setPersonalizationName("");
    setPersonalizationNumber("");
    onClose();
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem({
      shirt,
      size: selectedSize,
      quantity: 1,
      personalization: wantsPersonalization && personalizationName && personalizationNumber
        ? { name: personalizationName.trim(), number: personalizationNumber.trim() }
        : undefined,
    });
    setShowSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md" onClick={handleClose} />
      
      <div className="relative bg-[#1A1A1A] border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto z-[101] animate-in fade-in zoom-in duration-300">
        
        {/* TELA DE SUCESSO */}
        {showSuccess && (
          <div className="absolute inset-0 bg-[#1A1A1A] z-50 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mb-6">
              <Check className="w-10 h-10 text-black" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tighter">Adicionado!</h3>
            <div className="flex flex-col gap-3 w-full max-w-xs mt-4">
              <button onClick={() => { handleClose(); if (onOpenCart) onOpenCart(); }} className="w-full py-4 bg-[#D4AF37] text-black font-black uppercase rounded-xl">Finalizar Pedido</button>
              <button onClick={handleClose} className="w-full py-4 bg-white/5 text-white font-bold uppercase rounded-xl border border-white/10">Continuar Comprando</button>
            </div>
          </div>
        )}

        {/* HEADER */}
        <div className="sticky top-0 bg-[#1A1A1A]/80 backdrop-blur-lg p-4 border-b border-white/10 flex justify-between items-center z-10">
          <span className="text-[#D4AF37] font-black text-xs uppercase tracking-widest">Detalhes do Produto</span>
          <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full"><X className="text-white" /></button>
        </div>

        <div className="p-4 space-y-6">
          <ImageGallery images={shirt.imagens} alt={shirt.time} />

          <div className="text-center">
            <h2 className="text-2xl font-black text-white uppercase">{shirt.time}</h2>
            <p className="text-xs text-[#D4AF37] tracking-[0.3em] font-light uppercase">{shirt.modelo}</p>
          </div>

          {/* SEÇÃO DE TAMANHOS COM LINK PARA TABELA */}
          <div className="space-y-4">
            <div className="flex justify-between items-end px-2">
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Escolha o tamanho</p>
              
              {/* BOTÃO QUE ABRE O GUIA DE MEDIDAS */}
              <button 
                onClick={() => setShowSizeTable(true)}
                className="flex items-center gap-1.5 text-[#D4AF37] text-[10px] font-bold uppercase hover:underline"
              >
                <Ruler size={12} /> Guia de Medidas
              </button>
            </div>

            <div className="flex justify-center gap-3">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-14 rounded-xl border-2 font-bold transition-all ${
                    selectedSize === size ? "border-[#D4AF37] bg-[#D4AF37] text-black scale-110" : "border-white/10 text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* PERSONALIZAÇÃO */}
          <div className={`p-4 rounded-xl border transition-all ${wantsPersonalization ? "border-[#D4AF37] bg-[#D4AF37]/5" : "border-white/10 bg-white/5"}`}>
            <label className="flex items-center gap-3 cursor-pointer" onClick={() => setWantsPersonalization(!wantsPersonalization)}>
              <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${wantsPersonalization ? "bg-[#D4AF37] border-[#D4AF37]" : "border-white/20"}`}>
                {wantsPersonalization && <Check size={14} className="text-black" />}
              </div>
              <span className="text-sm font-bold text-white">Adicionar Nome e Número</span>
            </label>
            {wantsPersonalization && (
              <div className="grid grid-cols-2 gap-3 mt-4">
                <input type="text" placeholder="NOME" value={personalizationName} onChange={(e) => setPersonalizationName(e.target.value.toUpperCase())} className="bg-black border border-white/10 p-3 rounded-lg text-white text-sm outline-none focus:border-[#D4AF37]" />
                <input type="text" placeholder="Nº" value={personalizationNumber} onChange={(e) => setPersonalizationNumber(e.target.value.replace(/\D/g, ""))} className="bg-black border border-white/10 p-3 rounded-lg text-white text-sm text-center outline-none focus:border-[#D4AF37]" />
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className={`w-full py-5 rounded-xl font-black uppercase tracking-widest transition-all ${
              selectedSize ? "bg-[#D4AF37] text-black" : "bg-white/5 text-white/20"
            }`}
          >
            {selectedSize ? "Colocar na Sacola" : "Selecione o Tamanho"}
          </button>
        </div>
      </div>

      {/* COMPONENTE DA TABELA QUE FICA ESCONDIDO ATÉ O CLIQUE */}
      <SizeTableModal 
        isOpen={showSizeTable} 
        onClose={() => setShowSizeTable(false)} 
      />
    </div>
  );
};