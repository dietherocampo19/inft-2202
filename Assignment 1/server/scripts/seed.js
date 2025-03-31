const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Pokemon = require("../models/pokemon.js");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const samplePokemons = [
  { name: "Pikachu", type: "Electric", hp: 35, attack: 55, defense: 40, image: "pikachu.png" },
  { name: "Charmander", type: "Fire", hp: 39, attack: 52, defense: 43, image: "charmander.png" },
  { name: "Bulbasaur", type: "Grass", hp: 45, attack: 49, defense: 49, image: "bulbasaur.png" },
];

const seedDatabase = async () => {
  await Pokemon.deleteMany(); // Clears the database
  await Pokemon.insertMany(samplePokemons);
  console.log("Sample Pokémon Data Inserted");
  mongoose.connection.close();
};

seedDatabase();
