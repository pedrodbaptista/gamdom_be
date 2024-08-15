import express from 'express';
import {getSportsEvents, placeBet} from '../controllers/sportsEventsController';
import {authentication, authorization} from '../middlewares/auth';

const sportsEventsRoutes = () => {
  const router = express.Router();

  router.get(
    '/events',
    authentication,
    authorization(['user']),
    getSportsEvents
  );
  router.get('/bet', authentication, authorization(['user']), placeBet);

  return router;
};

export default sportsEventsRoutes;
