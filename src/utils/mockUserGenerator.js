import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const roles = ['user', 'admin'];
const passwordHash = bcrypt.hashSync('coder123', 10);

export function generateMockUsers(quantity = 50) {
  const users = [];

  for (let i = 0; i < quantity; i++) {
    users.push({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: passwordHash,
      role: faker.helpers.arrayElement(roles),
      pets: [],
    });
  }

  return users;
}