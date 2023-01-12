import { initDB } from '../src/sqlite/db'
import { initDBKeys } from './sqlite/dbKeys';

export async function bootstrap() {
    try {
        await initDB();
        await initDBKeys();
        await new Promise(resolve => setTimeout(resolve, 2000));
        return console.log("bootstrap with DB is load");
    } catch (e) {
        console.log('Error -> ', e)
    }

}