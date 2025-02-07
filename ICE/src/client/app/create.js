/*
    Name: Diether Ocampo
    filename: create.js
    Course: INFT 2202
    Date: January 10, 2025
    Description: Handles adding and editing animals.
*/

// Tell us what page we're on
console.log('we are on the add/edit page');

// Get URL parameters to check if editing an animal
const urlParams = new URLSearchParams(window.location.search);
const animalId = urlParams.get('id'); // Get the animal ID if editing

document.getElementById('animal-form')
    .addEventListener('submit', submitAnimalForm);

if (animalId) {
    setupEditForm(animalId);
}

// Function to set up the form for editing
async function setupEditForm(id) {
    try {
        const animal = await animalService.findAnimal(id);
        if (animal) {
            const animalForm = document.getElementById('animal-form');
            animalForm.name.value = animal.name;
            animalForm.eyes.value = animal.eyes;
            animalForm.legs.value = animal.legs;
            animalForm.type.value = animal.type;
            document.getElementById('form-title').textContent = "Edit Animal";
            animalForm.name.disabled = true; // Keep name field disabled for editing
        }
    } catch (error) {
        console.log("Error fetching animal:", error);
    }
}

// Handle form submission (create or update)
async function submitAnimalForm(event) {
    event.preventDefault();
    const animalForm = event.target;
    const valid = validateAnimalForm(animalForm);

    if (valid) {
        console.log('Form is valid');

        const formData = new FormData(animalForm);
        const animalObject = {};
        formData.forEach((value, key) => {
            animalObject[key] = (key === 'eyes' || key === 'legs') ? Number(value) : value;
        });

        const eleNameError = animalForm.name.nextElementSibling;
        try {
            if (animalId) {
                await animalService.updateAnimal(animalId, animalObject);
            } else {
                await animalService.saveAnimal(animalObject);
            }

            eleNameError.classList.add('d-none');
            animalForm.reset();
            window.location = './list.html';
        } catch (error) {
            console.log(error);
            eleNameError.classList.remove('d-none');
            eleNameError.textContent = "This animal already exists!";
        }
    } else {
        console.log('Form is not valid');
    }
}

// Validate the animal form
function validateAnimalForm(form) {
    console.log('Validating form');
    let valid = true;
    const name = form.name.value;
    const eleNameError = form.name.nextElementSibling;

    if (name.trim() === "") {
        eleNameError.classList.remove('d-none');
        eleNameError.textContent = "You must name this animal!";
        valid = false;
    } else {
        eleNameError.classList.add('d-none');
    }

    return valid;
}
