const mongoose = require("mongoose");

const PokemonSchema = new mongoose.Schema({
  name: String,
  type: String,
  hp: Number,
  attack: Number,
  defense: Number,
  image: String, // URL to Pokémon image
}, { timestamps: true });

module.exports = mongoose.model("Pokemon", PokemonSchema);
