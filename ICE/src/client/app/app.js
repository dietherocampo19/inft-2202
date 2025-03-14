/*
    Name: Diether Ocampo
    filename: app.js
    Course: INFT 2202
    Date: January 10, 2025
    Description: Handles API calls for animals
*/

import AnimalService from './animals/animal.service.js'; // Ensure the correct path

// Fetch animals when the page loads
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const animals = await AnimalService.getAnimalPage({ page: 1, perPage: 5 });
        console.log("All Animals:", animals);
    } catch (error) {
        console.error("Error fetching animals:", error);
    }
});

// Fetch an animal by name when a button is clicked
document.getElementById("fetchAnimalBtn")?.addEventListener("click", async () => {
    try {
        const animalName = prompt("Enter the animal's name:");
        if (animalName) {
            const animal = await AnimalService.findAnimal(animalName);
            console.log("Animal Found:", animal);
        }
    } catch (error) {
        console.error("Error fetching animal:", error);
    }
});

// Create a new animal when a button is clicked
document.getElementById("createAnimalBtn")?.addEventListener("click", async () => {
    try {
        const newAnimal = { name: "Tiger", species: "Big Cat" };
        const response = await AnimalService.saveAnimal(newAnimal);
        console.log("Created Animal:", response);
    } catch (error) {
        console.error("Error creating animal:", error);
    }
});

// Update an animal when a button is clicked
document.getElementById("updateAnimalBtn")?.addEventListener("click", async () => {
    try {
        const updatedAnimal = { name: "Updated Tiger", species: "Big Cat" };
        const response = await AnimalService.updateAnimal(updatedAnimal);
        console.log("Updated Animal:", response);
    } catch (error) {
        console.error("Error updating animal:", error);
    }
});

// Delete an animal when a button is clicked
document.getElementById("deleteAnimalBtn")?.addEventListener("click", async () => {
    try {
        const animalName = prompt("Enter the animal's name to delete:");
        if (animalName) {
            const success = await AnimalService.deleteAnimal(animalName);
            console.log("Deleted Animal:", success ? "Success" : "Failed");
        }
    } catch (error) {
        console.error("Error deleting animal:", error);
    }
});
