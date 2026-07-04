export type SessionUser = {
  id: string;
  username: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  ffUid?: string;
  ffUsername?: string;
};

let currentUser: SessionUser | null = null;

export const session = {
  getUser: (): SessionUser | null => currentUser,
  setUser: (user: SessionUser | null) => {
    currentUser = user;
  }
};

