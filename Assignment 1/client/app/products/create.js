/*
    Name: Diether Ocampo
    Filename: create.js
    Course: INFT 2202
    Date: January 30, 2025
    Description: This is my Pokémon card creation script.
*/
import productService from "./product.mock.service.js";
import Pokemon from "./pokemon.js"; // Updated to import Pokemon class

const form = document.getElementById("pokemon-form");
const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");

const nameInput = document.getElementById("pokemon-name");
const typeInput = document.getElementById("pokemon-type");
const hpInput = document.getElementById("pokemon-hp");
const attackInput = document.getElementById("pokemon-attack");
const descInput = document.getElementById("pokemon-description");
const imageInput = document.getElementById("pokemon-image-url");

const params = new URLSearchParams(window.location.search);
const pokemonId = params.get("id");

if (pokemonId) {
    formTitle.textContent = "Edit Pokémon Card";
    submitBtn.textContent = "Update Pokémon";

    try {
        const pokemon = productService.findProduct(pokemonId); // Assuming you have the findProduct function
        nameInput.value = pokemon.name;
        typeInput.value = pokemon.type;
        hpInput.value = pokemon.hp;
        attackInput.value = pokemon.attack;
        descInput.value = pokemon.description;
        imageInput.value = pokemon.imageUrl;
    } catch (error) {
        console.error(error);
        window.location.href = "search.html"; // Redirect if Pokémon card not found
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = validateForm();
    if (!isValid) return;

    const pokemonData = {
        id: pokemonId ? pokemonId : null,
        name: nameInput.value.trim(),
        type: typeInput.value.trim(),
        hp: parseInt(hpInput.value),
        attack: parseInt(attackInput.value),
        description: descInput.value.trim(),
        imageUrl: imageInput.value.trim(),
    };

    if (pokemonId) {
        try {
            productService.updateProduct(new Pokemon(pokemonData)); // Update the Pokémon object
            window.location.href = "search.html"; // Redirect after update
        } catch (error) {
            console.error(error);
        }
    } else {
        try {
            productService.createProduct(new Pokemon(pokemonData)); // Create new Pokémon object
            window.location.href = "search.html"; // Redirect after creation
        } catch (error) {
            console.error(error);
        }
    }
});

function validateForm() {
    let isValid = true;

    if (!nameInput.value.trim()) {
        setInvalid(nameInput);
        isValid = false;
    } else {
        setValid(nameInput);
    }

    if (!typeInput.value.trim()) {
        setInvalid(typeInput);
        isValid = false;
    } else {
        setValid(typeInput);
    }

    if (!hpInput.value.trim() || isNaN(hpInput.value) || parseInt(hpInput.value) <= 0) {
        setInvalid(hpInput);
        isValid = false;
    } else {
        setValid(hpInput);
    }

    if (!attackInput.value.trim() || isNaN(attackInput.value) || parseInt(attackInput.value) <= 0) {
        setInvalid(attackInput);
        isValid = false;
    } else {
        setValid(attackInput);
    }

    if (!descInput.value.trim()) {
        setInvalid(descInput);
        isValid = false;
    } else {
        setValid(descInput);
    }

    if (!imageInput.value.trim()) {
        setInvalid(imageInput);
        isValid = false;
    } else {
        setValid(imageInput);
    }

    return isValid;
}

function setInvalid(input) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
}

function setValid(input) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
}
