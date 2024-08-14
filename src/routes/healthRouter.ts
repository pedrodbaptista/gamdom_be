import express from 'express';

const healthRoute = () => {
  const router = express.Router();

  router.get('/health', async (req: express.Request, res: express.Response) => {
    try {
      res.send('Ok!');
    } catch (err) {
      console.log(err);
    }
  });

  return router;
};

export default healthRoute;
