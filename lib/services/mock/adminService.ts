
export type AdminStat = {
  label: string;
  value: string;
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export const adminService = {
  async getDashboardStats(): Promise<AdminStat[]> {
    await sleep(520);
    return [
      { label: 'Active tournaments', value: '12' },
      { label: 'Total users', value: '4,182' },
      { label: 'Pending withdrawals', value: '7' },
      { label: 'Support tickets', value: '19' }
    ];
  }
};

