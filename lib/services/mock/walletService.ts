export type Wallet = {
  balance: number;
  bonusBalance: number;
  currency: 'INR';
};

export type WalletTxn = {
  id: string;
  type: 'topup' | 'bonus' | 'withdrawal' | 'tournament' | 'refund';
  amount: number;
  createdAt: string;
  status: 'pending' | 'completed' | 'failed';
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

const baseWallet: Wallet = {
  balance: 4825,
  bonusBalance: 1200,
  currency: 'INR'
};

const txns: WalletTxn[] = [
  {
    id: 'w-1',
    type: 'tournament',
    amount: 500,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    status: 'completed'
  },
  {
    id: 'w-2',
    type: 'bonus',
    amount: 300,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    status: 'completed'
  },
  {
    id: 'w-3',
    type: 'withdrawal',
    amount: -650,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 34).toISOString(),
    status: 'pending'
  }
];

export const walletService = {
  async getWallet(): Promise<Wallet> {
    await sleep(450);
    return baseWallet;
  },

  async getTransactions(): Promise<WalletTxn[]> {
    await sleep(520);
    return txns;
  }
};

