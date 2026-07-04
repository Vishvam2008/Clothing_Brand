export type Profile = {
  username: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  ffUid?: string;
  ffUsername?: string;
  joinedAt: string;
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export const profileService = {
  async getProfile(): Promise<Profile> {
    await sleep(420);
    return {
      username: 'Shadow_Slayer',
      email: 'player@arenax.in',
      phone: '9000000000',
      role: 'user',
      ffUid: '123456789',
      ffUsername: 'Shadow_Slayer',
      joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 42).toISOString()
    };
  },

  async updateProfile(input: Partial<Profile>): Promise<Profile> {
    await sleep(650);
    const prev = await this.getProfile();
    return {
      ...prev,
      ...input
    };
  }
};


