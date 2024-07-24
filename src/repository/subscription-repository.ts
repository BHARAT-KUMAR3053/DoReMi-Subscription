import { IMusic, ISubscriptions } from '@subscription/controllers/main/interfaces';

const subscriptions: ISubscriptions = {
  date: null,
  free: null,
  personal: null,
  premium: null,
  topup: null,
};

const music: IMusic = {
  free: {
    time: 1,
    money: 0,
  },
  personal: {
    time: 1,
    money: 100,
  },
  premium: {
    time: 3,
    money: 250,
  },
};

const video: IMusic = {
  free: {
    time: 1,
    money: 0,
  },
  personal: {
    time: 1,
    money: 200,
  },
  premium: {
    time: 3,
    money: 500,
  },
};

const podcast: IMusic = {
  free: {
    time: 1,
    money: 0,
  },
  personal: {
    time: 1,
    money: 100,
  },
  premium: {
    time: 3,
    money: 300,
  },
};

export { subscriptions, music, video, podcast };
