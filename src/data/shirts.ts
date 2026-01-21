// 1. Interfaces de Dados
export interface Shirt {
  id: string;
  liga: string;
  time: string;
  modelo: string;
  imagens: string[];
  escudo?: string;
}

export interface League {
  id: string;
  name: string;
  subtitle: string;
  watermark?: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  league: string;
}

// 2. LIGAS NA SEQUÊNCIA EXATA PEDIDA (Atualizado com links PNG)
export const leagues: League[] = [
  { 
    id: "fifa", 
    name: "Mundo FIFA", 
    subtitle: "Seleções Nacionais", 
    watermark: "https://cdn-icons-png.flaticon.com/512/824/824727.png"
  },
  { 
    id: "brasileirao", 
    name: "BRASILEIRÃO", 
    subtitle: "Campeonato Brasileiro", 
    watermark: "https://upload.wikimedia.org/wikipedia/pt/f/f4/Logotipo_S%C3%A9rie_A_2024.png" 
  },
  { 
    id: "premier-league", 
    name: "PREMIER LEAGUE", 
    subtitle: "Campeonato Inglês", 
    watermark: "https://vagasdeemprego.top/wp-content/uploads/2024/02/Premier-League-Logo-White.png" 
  },
  { 
    id: "la-liga", 
    name: "LA LIGA", 
    subtitle: "Campeonato Espanhol", 
    watermark: "https://upload.wikimedia.org/wikipedia/commons/0/0f/LALIGA_Logotipo_2023.png" 
  },
  { 
    id: "bundesliga", 
    name: "BUNDESLIGA", 
    subtitle: "Campeonato Alemão", 
    watermark: "https://upload.wikimedia.org/wikipedia/en/d/df/Bundesliga_logo_%282017%29.svg" 
  },
  { 
    id: "ligue-1", 
    name: "LIGUE 1", 
    subtitle: "Campeonato Francês", 
    watermark: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Ligue1_McDonald%27s_logo.png" 
  },
  { 
    id: "serie-a", 
    name: "SERIE A", 
    subtitle: "Campeonato Italiano", 
    watermark: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Serie_A_logo_2022.svg" 
  },
  { 
    id: "outros", 
    name: "OUTROS TIMES", 
    subtitle: "Clubes do Mundo", 
    watermark: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Football_world_map.svg" 
  },
  { 
    id: "retro", 
    name: "RETRO", 
    subtitle: "Clássicos Eternos", 
    watermark: "https://www.svgrepo.com/show/475143/star.svg" 
  },
  { 
    id: "nba", 
    name: "NBA", 
    subtitle: "Basquete Americano", 
    watermark: "https://upload.wikimedia.org/wikipedia/en/0/03/National_Basketball_Association_logo.svg" 
  },
];

// 3. IMPORTAÇÃO DE IMAGENS (Mantenha seus caminhos originais)
import realMadridHome from "@/assets/shirts/real-madrid-home.jpg";
import manchesterUnitedHome from "@/assets/shirts/manchester-united-home.jpg";
import flamengoHome from "@/assets/shirts/flamengo-home.jpg";
import juventusAway from "@/assets/shirts/juventus-away.jpg";
import barcelonaHome from "@/assets/shirts/barcelona-home.jpg";
import liverpoolThird from "@/assets/shirts/liverpool-third.jpg";
import brasilRetro from "@/assets/shirts/brasil-retro.jpg";
import palmeirasHome from "@/assets/shirts/palmeiras-home.jpg";

// 4. TIMES ORGANIZADOS POR LIGA
export const teams: Team[] = [
  // Mundo FIFA
  { id: "brasil", name: "Brasil", shortName: "BRASIL", badge: "https://media.api-sports.io/football/teams/6.png", league: "fifa" },
  { id: "argentina", name: "Argentina", shortName: "ARGENTINA", badge: "https://media.api-sports.io/football/teams/26.png", league: "fifa" },
  { id: "franca", name: "França", shortName: "FRANÇA", badge: "https://media.api-sports.io/football/teams/2.png", league: "fifa" },
  { id: "portugal", name: "Portugal", shortName: "PORTUGAL", badge: "https://media.api-sports.io/football/teams/27.png", league: "fifa" },

  // Brasileirão
  { id: "flamengo", name: "Flamengo", shortName: "FLAMENGO", badge: "https://media.api-sports.io/football/teams/127.png", league: "brasileirao" },
  { id: "palmeiras", name: "Palmeiras", shortName: "PALMEIRAS", badge: "https://media.api-sports.io/football/teams/121.png", league: "brasileirao" },
  { id: "corinthians", name: "Corinthians", shortName: "CORINTHIANS", badge: "https://media.api-sports.io/football/teams/131.png", league: "brasileirao" },
  { id: "sao-paulo", name: "São Paulo", shortName: "SÃO PAULO", badge: "https://media.api-sports.io/football/teams/126.png", league: "brasileirao" },
  { id: "botafogo", name: "Botafogo", shortName: "BOTAFOGO", badge: "https://media.api-sports.io/football/teams/120.png", league: "brasileirao" },

  // Premier League
  { id: "manchester-united", name: "Manchester United", shortName: "M. UNITED", badge: "https://media.api-sports.io/football/teams/33.png", league: "premier-league" },
  { id: "liverpool", name: "Liverpool", shortName: "LIVERPOOL", badge: "https://media.api-sports.io/football/teams/40.png", league: "premier-league" },
  { id: "manchester-city", name: "Manchester City", shortName: "M. CITY", badge: "https://media.api-sports.io/football/teams/50.png", league: "premier-league" },
  { id: "arsenal", name: "Arsenal", shortName: "ARSENAL", badge: "https://media.api-sports.io/football/teams/42.png", league: "premier-league" },

  // La Liga
  { id: "real-madrid", name: "Real Madrid", shortName: "REAL MADRID", badge: "https://media.api-sports.io/football/teams/541.png", league: "la-liga" },
  { id: "barcelona", name: "Barcelona", shortName: "BARCELONA", badge: "https://media.api-sports.io/football/teams/529.png", league: "la-liga" },

  // Bundesliga
  { id: "bayern", name: "Bayern de Munique", shortName: "BAYERN", badge: "https://media.api-sports.io/football/teams/157.png", league: "bundesliga" },
  { id: "borussia", name: "Borussia Dortmund", shortName: "BORUSSIA", badge: "https://media.api-sports.io/football/teams/165.png", league: "bundesliga" },

  // Ligue 1
  { id: "psg", name: "PSG", shortName: "PSG", badge: "https://media.api-sports.io/football/teams/85.png", league: "ligue-1" },

  // Serie A
  { id: "juventus", name: "Juventus", shortName: "JUVENTUS", badge: "https://media.api-sports.io/football/teams/496.png", league: "serie-a" },
  { id: "inter-milan", name: "Inter de Milão", shortName: "INTER", badge: "https://media.api-sports.io/football/teams/505.png", league: "serie-a" },
  { id: "ac-milan", name: "AC Milan", shortName: "MILAN", badge: "https://media.api-sports.io/football/teams/489.png", league: "serie-a" },

  // Outros Times
  { id: "al-nassr", name: "Al-Nassr", shortName: "AL-NASSR", badge: "https://media.api-sports.io/football/teams/2939.png", league: "outros" },
  { id: "inter-miami", name: "Inter Miami", shortName: "I. MIAMI", badge: "https://media.api-sports.io/football/teams/9568.png", league: "outros" },

  // Retro
  { id: "brasil-retro", name: "Brasil Retro", shortName: "BRASIL", badge: "https://media.api-sports.io/football/teams/6.png", league: "retro" },

  // NBA
  { id: "lakers", name: "LA Lakers", shortName: "LAKERS", badge: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg", league: "nba" },
  { id: "bulls", name: "Chicago Bulls", shortName: "BULLS", badge: "https://upload.wikimedia.org/wikipedia/en/6/67/Chicago_Bulls_logo.svg", league: "nba" },
];

// 5. VITRINE DE PRODUTOS (Shirts)
export const shirts: Shirt[] = [
  { id: "1", liga: "la-liga", time: "Real Madrid", modelo: "Home 25/26", imagens: [realMadridHome] },
  { id: "2", liga: "premier-league", time: "Manchester United", modelo: "Home 25/26", imagens: [manchesterUnitedHome] },
  { id: "3", liga: "brasileirao", time: "Flamengo", modelo: "Home 25/26", imagens: [flamengoHome] },
  { id: "4", liga: "serie-a", time: "Juventus", modelo: "Away 25/26", imagens: [juventusAway] },
  { id: "5", liga: "la-liga", time: "Barcelona", modelo: "Home 25/26", imagens: [barcelonaHome] },
  { id: "6", liga: "premier-league", time: "Liverpool", modelo: "Third 25/26", imagens: [liverpoolThird] },
  { id: "7", liga: "retro", time: "Brasil", modelo: "1970", imagens: [brasilRetro] },
  { id: "8", liga: "brasileirao", time: "Palmeiras", modelo: "Home 25/26", imagens: [palmeirasHome] }
];