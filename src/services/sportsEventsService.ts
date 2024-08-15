import {AppDataSource} from '../data-source';
import SportEvents from '../models/SportsEvents';

export const getSportsEvents = async (): Promise<SportEvents[]> => {
  try {
    const sportEventsRepository = AppDataSource.getRepository(SportEvents);
    return await sportEventsRepository.find();
  } catch (error) {
    throw new Error(`Error getting sports events: ${error.message}`);
  }
};
