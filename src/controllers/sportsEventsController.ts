import {Request, Response} from 'express';
import * as SportsEventsService from '../services/sportsEventsService';

export const getSportsEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const sportsEvents = await SportsEventsService.getSportsEvents();
    res.status(201).json(sportsEvents);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
