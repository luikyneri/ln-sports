import { useState, useEffect, useMemo } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore"; // Trocado getDocs por onSnapshot
import { LeagueSection } from "./LeagueSection";
import { ShirtCard } from "./ShirtCard";
import { ArrowLeft, Search } from "lucide-react";

export const ShirtCatalog = () => {
  const [selectedTeam, setSelectedTeam] = useState<any | null>(null);
  const [shirts, setShirts] = useState<any[]>([]);
  const [leagues, setLeagues] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedLeagues, setExpandedLeagues] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // 1. Escuta LIGAS em Tempo Real
    const unsubLeagues = onSnapshot(collection(db, "LIGAS"), (snap) => {
      const leaguesData = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      const sorted = (leaguesData as any[]).sort((a, b) => (a.order || 0) - (b.order || 0));
      setLeagues(sorted);
      // Mantém as ligas expandidas automaticamente ao carregar
      setExpandedLeagues(sorted.map(l => l.id));
    });

    // 2. Escuta TIMES em Tempo Real
    const unsubTeams = onSnapshot(collection(db, "TIMES"), (snap) => {
      setTeams(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // 3. Escuta CAMISAS em Tempo Real
    const unsubShirts = onSnapshot(collection(db, "CAMISAS"), (snap) => {
      setShirts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });

    // Limpeza dos ouvintes ao fechar o componente
    return () => {
      unsubLeagues();
      unsubTeams();
      unsubShirts();
    };
  }, []);

  // FILTRO DE CAMISAS (Ultra-sensível ao estado atualizado)
  const filteredShirts = useMemo(() => {
    if (!selectedTeam) return [];
    
    return shirts.filter((shirt) => {
      const shirtTeamName = String(shirt.time || "").toLowerCase().trim();
      const selectedTeamName = String(selectedTeam.name || "").toLowerCase().trim();
      const isFromTeam = shirtTeamName === selectedTeamName;

      const matchesSearch = shirt.modelo?.toLowerCase().includes(searchTerm.toLowerCase());
      return isFromTeam && matchesSearch;
    });
  }, [selectedTeam, shirts, searchTerm]);

  const handleTeamClick = (team: any) => {
    setSelectedTeam(team);
    window.scrollTo(0, 0);
  };

  const handleBackClick = () => {
    setSelectedTeam(null);
    setSearchTerm("");
  };

  const toggleLeague = (leagueId: string) => {
    setExpandedLeagues(prev => 
      prev.includes(leagueId) ? prev.filter(id => id !== leagueId) : [...prev, leagueId]
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37]"></div>
        <p className="mt-4 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Sincronizando LN Sports...</p>
      </div>
    );
  }

  if (selectedTeam) {
    return (
      <section className="w-full py-6 md:py-10 animate-in fade-in duration-500">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <button onClick={handleBackClick} className="flex items-center gap-2 text-slate-400 hover:text-[#D4AF37] group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Voltar</span>
            </button>
            
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" />
              <input 
                type="text"
                placeholder="BUSCAR MODELO..."
                className="w-full bg-slate-900/50 border border-slate-800 rounded-full py-2 pl-9 pr-4 text-[10px] font-bold text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8 border-l-4 border-[#D4AF37] pl-4">
            {selectedTeam.badge && (
              <img src={selectedTeam.badge} alt={selectedTeam.name} className="w-16 h-16 object-contain" />
            )}
            <div>
              <h2 className="text-2xl font-black italic uppercase text-foreground tracking-tighter">
                {selectedTeam.name}
              </h2>
              <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">
                {filteredShirts.length} Itens em estoque
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-5xl">
            {filteredShirts.map((shirt, index) => (
              <ShirtCard 
                key={shirt.id} 
                index={index}
                shirt={{ ...shirt, preco: Number(shirt.preco) } as any} 
              />
            ))}
          </div>

          {filteredShirts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Nenhuma camisa disponível para este time no momento.</p>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-6 md:py-10 animate-in fade-in">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {leagues.map((league) => (
            <LeagueSection
              key={league.id}
              league={league}
              teams={teams.filter(t => {
                const tLeague = String(t.league || "").trim();
                const lId = String(league.id || "").trim();
                const lName = String(league.name || "").trim();
                return tLeague === lId || tLeague === lName;
              })}
              onTeamClick={handleTeamClick}
              isExpanded={expandedLeagues.includes(league.id)}
              onToggle={() => toggleLeague(league.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};