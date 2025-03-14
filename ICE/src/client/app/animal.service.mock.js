/*
 *  Since we are using the regular function keyword, 
 *   we can export our service instance up here.
 */
export default new AnimalService({
    host: 'https://inft2202-server.onrender.com/',  // Make sure this is correct
    user: '100944258'  // Replace with your actual student ID
});

/*
 *  Constructor
 */
function AnimalService({ host, user }) {
    this.host = host;
    this.headers = new Headers({
        'Content-Type': 'application/json',
        'user': user
    });
}

/*
 *
 */
AnimalService.prototype.findAnimal = async function(name) {
    const url = new URL(`/api/animals/${name}`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'GET',
    });
    try {
        const res = await fetch(req);
        return res.json();
    } catch (err) {
        console.error('Error fetching animal:', err);
        return false;
    }
}

/*
 *
 */
AnimalService.prototype.getAnimalPage = async function({ page = 1, perPage = 8 }) {
    const params = new URLSearchParams({ page, perPage });
    const url = new URL(`/api/animals?${params.toString()}`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'GET',
    });
    try {
        const res = await fetch(req);
        return res.json();
    } catch (err) {
        console.error('Error fetching animal page:', err);
        return false;
    }
}

/*
 *
 */
AnimalService.prototype.saveAnimal = async function(animals) {
    const url = new URL(`/api/animals`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'POST',
        body: JSON.stringify(animals)
    });
    try {
        const res = await fetch(req);
        return res.json();
    } catch (err) {
        console.error('Error saving animal:', err);
        return false;
    }
}

/*
 *
 */
AnimalService.prototype.updateAnimal = async function(animal) {
    const url = new URL(`/api/animals`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'PUT',
        body: JSON.stringify(animal)
    });
    try {
        const res = await fetch(req);
        return res.json();
    } catch (err) {
        console.error('Error updating animal:', err);
        return false;
    }
}

/*
 *
 */
AnimalService.prototype.deleteAnimal = async function(name) {
    const url = new URL(`/api/animals/${name}`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'DELETE',
    });
    try {
        const res = await fetch(req);
        if (res.status === 204) {
            return true;
        }
        return false;
    } catch (err) {
        console.error('Error deleting animal:', err);
        return false;
    }
}