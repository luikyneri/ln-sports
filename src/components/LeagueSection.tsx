import { ChevronRight } from "lucide-react";
import { League, Team } from "@/data/shirts";
import { TeamBadge } from "./TeamBadge";

interface LeagueSectionProps {
  league: League;
  teams: Team[];
  onTeamClick: (team: Team) => void;
  isExpanded: boolean;
  onToggle: () => void;
}

export const LeagueSection = ({ league, teams, onTeamClick, isExpanded, onToggle }: LeagueSectionProps) => {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card/50 mb-4 transition-all hover:border-gold/30">
      {/* Header Simples e Direto */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-5 hover:bg-card/80 transition-colors"
      >
        <ChevronRight 
          className={`w-5 h-5 text-gold transition-transform duration-300 ${
            isExpanded ? 'rotate-90' : ''
          }`} 
        />
        <div className="flex flex-col items-start text-left">
          <h2 className="font-display text-lg md:text-xl font-bold text-gold uppercase tracking-widest">
            {league.name}
          </h2>
          <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-body opacity-70">
            {league.subtitle}
          </span>
        </div>
      </button>

      {/* Grid de Times */}
      {isExpanded && (
        <div className="p-4 pt-2 border-t border-border bg-black/10">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
            {teams.map((team) => (
              <TeamBadge key={team.id} team={team} onClick={onTeamClick} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};