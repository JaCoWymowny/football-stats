import cron from 'node-cron';
import { updateBetResults } from '../controllers/bet.controller';

const runScheduledTasks = () => {
  console.log('Rozpoczęcie zaplanowanych zadań...');

  cron.schedule('0 * * * *', async () => {
    console.log('Uruchamianie aktualizacji wyników zakładów...');
    await updateBetResults();
  });

  console.log('Cron został uruchomiony.');
};

export default runScheduledTasks;
