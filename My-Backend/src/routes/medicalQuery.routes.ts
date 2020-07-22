import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import QueryRepository from '../repositories/QueryRepository';
import CreateQueryService from '../services/CreateQueryService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const queryRouter = Router();
queryRouter.use(ensureAuthenticated);

queryRouter.get('/', async (request, response) => {
  const queryRepository = getCustomRepository(QueryRepository);
  const allMedicalQuerys = await queryRepository.find();
  return response.json(allMedicalQuerys);
});

queryRouter.post('/', async (request, response) => {
  const { doctor_id, date, type, value } = request.body;
  const parsedDate = parseISO(date);
  const createQuery = new CreateQueryService();
  const query = await createQuery.execute({
    doctor_id,
    date: parsedDate,
    type,
    value,
  });

  return response.json(query);
});

export default queryRouter;
