const debug = require('debug')('app:routes:api:pet');
const debugError = require('debug')('app:error');
const e = require('express');
const express = require('express');
const { nanoid } = require('nanoid');
const dbModule = require('../../database');
const { newId, findAllPets, findPetById } = require('../../database');

const petsArray = [
  { _id: '1', name: 'Fido', createdDate: new Date() },
  { _id: '2', name: 'Watson', createdDate: new Date() },
  { _id: '3', name: 'Loki', createdDate: new Date() },
];

// create a router
const router = express.Router();

// define routes
router.get('/list', async (req, res, next) => {
  const pets = await dbModule.findAllPets();
  res.json(pets);
});

router.get('/:petId', async (req, res, next) => {
  try {
    const petId = newId(req.params.petId);
    const pet = await dbModule.findPetById(petId);
    if (!pet) {
      res.status(404).json({ error: `${petId} not found.`});
    } else {
      res.json(pet);
    }
  } catch (err) {
    next(err);
  }
});
router.put('/new', async (req, res, next) => {
  try {
    const petId = newId(req.params.petId);
    const update = req.body;
    debug(`update pet ${petId}`, update);

    const pet = await dbModule.findPetById(petId);
    if (!pet) {
      res.status(404).json({ error: `Pet ${petId} not found.`});
    } else {
      await dbModule.updateOnePet(petId, update);
      res.json({ message: `Pet ${petId} updated.`});
    }
    const pet = {
      _id: newId(),
      species: req.body.species,
      name: req.body.name,
      age: parseInt(req.body.age),
      gender: req.body.gender,
      createdDate: new Date(),
    };

    if (!pet.species) {
      res.status(400).json({ error: 'Species required.' });
    } else if (!pet.name) {
      res.status(400).json({ error: 'Name required.' });
    } else if (!pet.age) {
      res.status(400).json({ error: 'Age required.' });
    } else if (!pet.gender) {
      res.status(400).json({ error: 'Gender required.' });
    } else {
      await dbModule.insertOnePet(pet);
      res.json({ message: 'Pet inserted.' });
    }
  } catch (err) {
    next(err);
  }
});
router.put('/:petId', (req, res, next) => {
  try {
    const petId = newId(req.params.id);
    const pet = findPetById(petId);
    if (!pet) {
      res.status(404).json({ error:  `Pet ${petId} not found.`})
    } else {
        const edits = {
        id = petId,
        species = req.body.species,
        name = req.body.name,
        age = parseInt(req.body.age),
        gender = req.body.gender,
        lastUpdated = new Date(),
      }
    }
  } catch (err) {
    next(err);
  }
});
router.delete('/:petId', (req, res, next) => {
  try {
    const petId = newId(req.params.petId);
    debug(`delete pet ${petId}`);

    const pet = await dbModule.findPetById(petId);
    if (!pet) {
      res.status(404).json({ error: `Pet ${petId} not found.`});
    } else {
      await dbModule.deleteOnePet(petId);
      res.json({ message: `Pet ${petId} deleted.`});
    }
  } catch (err) {
    next(err);
  }
  // const petId = req.params.petId;
  // const index = petsArray.findIndex((x) => x._id == petId);
  // if (index < 0) {
  //   res.status(404).json({ error: 'Pet not found.' });
  // } else {
  //   petsArray.splice(index, 1);
  //   res.json({ message: 'Pet deleted.' });
  // }
});

// export router
module.exports = router;
