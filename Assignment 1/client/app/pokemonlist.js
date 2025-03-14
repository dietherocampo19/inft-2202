const pokemonService = new PokemonService();

// Fetch query parameters for page and perPage
const params = new URLSearchParams(window.location.search);
let currentPage = parseInt(params.get('page') || '1');
let perPage = parseInt(params.get('perPage') || '10');

async function loadPokemons() {
    try {
        const data = await pokemonService.getAll(currentPage, perPage);
        displayPokemons(data.products);
        setupPagination(data.totalPages);
    } catch (error) {
        console.error('Error loading Pokémon:', error);
    }
}

function displayPokemons(pokemons) {
    const pokemonContainer = document.getElementById('pokemon-list');
    pokemonContainer.innerHTML = '';

    pokemons.forEach(pokemon => {
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');
        pokemonCard.innerHTML = `
            <h3>${pokemon.name}</h3>
            <p>Type: ${pokemon.type}</p>
            <p>Price: $${pokemon.price}</p>
            <p>Stock: ${pokemon.stock}</p>
            <p>Description: ${pokemon.description}</p>
            <p>Listed By: ${pokemon.owner ? pokemon.owner : 'N/A'}</p>
            <p>Listed At: ${new Date(pokemon.listedAt).toLocaleString()}</p>
            <button class="edit-button" onclick="editPokemon(${pokemon.id})">Edit</button>
            <button class="delete-button" onclick="deletePokemon(${pokemon.id})">Delete</button>
        `;
        pokemonContainer.appendChild(pokemonCard);
    });
}

function setupPagination(totalPages) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    // Previous button
    const prevButton = document.createElement('button');
    prevButton.innerText = 'Previous';
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => navigateToPage(currentPage - 1);
    paginationContainer.appendChild(prevButton);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.classList.toggle('active', i === currentPage);
        pageButton.onclick = () => navigateToPage(i);
        paginationContainer.appendChild(pageButton);
    }

    // Next button
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = () => navigateToPage(currentPage + 1);
    paginationContainer.appendChild(nextButton);
}

function navigateToPage(page) {
    currentPage = page;
    window.location.search = `?page=${currentPage}&perPage=${perPage}`;
    loadPokemons();
}

loadPokemons();