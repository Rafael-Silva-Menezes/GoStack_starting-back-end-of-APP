import { Router } from 'express';
import queryRouter from './medicalQuery.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/querys', queryRouter);
routes.use('/users', usersRouter);

export default routes;
