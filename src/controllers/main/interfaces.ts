export interface MusicItem{
  time: number,
  money: number,
}

export interface IMusic {
  free: MusicItem;
  personal: MusicItem;
  premium: MusicItem;
}

export type IPlan = 'free' | 'personal' | 'premium';

export interface ISubscriptions {
  date?: string | null;
  free: {[key: string]: string} | null;
  personal: {[key: string]: string} | null;
  premium: {[key: string]: string} | null;
  topup?: {[key: string]: number} | null;
}
