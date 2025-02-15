/*
    Name: Diether Ocampo
    Filename: create.js
    Course: INFT 2202
    Date: January 30, 2025
    Description: This is my Pokémon card creation script.
*/
import productService from "./pokemon.mock.service.js";
import Pokemon from "./pokemon.js";

// Update these to match your HTML IDs
const form = document.getElementById("product-form");
const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");

const nameInput = document.getElementById("product-name");
const typeInput = document.getElementById("product-type");
const priceInput = document.getElementById("product-price");    // Changed from hp
const stockInput = document.getElementById("product-stock");    // Changed from attack
const descInput = document.getElementById("product-description");

const params = new URLSearchParams(window.location.search);
const pokemonId = params.get("id");

if (pokemonId) {
    formTitle.textContent = "Edit Pokémon Card";
    submitBtn.textContent = "Update Pokémon";

    try {
        const pokemon = productService.findProduct(pokemonId);
        nameInput.value = pokemon.name;
        typeInput.value = pokemon.type;
        priceInput.value = pokemon.price;
        stockInput.value = pokemon.stock;
        descInput.value = pokemon.description;
    } catch (error) {
        console.error(error);
        window.location.href = "search.html";
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
        price: parseFloat(priceInput.value),    // Changed from hp
        stock: parseInt(stockInput.value),       // Changed from attack
        description: descInput.value.trim()
    };

    try {
        if (pokemonId) {
            productService.updateProduct(new Pokemon(pokemonData));
        } else {
            productService.createProduct(new Pokemon(pokemonData));
            console.log("Pokemon created successfully");
        }
        window.location.href = "search.html";
    } catch (error) {
        console.error("Error:", error.message);
        alert(error.message);
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

    if (!typeInput.value.trim() || typeInput.value === "Select Card Type") {
        setInvalid(typeInput);
        isValid = false;
    } else {
        setValid(typeInput);
    }

    if (!priceInput.value.trim() || isNaN(priceInput.value) || parseFloat(priceInput.value) <= 0) {
        setInvalid(priceInput);
        isValid = false;
    } else {
        setValid(priceInput);
    }

    if (!stockInput.value.trim() || isNaN(stockInput.value) || parseInt(stockInput.value) < 0) {
        setInvalid(stockInput);
        isValid = false;
    } else {
        setValid(stockInput);
    }

    if (!descInput.value.trim()) {
        setInvalid(descInput);
        isValid = false;
    } else {
        setValid(descInput);
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