export default class AnimalService {
    constructor() {
      this.apiUrl = 'https://inft2202.opentech.durhamcollege.org/api/animals';
      this.apiKey = '3816cc78-08c7-498e-96f7-325edb238ea2'; // Replace this with your actual API key
    }
  
    async getAllAnimals() {
      try {
        const response = await fetch(this.apiUrl, {
          method: 'GET',
          headers: {
            'apikey': this.apiKey,
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch animals: ${response.status}`);
        }
  
        return await response.json();
      } catch (error) {
        console.error('Error fetching animals:', error);
        return [];
      }
    }
  
    async getAnimalById(id) {
      try {
        const response = await fetch(`${this.apiUrl}/${id}`, {
          method: 'GET',
          headers: {
            'apikey': this.apiKey,
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch animal ${id}: ${response.status}`);
        }
  
        return await response.json();
      } catch (error) {
        console.error(`Error fetching animal ${id}:`, error);
        return null;
      }
    }
  
    async createAnimal(animalData) {
      try {
        const response = await fetch(this.apiUrl, {
          method: 'POST',
          headers: {
            'apikey': this.apiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(animalData)
        });
  
        if (!response.ok) {
          throw new Error(`Failed to create animal: ${response.status}`);
        }
  
        return await response.json();
      } catch (error) {
        console.error('Error creating animal:', error);
        return null;
      }
    }
  
    async updateAnimal(id, animalData) {
      try {
        const response = await fetch(`${this.apiUrl}/${id}`, {
          method: 'PUT',
          headers: {
            'apikey': this.apiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(animalData)
        });
  
        if (!response.ok) {
          throw new Error(`Failed to update animal ${id}: ${response.status}`);
        }
  
        return await response.json();
      } catch (error) {
        console.error(`Error updating animal ${id}:`, error);
        return null;
      }
    }
  
    async deleteAnimal(id) {
      try {
        const response = await fetch(`${this.apiUrl}/${id}`, {
          method: 'DELETE',
          headers: {
            'apikey': this.apiKey
          }
        });
  
        if (!response.ok) {
          throw new Error(`Failed to delete animal ${id}: ${response.status}`);
        }
  
        return true;
      } catch (error) {
        console.error(`Error deleting animal ${id}:`, error);
        return false;
      }
    }
    async listAnimals(page = 1, perPage = 5) {
        const url = `${this.baseUrl}?page=${page}&perPage=${perPage}`;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: { "apikey": this.apiKey }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            return await response.json(); // Return only the body
        } catch (error) {
            console.error("Failed to fetch animals:", error);
            throw error;
        }
    }
}

  