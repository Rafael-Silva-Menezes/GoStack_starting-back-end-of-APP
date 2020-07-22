import { EntityRepository, Repository } from 'typeorm';
import QueryModel from '../models/QueryModel';

@EntityRepository(QueryModel)
class QueryRepository extends Repository<QueryModel> {
  public async findByDate(date: Date): Promise<QueryModel | null> {
    const findQuery = await this.findOne({
      where: { date },
    });
    return findQuery || null;
  }
}

export default QueryRepository;
