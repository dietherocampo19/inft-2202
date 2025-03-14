import Animal from './animal.js';

function AnimalService() {
    this.host = 'https://inft2202.opentech.durhamcollege.org';
    this.apikey = '3816cc78-08c7-498e-96f7-325edb238ea2';
}

AnimalService.prototype.handleResponse = async function(response, errorMessage) {
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || error.error || errorMessage);
    }
    return response.json();
};

AnimalService.prototype.getRequestOptions = function(method, body = null) {
    return {
        method,
        headers: {
            'apikey': this.apikey,
            'Content-Type': 'application/json'
        },
        ...(body && { body: JSON.stringify(body) })
    };
};

AnimalService.prototype.listAnimals = async function(page = 1, perPage = 5) {
    try {
        const url = new URL('/api/animals', this.host);
        url.search = new URLSearchParams({ page, perPage }).toString();

        const response = await fetch(url, this.getRequestOptions('GET'));
        const data = await this.handleResponse(response, 'Failed to fetch animals');
        
        const totalPages = Math.ceil(data.pagination.count / perPage);

        return {
            animals: data.records.map(record => new Animal({
                id: record.id, // Changed from animalId to id based on API response
                name: record.name,
                breed: record.breed,
                eyes: record.eyes,
                legs: record.legs,
                sound: record.sound,
                owner: record.owner
            })),
            totalPages,
            totalAnimals: data.pagination.count
        };
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

AnimalService.prototype.findAnimal = async function(id) {
    try {
        const url = new URL(`/api/animals/${id}`, this.host);
        const response = await fetch(url, this.getRequestOptions('GET'));
        const data = await this.handleResponse(response, `Animal with ID ${id} not found`);
        
        return new Animal({
            animalId: data.animalId,
            name: data.name,
            breed: data.breed,
            eyes: data.eyes,
            legs: data.legs,
            sound: data.sound,
            owner: data.owner
        });
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

AnimalService.prototype.createAnimal = async function(animalObject) {
    try {
        const url = new URL('/api/animals', this.host);
        const response = await fetch(url, this.getRequestOptions('POST', {
            name: animalObject.name,
            breed: animalObject.breed,
            eyes: animalObject.eyes,
            legs: animalObject.legs,
            sound: animalObject.sound
        }));
        await this.handleResponse(response, 'Failed to create animal');
        return true;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

AnimalService.prototype.updateAnimal = async function(animalObject) {
    try {
        const url = new URL(`/api/animals/${animalObject.Id}`, this.host);
        const response = await fetch(url, this.getRequestOptions('PUT', {
            name: animalObject.name,
            breed: animalObject.breed,
            eyes: animalObject.eyes,
            legs: animalObject.legs,
            sound: animalObject.sound
        }));
        await this.handleResponse(response, 'Failed to update animal');
        return true;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

AnimalService.prototype.deleteAnimal = async function(id) {
    try {
        const url = new URL(`/api/animals/${id}`, this.host);
        const response = await fetch(url, this.getRequestOptions('DELETE'));
        if (response.status === 204) {
            return true;
        }
        await this.handleResponse(response, 'Failed to delete animal');
        return true;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export default new AnimalService();