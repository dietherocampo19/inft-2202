/*
    Name: Diether Ocampo
    filename: create.js
    Course: INFT 2202
    Date: January 10 2025
    Description: 
*/
import AnimalService from "./animal.service.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#animalForm");
    const nameInput = document.querySelector("#name");
    const speciesInput = document.querySelector("#species");
    const ageInput = document.querySelector("#age");
    const formTitle = document.querySelector("#formTitle");
    const urlParams = new URLSearchParams(window.location.search);
    const animalName = urlParams.get("id");

    async function setupEditForm() {
        if (!animalName) return;
        formTitle.textContent = "Edit Animal";
        nameInput.disabled = true;
        
        const animal = await AnimalService.findAnimal(animalName);
        if (animal) {
            nameInput.value = animal.name;
            speciesInput.value = animal.species;
            ageInput.value = animal.age;
        }
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const animalData = {
            name: nameInput.value,
            species: speciesInput.value,
            age: ageInput.value,
        };

        if (animalName) {
            await AnimalService.updateAnimal(animalData);
        } else {
            await AnimalService.saveAnimal(animalData);
        }

        window.location.href = "search.html";
    });

    setupEditForm();
});
