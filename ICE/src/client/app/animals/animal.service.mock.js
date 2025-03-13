import Animal from './animal.js';

function AnimalService() {
    if (!localStorage.getItem('animals')) {
        localStorage.setItem('animals', JSON.stringify([]));
    }
}

AnimalService.prototype.listAnimals = function (page = 1, perPage = 10) {
    const first = (page-1) * perPage;
    const last = first + perPage

    const animals = JSON.parse(localStorage.getItem('animals'))
    .map(animal => new Animal(animal))
    .slice(first, last);

    return animals
};


AnimalService.prototype.findAnimal = function (id) {
    const animals = this.listAnimals();
    const foundAnimal = animals.find(animal => animal.id === id);
    if (!foundAnimal) {
        throw new Error("That animal doesn't exist!");
    }
    return foundAnimal;
};

AnimalService.prototype.createAnimal = function (animalObject) {
    const animals = this.listAnimals();

    if (animals.some(animal => animal.name === animalObject.name)) {
        throw new Error("That animal already exists!");
    }

    animals.push(animalObject);
    localStorage.setItem('animals', JSON.stringify(animals));
    return true;
};

AnimalService.prototype.updateAnimal = function (animalObject) {
    const animals = this.listAnimals();
    const index = animals.findIndex(animal => animal.id === animalObject.id);

    if (index === -1) {
        throw new Error("That animal doesn't exist!");
    }

    animals[index] = animalObject;
    localStorage.setItem('animals', JSON.stringify(animals));
    return true;
};


AnimalService.prototype.deleteAnimal = function (animalObject) {
    const animals = this.listAnimals();
    const filteredAnimals = animals.filter(animal => animal.id !== animalObject.id);

    if (filteredAnimals.length === animals.length) {
        throw new Error("That animal doesn't exist!");
    }


    localStorage.setItem('animals', JSON.stringify(filteredAnimals));
    return true;
};

// AnimalService.prototype.waitTho = function () {
//     return new Promise((resolve, reject)) => setTimeout(resolve, timeout)
//     };

export default new AnimalService();
