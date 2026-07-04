export type Notification = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

let list: Notification[] = [
  {
    id: 'n-1',
    title: 'Tournament starting soon',
    body: 'Neon Royale (Solo) will go live in 45 minutes.',
    createdAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    read: false
  },
  {
    id: 'n-2',
    title: 'Wallet update',
    body: 'You earned ₹500 for your placement.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    read: true
  }
];

export const notificationService = {
  async list(): Promise<Notification[]> {
    await sleep(420);
    return list;
  },

  async markRead(id: string): Promise<void> {
    await sleep(220);
    list = list.map((n) => (n.id === id ? { ...n, read: true } : n));
  },

  async markAllRead(): Promise<void> {
    await sleep(300);
    list = list.map((n) => ({ ...n, read: true }));
  }
};

