import express from 'express';
import {getSportsEvents} from '../controllers/sportsEventsController';

const sportsEventsRoutes = () => {
  const router = express.Router();

  router.get('/events', getSportsEvents);

  return router;
};

export default sportsEventsRoutes;
