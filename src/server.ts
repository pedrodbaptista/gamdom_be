import 'reflect-metadata';
import {App} from './application';
import routes from './routes/index';
import middlewares from './middlewares/common';

const port: number = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = new App(port, middlewares, routes);

app.listen();

export default app;
