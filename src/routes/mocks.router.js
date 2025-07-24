import { Router } from 'express';
import { generateMockUsers } from '../utils/mockUserGenerator.js';
import { generateUsers, generatePets } from '../utils/mockDataGenerator.js';
import Users from '../dao/Users.dao.js';
import Pets from '../dao/Pets.dao.js';

const router = Router();

const usersDao = new Users();
const petsDao = new Pets();

router.get('/mockingusers', (req, res) => {
  try {
    const users = generateMockUsers(50);
    res.status(200).json({ status: 'success', payload: users });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

router.get('/mockinpets', (req, res) => {
  try {
    const users = generateMockPets(50);
    res.status(200).json({ status: 'success', payload: users });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

router.post('/generateData', async (req, res) => {
  const { users = 0, pets = 0 } = req.body;

  try {
    const mockUsers = generateUsers(Number(users));
    const mockPets = generatePets(Number(pets));

    const savedUsers = await Promise.all(
      mockUsers.map(user => usersDao.save(user))
    );

    const savedPets = await Promise.all(
      mockPets.map(pet => petsDao.save(pet))
    );

    res.status(201).json({
      status: 'success',
      message: `Se generaron ${savedUsers.length} usuarios y ${savedPets.length} mascotas.`,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

export default router;