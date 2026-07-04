export type LeaderboardRow = {
  rank: number;
  username: string;
  points: number;
  game: 'Free Fire' | 'BGMI';
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

const rows: LeaderboardRow[] = [
  { rank: 1, username: 'NeonViper', points: 1840, game: 'Free Fire' },
  { rank: 2, username: 'ClutchNova', points: 1725, game: 'Free Fire' },
  { rank: 3, username: 'AimStorm', points: 1660, game: 'Free Fire' },
  { rank: 1, username: 'CrimsonAce', points: 2030, game: 'BGMI' },
  { rank: 2, username: 'VectorRush', points: 1910, game: 'BGMI' }
];

export const leaderboardService = {
  async top(game: 'Free Fire' | 'BGMI', limit = 10): Promise<LeaderboardRow[]> {
    await sleep(500);
    return rows.filter((r) => r.game === game).slice(0, limit);
  }
};

