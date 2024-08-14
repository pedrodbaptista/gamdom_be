import {App} from './application';
import {middleware} from '../middlewares/common';
import routes from './routes/index';

const port: number = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = new App(port, middleware, routes);

app.listen();

export default app;
