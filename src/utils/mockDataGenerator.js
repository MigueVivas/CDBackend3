import { faker } from '@faker-js/faker';


export function generateMockUser() {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 70 }),
    password: faker.internet.password()
  };
}


export function generateMockPet() {
  return {
    name: faker.animal.cat(),
    species: faker.helpers.arrayElement(['perro', 'gato', 'conejo']),
    age: faker.number.int({ min: 1, max: 15 }),
    adopted: faker.datatype.boolean()
  };
}

export function generateMockAdoption() {
  return {
    user: faker.database.mongodbObjectId(),
    pet: faker.database.mongodbObjectId(),
    date: faker.date.recent().toISOString()
  };
}
