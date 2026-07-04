import { authService } from './mock/authService';
import { tournamentService } from './mock/tournamentService';
import { walletService } from './mock/walletService';
import { profileService } from './mock/profileService';
import { leaderboardService } from './mock/leaderboardService';
import { notificationService } from './mock/notificationService';
import { adminService } from './mock/adminService';

export type { Wallet, WalletTxn } from './mock/walletService';
export type { Tournament } from './mock/tournamentService';
export type { LeaderboardRow } from './mock/leaderboardService';
export type { Notification } from './mock/notificationService';
export type { Profile } from './mock/profileService';
export type { AdminStat } from './mock/adminService';
export type { SessionUser } from './mock/session';

export { authService, tournamentService, walletService, profileService, leaderboardService, notificationService, adminService };


