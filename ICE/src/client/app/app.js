/*
    Name: Diether Ocampo
    filename: app.js
    Course: INFT 2202
    Date: January 10 2025
    Description: 
*/
import AnimalService from './animal.service.js'; // Ensure the correct path

const service = new AnimalService();

// Fetch all animals when the page loads
document.addEventListener("DOMContentLoaded", () => {
  service.getAllAnimals().then(data => console.log("All Animals:", data));
});

// Fetch a single animal by ID when a button is clicked
document.getElementById("fetchAnimalBtn").addEventListener("click", () => {
  service.getAnimalById(1).then(animal => console.log("Animal 1:", animal));
});

// Create a new animal when a button is clicked
document.getElementById("createAnimalBtn").addEventListener("click", () => {
  const newAnimal = { name: "Tiger", species: "Big Cat" };
  service.createAnimal(newAnimal).then(response => console.log("Created Animal:", response));
});

// Update an animal when a button is clicked
document.getElementById("updateAnimalBtn").addEventListener("click", () => {
  const updatedAnimal = { name: "Updated Tiger" };
  service.updateAnimal(1, updatedAnimal).then(response => console.log("Updated Animal:", response));
});

// Delete an animal when a button is clicked
document.getElementById("deleteAnimalBtn").addEventListener("click", () => {
  service.deleteAnimal(1).then(success => console.log("Deleted Animal:", success));
});