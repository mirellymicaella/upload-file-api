import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { router } from './routes'
import errorMidleware from './middlewares/Errors';
import './database'
class AppController {
  public app: express.Application = express();

  constructor() {
    this.middlewares();
    this.routes();
    this.errors();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());    
  }

  routes() {
    this.app.use('/', router);
  }

  errors() {
    this.app.use(errorMidleware);
  }
}

export default new AppController().app;