import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Query from '../models/QueryModel';
import QueryRepository from '../repositories/QueryRepository';

interface Request {
  doctor_id: string;
  date: Date;
  type: string;
  value: number;
}

class CreateQueryService {
  public async execute({
    doctor_id,
    date,
    type,
    value,
  }: Request): Promise<Query> {
    const queryRepository = getCustomRepository(QueryRepository);
    const queryDate = startOfHour(date);
    const findQueryInSameDate = await queryRepository.findByDate(queryDate);

    if (findQueryInSameDate) {
      throw new AppError('This query is already booked');
    }
    const query = queryRepository.create({
      doctor_id,
      date: queryDate,
      type,
      value,
    });

    await queryRepository.save(query);
    return query;
  }
}

export default CreateQueryService;
