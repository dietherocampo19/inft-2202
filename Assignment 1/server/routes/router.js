const express = require("express");
const router = express.Router();
const Pokemon = require("../models/pokemon.js");

// 🔹 GET all Pokémon
router.get("/", async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// 🔹 POST (Create a new Pokémon)
router.post("/", async (req, res) => {
  try {
    const newPokemon = new Pokemon(req.body);
    await newPokemon.save();
    res.status(201).json(newPokemon);
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
});

// 🔹 PUT (Update a Pokémon)
router.put("/:id", async (req, res) => {
  try {
    const updatedPokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPokemon);
  } catch (error) {
    res.status(400).json({ error: "Update failed" });
  }
});

// 🔹 DELETE (Remove a Pokémon)
router.delete("/:id", async (req, res) => {
  try {
    await Pokemon.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Delete failed" });
  }
});

module.exports = router;
