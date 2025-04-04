import express from 'express';
import pokemon from "../controllers/pokemon.js";
import { checkValidation } from '../middleWare/validation.js';

const router = express.Router();

// Route to get Pokémon by name (optional parameter) with validation
router.get('/:name?', checkValidation(pokemon.rules), pokemon.index);

// Route to add a new Pokémon with validation
router.post('/', checkValidation(pokemon.rules), pokemon.add);

// Route to delete a Pokémon by name (optional parameter)
router.delete('/:name?', pokemon.delete);

// Route to update a Pokémon's information with validation
router.put('/', checkValidation(pokemon.rules), pokemon.update);

export default router;