/*
 *  Since we are using the regular function keyword, 
 *   we can export our service instance up here.
 */
import Animal from './animal.js';

class AnimalService {
    constructor() {
        this.baseUrl = 'https://inft2202.opentech.durhamcollege.org/api/animals';
        this.apiKey = 'b9a56d20-a1c2-4140-82c9-143e6a045095';
    }

    async fetchData(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = {
            'apikey': this.apiKey,
            'Content-Type': 'application/json'
        };

        try {
            const response = await fetch(url, { headers, ...options });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} - ${response.statusText}`);
            }

            return response.status !== 204 ? response.json() : true;
        } catch (error) {
            console.error('Request failed:', error);
            throw new Error(`Request failed: ${error.message}`);
        }
    }

    async getAnimals(page = 1, perPage = 5) {
        const query = new URLSearchParams({ page, perPage }).toString();
        const data = await this.fetchData(`?${query}`);

        return {
            animals: data.records.map(record => new Animal({
                id: record.animalId,
                name: record.name,
                breed: record.breed,
                eyes: record.eyes,
                legs: record.legs,
                sound: record.sound,
                owner: record.author
            })),
            totalPages: Math.ceil(data.pagination.count / perPage),
            totalAnimals: data.pagination.count
        };
    }

    async getAnimalById(id) {
        const data = await this.fetchData(`/${encodeURIComponent(id)}`);
        return new Animal({
            id: data.animalId,
            name: data.name,
            breed: data.breed,
            eyes: data.eyes,
            legs: data.legs,
            sound: data.sound,
            owner: data.author
        });
    }

    async addAnimal(animalData) {
        return this.fetchData('', {
            method: 'POST',
            body: JSON.stringify(animalData)
        });
    }

    async updateAnimal(animalData) {
        return this.fetchData(`/${encodeURIComponent(animalData.id)}`, {
            method: 'PUT',
            body: JSON.stringify(animalData)
        });
    }

    async removeAnimal(id) {
        return this.fetchData(`/${encodeURIComponent(id)}`, {
            method: 'DELETE'
        });
    }
}

export default new AnimalService();