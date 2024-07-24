import { subscriptions } from '@subscription/repository/subscription-repository';
import { calculateAmount, isValidDate, reminderDate } from '@subscription/utils/utility-functions';
import { IPlan } from '@subscription/controllers/main/interfaces';

function handleStartSubscriptions(date: string) {
  if (!isValidDate(date)) {
    console.log('INVALID_DATE');
    return;
  }
  subscriptions.date = date;
}

function handleAddSubscription(category: string, plan_name: IPlan) {
  if (!subscriptions.date) {
    console.log('ADD_SUBSCRIPTION_FAILED INVALID_DATE');
    return;
  }
  if (
    !(
      plan_name.toLowerCase() === 'personal' ||
      plan_name.toLowerCase() === 'premium' ||
      plan_name.toLowerCase() === 'free'
    ) ||
    subscriptions[plan_name.toLowerCase() as IPlan] !== null
  ) {
    console.log('ADD_SUBSCRIPTION_FAILED');
    return;
  }
  for (const [, value] of Object.entries(subscriptions)) {
    if (typeof value === 'object' && value?.plan === category.toLowerCase()) {
      console.log('ADD_SUBSCRIPTION_FAILED DUPLICATE_CATEGORY');
      return;
    }
  }
  subscriptions[plan_name.toLowerCase() as IPlan] = { plan: category.toLowerCase() };
}

function handleTopUp(top_up_name: string, number_of_months: string) {
  if (!(top_up_name === 'FOUR_DEVICE' || top_up_name === 'TEN_DEVICE')) {
    console.log('ADD_TOPUP_FAILED');
    return;
  }
  if (subscriptions['topup'] !== null) {
    console.log('ADD_TOPUP_FAILED DUPLICATE_TOPUP');
    return;
  }
  if (
    !(
      subscriptions.free !== null ||
      subscriptions.premium !== null ||
      subscriptions.personal !== null
    )
  ) {
    console.log('ADD_TOPUP_FAILED SUBSCRIPTIONS_NOT_FOUND');
    return;
  }
  subscriptions['topup'] = {
    [top_up_name]: Number(number_of_months),
  };
}

function handlePrintRenewalDetails() {
  if (!subscriptions.date) {
    console.log('SUBSCRIPTIONS_NOT_FOUND');
    return;
  }
  if (
    !(
      subscriptions.free !== null ||
      subscriptions.premium !== null ||
      subscriptions.personal !== null
    )
  ) {
    console.log('SUBSCRIPTIONS_NOT_FOUND');
    return;
  }
  let amount = 0;
  for (const [key, value] of Object.entries(subscriptions)) {
    if (
      typeof value === 'object' &&
      (key === 'free' || key === 'premium' || key === 'personal') &&
      value !== null
    ) {
      console.log(
        `RENEWAL_REMINDER ${value?.plan.toUpperCase()} ${reminderDate(
          subscriptions.date,
          key
        )}`
      );
    }
    if (key === 'personal' && subscriptions.personal !== null) {
      amount += calculateAmount('personal', value.plan);
    }
    if (key === 'premium' && subscriptions.premium !== null) {
      amount += calculateAmount('premium', value.plan);
    }
    if (key === 'topup' && subscriptions.topup !== null && subscriptions.topup !== undefined) {
      const topup = subscriptions.topup;
      if (typeof topup === 'object') {
        if ('FOUR_DEVICE' in topup) {
          amount += 50 * topup['FOUR_DEVICE'];
        } else if ('TEN_DEVICE' in topup) {
          amount += 100 * topup['TEN_DEVICE'];
        }
      }
    }
  }
  console.log(`RENEWAL_AMOUNT ${amount}`);
}

export {
  handleAddSubscription, handlePrintRenewalDetails, handleStartSubscriptions, handleTopUp
};

