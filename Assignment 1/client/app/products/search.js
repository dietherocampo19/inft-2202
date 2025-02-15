/*
    Name: Diether Ocampo
    Filename: search.js
    Course: INFT 2202
    Date: January 30, 2025
    Description: This is my search script.
*/

import pokemonService from "./pokemon.mock.service.js";

const pokemonList = document.getElementById("pokemon-list");
const pagination = document.getElementById("pagination");

const POKEMONS_PER_PAGE = 6;
let currentPage = 1;

function renderPokemons() {
    const pokemons = pokemonService.listPokemons();
    
    if (pokemons.length === 0) {
        pokemonList.innerHTML = `<div class="alert alert-warning text-center" role="alert">
            No Pokémon cards available at the moment.
        </div>`;
        pagination.innerHTML = "";
        return;
    }

    const start = (currentPage - 1) * POKEMONS_PER_PAGE;
    const paginatedPokemons = pokemons.slice(start, start + POKEMONS_PER_PAGE);

    pokemonList.innerHTML = paginatedPokemons.map(pokemon => `
        <div class="col-md-4">
            <div class="card shadow">
                <img src="${pokemon.imageUrl}" class="card-img-top" alt="${pokemon.name}">
                <div class="card-body">
                    <h5 class="card-title">${pokemon.name || 'Unknown Pokémon'}</h5>
                    <p class="card-text">
                        <strong>Type:</strong> ${pokemon.type || 'Unknown'} <br>
                        <strong>HP:</strong> ${pokemon.hp || '0'} <br>
                        <strong>Attack:</strong> ${pokemon.attack || '0'} <br>
                        <strong>Description:</strong> ${pokemon.description || 'No description available.'}
                    </p>
                    <button class="btn btn-primary">Add to Deck</button>
                    <button class="btn btn-warning edit-pokemon" data-id="${pokemon.id}" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger delete-pokemon" data-id="${pokemon.id}" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join("");

    setupTooltips();
    setupDeleteButtons();
    setupPagination(pokemons.length);
    setupEditButtons();
}

function setupDeleteButtons() {
    let pokemonToDelete = null;
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    
    document.querySelectorAll(".delete-pokemon").forEach(button => {
        button.addEventListener("click", (event) => {
            const pokemonId = event.currentTarget.getAttribute("data-id");
            pokemonToDelete = pokemonId;
            modal.show();
        });
    });

    document.getElementById('confirmDelete').addEventListener('click', () => {
        if (pokemonToDelete) {
            pokemonService.deletePokemon(pokemonToDelete);
            renderPokemons();
        }
        modal.hide();
    });
}

function setupTooltips() {
    document.querySelectorAll(".edit-pokemon, .delete-pokemon").forEach(button => {
        new bootstrap.Tooltip(button);
    });
}

function setupPagination(totalPokemons) {
    const totalPages = Math.ceil(totalPokemons / POKEMONS_PER_PAGE);
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement("li");
        pageItem.className = `page-item ${i === currentPage ? "active" : ""}`;
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageItem.addEventListener("click", (event) => {
            event.preventDefault();
            currentPage = i;
            renderPokemons();
        });
        pagination.appendChild(pageItem);
    }
}

function setupEditButtons() {
    document.querySelectorAll(".edit-pokemon").forEach(button => {
        button.addEventListener("click", (event) => {
            const pokemonId = event.currentTarget.getAttribute("data-id");
            window.location.href = `create.html?id=${pokemonId}`;
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderPokemons();
});

