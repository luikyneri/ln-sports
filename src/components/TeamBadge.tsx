import { Team } from "@/data/shirts";

interface TeamBadgeProps {
  team: Team;
  onClick: (team: Team) => void;
}

export const TeamBadge = ({ team, onClick }: TeamBadgeProps) => {
  return (
    <button
      onClick={() => onClick(team)}
      className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-card transition-colors group"
    >
      <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
        <img
          src={team.badge}
          alt={team.name}
          className="w-full h-full object-contain filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <span className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wide text-center leading-tight group-hover:text-foreground transition-colors">
        {team.shortName}
      </span>
    </button>
  );
};
