export default new AnimalService({
    host: 'https://inft2202.opentech.durhamcollege.org/api/animals',
    apiKey: '3816cc78-08c7-498e-96f7-325edb238ea2' // Replace with your actual API Key
});

/*
 * Constructor
 */
function AnimalService({ host, apiKey }) {
    this.host = host;
    this.headers = new Headers({
        'Content-Type': 'application/json',
        'apikey': apiKey
    });
}

/*
 * Get animal by name
 */
AnimalService.prototype.findAnimal = async function(name) {
    const url = `${this.host}/${name}`;
    try {
        const res = await fetch(url, {
            headers: this.headers,
            method: 'GET',
        });
        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
        return res.json();
    } catch (err) {
        console.error("Error fetching animal:", err);
        return false;
    }
}

/*
 * Get paginated list of animals
 */
AnimalService.prototype.getAnimalPage = async function({ page = 1, perPage = 5 }) {
    const url = `${this.host}?page=${page}&perPage=${perPage}`;
    try {
        const res = await fetch(url, {
            headers: this.headers,
            method: 'GET',
        });
        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
        return res.json();
    } catch (err) {
        console.error("Error fetching animal list:", err);
        return false;
    }
}

/*
 * Save a new animal
 */
AnimalService.prototype.saveAnimal = async function(animal) {
    const url = this.host;
    try {
        const res = await fetch(url, {
            headers: this.headers,
            method: 'POST',
            body: JSON.stringify(animal)
        });
        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
        return res.json();
    } catch (err) {
        console.error("Error saving animal:", err);
        return false;
    }
}

/*
 * Update an existing animal (Corrected)
 */
AnimalService.prototype.updateAnimal = async function(updatedAnimal) {
    const url = this.host; // No ID in URL, uses name in body
    try {
        const res = await fetch(url, {
            headers: this.headers,
            method: 'PUT',
            body: JSON.stringify(updatedAnimal)
        });
        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
        return res.json();
    } catch (err) {
        console.error("Error updating animal:", err);
        return false;
    }
}

/*
 * Delete an animal by name (Corrected)
 */
AnimalService.prototype.deleteAnimal = async function(name) {
    const url = `${this.host}/${name}`;
    try {
        const res = await fetch(url, {
            headers: this.headers,
            method: 'DELETE',
        });
        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
        return res.json(); // Return the JSON response
    } catch (err) {
        console.error("Error deleting animal:", err);
        return false;
    }
}