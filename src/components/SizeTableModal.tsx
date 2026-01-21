import { X, Ruler } from "lucide-react";

interface SizeTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeTableModal = ({ isOpen, onClose }: SizeTableModalProps) => {
  if (!isOpen) return null;

  const tables = [
    {
      title: "Versão Fan (Torcedor)",
      description: "Corte padrão, mais folgado no corpo.",
      headers: ["Tam.", "Compr.", "Largura", "Altura", "Peso"],
      data: [
        { t: "P (S)", c: "69-71", l: "53-55", a: "162-170", p: "50-62kg" },
        { t: "M (M)", c: "71-73", l: "55-57", a: "170-176", p: "62-78kg" },
        { t: "G (L)", c: "73-75", l: "57-58", a: "176-182", p: "78-83kg" },
        { t: "GG (XL)", c: "75-78", l: "58-60", a: "182-190", p: "83-90kg" },
        { t: "2XL", c: "78-81", l: "60-62", a: "190-195", p: "90-97kg" },
        { t: "3XL", c: "81-83", l: "62-64", a: "192-197", p: "97-104kg" },
      ]
    },
    {
      title: "Versão Player (Jogador)",
      description: "Corte Slim Fit, bem justa ao corpo.",
      headers: ["Tam.", "Compr.", "Largura", "Altura", "Peso"],
      data: [
        { t: "P (S)", c: "67-69", l: "49-51", a: "162-170", p: "50-62kg" },
        { t: "M (M)", c: "69-71", l: "51-53", a: "170-175", p: "62-75kg" },
        { t: "G (L)", c: "71-73", l: "53-55", a: "175-180", p: "75-80kg" },
        { t: "GG (XL)", c: "73-76", l: "55-57", a: "180-185", p: "80-85kg" },
        { t: "2XL", c: "76-78", l: "57-60", a: "185-190", p: "85-90kg" },
        { t: "3XL", c: "78-79", l: "60-63", a: "190-195", p: "90-95kg" },
      ]
    },
    {
      title: "Versão Feminina",
      description: "Corte babylook acinturado.",
      headers: ["Tam.", "Compr.", "Largura", "Altura", "Peso"],
      data: [
        { t: "P (S)", c: "61-63", l: "40-41", a: "150-160", p: "-" },
        { t: "M (M)", c: "63-66", l: "41-44", a: "160-165", p: "-" },
        { t: "G (L)", c: "66-69", l: "44-47", a: "165-170", p: "-" },
        { t: "GG (XL)", c: "69-71", l: "47-50", a: "170-175", p: "-" },
      ]
    },
    {
      title: "Regatas de Basquete",
      description: "Modelo Silkada Premium.",
      headers: ["Tam.", "Compr.", "Busto", "Ombros", "Peso"],
      data: [
        { t: "P (S)", c: "70", l: "98", a: "35", p: "90-115kg" },
        { t: "M (M)", c: "72", l: "106", a: "37", p: "115-135kg" },
        { t: "G (L)", c: "75", l: "112", a: "39", p: "135-165kg" },
        { t: "GG (XL)", c: "77", l: "120", a: "41", p: "165-185kg" },
        { t: "2XL", c: "80", l: "130", a: "44", p: "180-210kg" },
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-2 sm:p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-[#121212] p-5 border-b border-white/10 flex justify-between items-center z-20">
          <div className="flex items-center gap-3">
            <Ruler className="text-[#D4AF37] w-5 h-5" />
            <h2 className="text-white font-black text-lg uppercase tracking-widest italic">Guia de Medidas LN Sports</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="text-white w-6 h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-12">
          {tables.map((table, idx) => (
            <section key={idx} className="space-y-4">
              <div className="border-l-4 border-[#D4AF37] pl-3">
                <h3 className="text-white font-black uppercase text-base tracking-tighter">{table.title}</h3>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest">{table.description}</p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-white/5 bg-white/[0.02]">
                <table className="w-full text-[10px] sm:text-[11px] text-left">
                  <thead>
                    <tr className="bg-white/5 text-[#D4AF37] border-b border-white/10 uppercase">
                      {table.headers.map(h => <th key={h} className="p-3 font-bold">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300 font-medium">
                    {table.data.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-white/[0.03] transition-colors">
                        <td className="p-3 font-bold text-white whitespace-nowrap">{row.t}</td>
                        <td className="p-3">{row.c} cm</td>
                        <td className="p-3">{row.l} cm</td>
                        <td className="p-3">{row.a} cm</td>
                        <td className="p-3 text-[#D4AF37] whitespace-nowrap">{row.p}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}

          <div className="p-4 rounded-xl border border-white/5 bg-white/5 text-center">
            <p className="text-gray-500 text-[9px] uppercase tracking-widest leading-relaxed">
              * Medidas aproximadas (margem de erro de 1 a 3 cm). <br />
              * Recomendamos comparar com uma peça que você já possui.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};