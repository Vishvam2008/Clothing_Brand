import { session, type SessionUser } from './session';

export type LoginInput = {
  email: string;
  password: string;
  remember: boolean;
};

export type RegisterInput = {
  username: string;
  email: string;
  phone: string;
  password: string;
  ffUid: string;
  ffUsername: string;
};

export type AuthResponse = {
  user: SessionUser;
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export const authService = {
  async login(input: LoginInput): Promise<AuthResponse> {
    // Mock rules: any email containing '@' and password length >= 6 succeeds.
    await sleep(650);
    if (!input.email || !input.email.includes('@') || input.password.length < 6) {
      throw new Error('Invalid credentials');
    }

    const user: SessionUser = {
      id: 'mock-user-1',
      username: 'Shadow_Slayer',
      email: input.email.trim(),
      phone: '9000000000',
      role: input.email.toLowerCase().includes('admin') ? 'admin' : 'user',
      ffUid: '123456789',
      ffUsername: 'Shadow_Slayer'
    };

    session.setUser(user);
    return { user };
  },

  async register(input: RegisterInput): Promise<AuthResponse> {
    await sleep(850);
    if (!input.username || input.username.trim().length < 3) throw new Error('Invalid username');
    if (!input.email || !input.email.includes('@')) throw new Error('Invalid email');
    if (!/^\d{10}$/.test(input.phone)) throw new Error('Invalid phone');
    if (!input.ffUid || !input.ffUsername) throw new Error('Missing FF details');

    const user: SessionUser = {
      id: 'mock-user-2',
      username: input.username.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
      role: 'user',
      ffUid: input.ffUid.trim(),
      ffUsername: input.ffUsername.trim()
    };

    session.setUser(user);
    return { user };
  },

  async logout(): Promise<void> {
    await sleep(250);
    session.setUser(null);
  },

  getCurrentUser(): SessionUser | null {
    return session.getUser();
  }
};

