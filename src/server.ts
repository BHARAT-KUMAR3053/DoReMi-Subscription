/* eslint-disable no-case-declarations */
import readline from 'readline';

import { Health } from '@subscription/controllers/health/health';
import { checkForArguments } from '@subscription/utils/utility-functions';

import { handleAddSubscription, handlePrintRenewalDetails, handleStartSubscriptions, handleTopUp } from './controllers/main/subscription-controllers';
import { IPlan } from './controllers/main/interfaces';

export class Server {

  public start(): void {
    //health check
    const health = new Health();
    health.health();
    this.createInputOutputInterface();
  }

  private createInputOutputInterface(){
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '> ',
    });

    rl.prompt();

    rl.on('line', (line) => {
      const input = line.trim().split(' ');

      const command = input[0].toUpperCase();
      const args = input.slice(1);


      switch (command) {
        case 'START_SUBSCRIPTION':
          checkForArguments(args, 1);
          const [START_SUBSCRIPTION_DATE] = args;
          handleStartSubscriptions(START_SUBSCRIPTION_DATE);
          break;
        case 'ADD_SUBSCRIPTION':
          checkForArguments(args, 2);
          const [SUBSCRIPTION_CATEGORY, PLAN_NAME] = args;
          const validPlanNames: IPlan[] = ['free', 'premium', 'personal'];
          if (validPlanNames.includes(PLAN_NAME.toLowerCase() as IPlan)) {
            handleAddSubscription(SUBSCRIPTION_CATEGORY, PLAN_NAME.toLowerCase() as IPlan);
          } else {
            console.log('WRONG PLAN_NAME');
          }
          break;
        case 'ADD_TOPUP':
          checkForArguments(args, 2);
          const [TOP_UP_NAME, NO_OF_MONTHS] = args;
          handleTopUp(TOP_UP_NAME, NO_OF_MONTHS);
          break;
        case 'PRINT_RENEWAL_DETAILS':
          handlePrintRenewalDetails();
          break;
        default:
          console.log(`UNKNOWN COMMAND: ${command}`);
          break;
      }

      rl.prompt();
    }).on('close', () => {
      console.log('Exiting the application');
      process.exit(0);
    });
  }

}
