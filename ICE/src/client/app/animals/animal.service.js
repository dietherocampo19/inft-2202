/*
    Name: Diether Ocampo
    filename: animal.service.js
    Course: INFT 2202
    Date: January 10, 2025
    Description: API service for managing animals.
*/

const API_KEY = "3816cc78-08c7-498e-96f7-325edb238ea2"; // ⬅️ Replace this with your actual API key.

export default new AnimalService({
    host: 'https://inft2202.opentech.durhamcollege.org/api', // Correct base URL
    apikey: API_KEY, // Pass API key properly
});

/*
 *  Constructor
 */
function AnimalService({ host, apikey }) {
    this.host = host;
    this.headers = new Headers({
        "Content-Type": "application/json",
        "apikey": apikey, // Ensure API key is included in headers
    });
}

/*
 * Fetch a specific animal by name
 */
AnimalService.prototype.findAnimal = async function(name) {
    const url = new URL(`/animals/${name}`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'GET',
    });
    try {
        const res = await fetch(req);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        return await res.json();
    } catch (err) {
        console.error("findAnimal failed:", err);
        throw err;
    }
}

/*
 * Fetch paginated animals
 */
AnimalService.prototype.getAnimalPage = async function({ page = 1, perPage = 8 }) {
    const params = new URLSearchParams({ page, perPage });
    const url = new URL(`/animals?${params.toString()}`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'GET',
    });
    try {
        const res = await fetch(req);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        return await res.json();
    } catch (err) {
        console.error("getAnimalPage failed:", err);
        throw err;
    }
}

/*
 * Save a new animal
 */
AnimalService.prototype.saveAnimal = async function(animal) {
    const url = new URL(`/animals`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'POST',
        body: JSON.stringify(animal),
    });
    try {
        const res = await fetch(req);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        return await res.json();
    } catch (err) {
        console.error("saveAnimal failed:", err);
        throw err;
    }
}

/*
 * Update an existing animal
 */
AnimalService.prototype.updateAnimal = async function(animal) {
    const url = new URL(`/animals`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'PUT',
        body: JSON.stringify(animal),
    });
    try {
        const res = await fetch(req);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        return await res.json();
    } catch (err) {
        console.error("updateAnimal failed:", err);
        throw err;
    }
}

/*
 * Delete an animal by name
 */
AnimalService.prototype.deleteAnimal = async function(name) {
    const url = new URL(`/animals/${name}`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'DELETE',
    });
    try {
        const res = await fetch(req);
        if (res.status === 204) return true; // Success
        throw new Error(`Error ${res.status}: ${res.statusText}`);
    } catch (err) {
        console.error("deleteAnimal failed:", err);
        throw err;
    }
}
