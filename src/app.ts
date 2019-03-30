import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as methodOverride from 'method-override';
import * as morgan from 'morgan';
import * as passport from 'passport';
import * as path from 'path';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

import adminRoutes from './routes/admin';
import studentRoutes from './routes/student';
import professorRoutes from './routes/professor';
import errorMiddleware from './middlewares/errorMiddleware';

const app = express();

app.use(passport.initialize());

app.use(methodOverride());
app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dir = path.join(__dirname, '..', 'uploads');
app.use(express.static(dir));

app.use(adminRoutes);
app.use(studentRoutes);
app.use(professorRoutes);

// ALWAYS USE ERROR MIDDLEWARE LAST !!!!
app.use(errorMiddleware);

(async () => {
  try {
    await createConnection();
  } catch (e) {
    console.log('Error while connecting to the database', e);
    return e;
  }
  if (process.env.NODE_ENV !== 'TEST') {
    const server = app.listen(process.env.PORT || 3000, () => {
      const { port } = server.address();
      console.log('Listening on port ' + port);
    });
  }
})();

export default app;
