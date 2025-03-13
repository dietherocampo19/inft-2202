/*
    Name: Diether Ocampo
    filename: create.js
    Course: INFT 2202
    Date: January 10 2025
    Description: 
*/
import AnimalService from './animal.mock.service.js';
import Animal from './animal.js';

const animalForm = document.getElementById('animal-form');
const elMessageBox = document.getElementById('message-box');
const elSubmitButton = animalForm.querySelector('button[type="submit"]');
const elSpinner = document.createElement('div'); // Create spinner element
elSpinner.innerHTML = '<i class="fas fa-spinner fa-spin fa-3x"></i>';
elSpinner.classList.add('d-none', 'text-center', 'mt-3');
animalForm.appendChild(elSpinner); // Append to form

const urlParams = new URLSearchParams(window.location.search);
const editId = urlParams.get('id');

animalForm.addEventListener('submit', submitAnimalForm);

if (editId) {
    setupEditForm(editId);
} else {
    setupAddForm();
}

function waitTho(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function setupEditForm(editId) {
    const heading = document.querySelector('body > div.container > h1');
    heading.textContent = "Edit Existing Animal";

    const existingAnimal = AnimalService.findAnimal(editId);
    if (!existingAnimal) {
        window.location = 'search.html';
    }

    animalForm.name.value = existingAnimal.name;
    animalForm.breed.value = existingAnimal.breed;
    animalForm.eyes.value = existingAnimal.eyes;
    animalForm.legs.value = existingAnimal.legs;
    animalForm.sound.value = existingAnimal.sound;

    animalForm.name.disabled = true;

    animalForm.onsubmit = (event) => submitEditForm(event, existingAnimal);
}

function setupAddForm() {
    const heading = document.querySelector('body > div.container > h1');
    heading.textContent = "Add New Animal";

    animalForm.name.disabled = false;
}

async function submitAnimalForm(event) {
    event.preventDefault();
    const valid = validateAnimalForm(animalForm);

    if (valid) {
        toggleFormState(true);

        const animalData = {
            name: animalForm.name.value.trim(),
            breed: animalForm.breed.value.trim(),
            legs: parseInt(animalForm.legs.value.trim(), 10),
            eyes: parseInt(animalForm.eyes.value.trim(), 10),
            sound: animalForm.sound.value.trim()
        };

        const newAnimal = new Animal(animalData);

        try {
            if (editId) {
                AnimalService.updateAnimal(newAnimal);
            } else {
                AnimalService.createAnimal(newAnimal);
            }

            elMessageBox.classList.remove('alert-danger');
            elMessageBox.classList.add('alert-success');
            elMessageBox.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Animal successfully saved! Redirecting...';
            elMessageBox.classList.remove('d-none');

            await waitTho(3000);
            window.location.href = 'search.html';

        } catch (error) {
            elMessageBox.classList.remove('alert-success');
            elMessageBox.classList.add('alert-danger');
            elMessageBox.textContent = error.message;
            elMessageBox.classList.remove('d-none');
            toggleFormState(false);
        }
    } else {
        elMessageBox.classList.remove('alert-success');
        elMessageBox.classList.add('alert-danger');
        elMessageBox.textContent = 'Please fix the errors in the form.';
        elMessageBox.classList.remove('d-none');
    }
}

async function submitEditForm(event, existingAnimal) {
    event.preventDefault();
    const valid = validateAnimalForm(animalForm);

    if (valid) {
        toggleFormState(true);

        const updatedAnimalData = {
            id: existingAnimal.id,
            name: animalForm.name.value.trim(),
            breed: animalForm.breed.value.trim(),
            legs: parseInt(animalForm.legs.value.trim(), 10),
            eyes: parseInt(animalForm.eyes.value.trim(), 10),
            sound: animalForm.sound.value.trim()
        };

        const updatedAnimal = new Animal(updatedAnimalData);

        try {
            AnimalService.updateAnimal(updatedAnimal);

            elMessageBox.classList.remove('alert-danger');
            elMessageBox.classList.add('alert-success');
            elMessageBox.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Animal successfully updated! Redirecting...';
            elMessageBox.classList.remove('d-none');

            await waitTho(3000);
            window.location.href = 'search.html';

        } catch (error) {
            elMessageBox.classList.remove('alert-success');
            elMessageBox.classList.add('alert-danger');
            elMessageBox.textContent = error.message;
            elMessageBox.classList.remove('d-none');
            toggleFormState(false);
        }
    } else {
        elMessageBox.classList.remove('alert-success');
        elMessageBox.classList.add('alert-danger');
        elMessageBox.textContent = 'Please fix the errors in the form.';
        elMessageBox.classList.remove('d-none');
    }
}

function toggleFormState(disable) {
    for (const element of animalForm.elements) {
        element.disabled = disable;
    }
    elSubmitButton.disabled = disable;
    elSpinner.classList.toggle('d-none', !disable);
}

function validateAnimalForm(form) {
    let valid = true;

    // Name validation
    const name = form.name.value.trim();
    const elNameError = form.name.nextElementSibling;
    if (name === "") {
        valid = false;
        elNameError.classList.remove('d-none');
        elNameError.textContent = "You must name this animal.";
    } else {
        elNameError.classList.add('d-none');
    }

    // Breed validation
    const breed = form.breed.value.trim();
    const elBreedError = form.breed.nextElementSibling;
    if (breed === "") {
        valid = false;
        elBreedError.classList.remove('d-none');
        elBreedError.textContent = "You must provide a breed for this animal.";
    } else {
        elBreedError.classList.add('d-none');
    }

    // Legs validation
    const legs = form.legs.value.trim();
    const elLegsError = form.legs.nextElementSibling;
    if (legs === "" || isNaN(legs) || parseInt(legs, 10) <= 0) {
        valid = false;
        elLegsError.classList.remove('d-none');
        elLegsError.textContent = "Please enter a valid number of legs.";
    } else {
        elLegsError.classList.add('d-none');
    }

    // Eyes validation
    const eyes = form.eyes.value.trim();
    const elEyesError = form.eyes.nextElementSibling;
    if (eyes === "" || isNaN(eyes) || parseInt(eyes, 10) <= 0) {
        valid = false;
        elEyesError.classList.remove('d-none');
        elEyesError.textContent = "Please enter a valid number of eyes.";
    } else {
        elEyesError.classList.add('d-none');
    }

    // Sound validation
    const sound = form.sound.value.trim();
    const elSoundError = form.sound.nextElementSibling;
    if (sound === "") {
        valid = false;
        elSoundError.classList.remove('d-none');
        elSoundError.textContent = "You must provide the sound this animal makes.";
    } else {
        elSoundError.classList.add('d-none');
    }

    return valid;
}
