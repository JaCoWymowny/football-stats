import cron from 'node-cron';
import { updateBetResults } from '../controllers/bet.controller';

const runScheduledTasks = () => {
  console.log('Rozpoczęcie zaplanowanych zadań...');
  // */2 * * * * lub 0 * * * *
  cron.schedule('0 10 * * *', async () => {
    console.log('Uruchamianie aktualizacji wyników zakładów...');
    await updateBetResults();
  });

  console.log('Cron został uruchomiony.');
};

export default runScheduledTasks;
