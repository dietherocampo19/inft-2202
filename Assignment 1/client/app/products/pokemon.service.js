class PokemonService {
    constructor() {
        this.host = 'https://inft2202.opentech.durahmcollege.org/api/products';
        this.apikey = '3816cc78-08c7-498e-96f7-325edb238ea2'; // Replace with your actual API key
    }

    async fetchData(url, options = {}) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apikey}`,
        });
        
        const request = new Request(url, {
            ...options,
            headers,
        });

        const response = await fetch(request);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return response.json();
    }

    // Create Pokémon
    async create(pokemonData) {
        const url = this.host;
        const options = {
            method: 'POST',
            body: JSON.stringify(pokemonData),
        };
        return this.fetchData(url, options);
    }

    // Get Pokémon by ID
    async get(id) {
        const url = `${this.host}/${id}`;
        return this.fetchData(url);
    }

    // Get all Pokémon with pagination
    async getAll(page = 1, perPage = 10) {
        const url = `${this.host}?page=${page}&perPage=${perPage}`;
        return this.fetchData(url);
    }

    // Update Pokémon
    async update(id, pokemonData) {
        const url = `${this.host}/${id}`;
        const options = {
            method: 'PUT',
            body: JSON.stringify(pokemonData),
        };
        return this.fetchData(url, options);
    }

    // Delete Pokémon
    async delete(id) {
        const url = `${this.host}/${id}`;
        const options = { method: 'DELETE' };
        return this.fetchData(url, options);
    }
}
