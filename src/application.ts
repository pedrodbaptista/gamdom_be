import express, {Application} from 'express';
import 'reflect-metadata';
import config from './config/config';
import healthRoute from './routes/healthRouter';
import {AppDataSource} from './data-source';

export class App {
  public app: Application;

  constructor(
    private port: number,
    middleware: Array<any>,
    routes: Array<express.Router>,
    private apiPath: string = `${config.apiPath}`
  ) {
    this.app = express();
    this.middleware(middleware);
    this.routes(routes);
  }

  private middleware(mware: any[]) {
    mware.forEach((m) => {
      this.app.use(m);
    });
  }

  private routes(routes: Array<express.Router>) {
    // Health route
    this.app.use('/', healthRoute());

    // Other routes
    routes.forEach((r) => {
      this.app.use(`${this.apiPath}`, r);
    });
  }

  public listen(done?: any) {
    AppDataSource.initialize()
      .then(() => {
        if (process.env.NODE_ENV !== 'test') {
          this.app.listen(this.port, () => {
            console.log('Listening on port:', this.port);
          });
        } else {
          return this.app.listen(done);
        }
      })
      .catch((error) => console.log(error));
  }
}
