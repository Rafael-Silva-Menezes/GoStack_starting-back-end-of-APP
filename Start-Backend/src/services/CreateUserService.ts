import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepositorys = getRepository(User);

    const checkUsersExists = await usersRepositorys.findOne({
      where: { email },
    });

    if (checkUsersExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepositorys.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepositorys.save(user);

    return user;
  }
}

export default CreateUserService;
