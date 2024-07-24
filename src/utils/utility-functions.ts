import dayjs from 'dayjs';
import { IPlan } from '@subscription/controllers/main/interfaces';
import { podcast, music, video } from '@subscription/repository/subscription-repository';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

function checkForArguments(args: string[], length: number) {
  if (args.length !== length) {
    console.log('Invalid number of arguments');
  }
}

function isValidDate(date: string) {
  const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
  const match = date.match(regex);

  if (!match) {
    return false;
  }

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1;
  const year = parseInt(match[3], 10);

  const parsedDate = dayjs(new Date(year, month, day));

  return (
    parsedDate.isValid() &&
    parsedDate.date() === day &&
    parsedDate.month() === month &&
    parsedDate.year() === year
  );
}

function reminderDate(date: string, key: string) {
  switch (key) {
    case 'free':
      return dayjs(date, 'DD-MM-YYYY').add(1, 'month').format('DD-MM-YYYY');
    case 'personal':
      return dayjs(date, 'DD-MM-YYYY').add(1, 'month').format('DD-MM-YYYY');
    case 'premium':
      return dayjs(date, 'DD-MM-YYYY').add(3, 'month').format('DD-MM-YYYY');
    default:
      return date;
  }
}

function calculateAmount(plan: IPlan, category: string) {
  switch (category) {
    case 'music':
      return music[plan].money;
    case 'video':
      return video[plan].money;
    case 'podcast':
      return podcast[plan].money;
    default:
      return 0;
  }
}

export { checkForArguments, isValidDate, reminderDate, calculateAmount };

