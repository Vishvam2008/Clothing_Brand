export type Tournament = {
  id: string;
  title: string;
  game: 'Free Fire' | 'BGMI';
  startsAt: string; // ISO
  prizePool: number;
  status: 'open' | 'live' | 'completed';
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

const tournaments: Tournament[] = [
  {
    id: 't-ff-1',
    title: 'Neon Royale (Solo)',
    game: 'Free Fire',
    startsAt: new Date(Date.now() + 1000 * 60 * 45).toISOString(),
    prizePool: 15000,
    status: 'open'
  },
  {
    id: 't-bgmi-1',
    title: 'Crimson Squad Cup',
    game: 'BGMI',
    startsAt: new Date(Date.now() + 1000 * 60 * 110).toISOString(),
    prizePool: 25000,
    status: 'open'
  },
  {
    id: 't-ff-2',
    title: 'Rank Sprint (Duo)',
    game: 'Free Fire',
    startsAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    prizePool: 12000,
    status: 'live'
  }
];

export const tournamentService = {
  async listUpcoming(): Promise<Tournament[]> {
    await sleep(500);
    return tournaments;
  },

  async getById(id: string): Promise<Tournament> {
    await sleep(450);
    const found = tournaments.find((t) => t.id === id);
    if (!found) throw new Error('Tournament not found');
    return found;
  }
};

