/*
    Name: Diether Ocampo
    Filename: pokemon.js
    Course: INFT 2202
    Date: January 30, 2025
    Description: This is my Pokémon script.
*/

export default function Pokemon({ id = null, name, type, hp, attack, description, imageUrl }) {
    this.id = id ?? crypto.randomUUID();
    this.name = name;
    this.type = type;
    this.hp = hp;
    this.attack = attack;
    this.description = description;
    this.imageUrl = imageUrl;
}

Pokemon.prototype.toString = function () {
    return `${this.name} - Type: ${this.type}, HP: ${this.hp}, Attack: ${this.attack}, Description: ${this.description}`;
};

Pokemon.prototype.toJSON = function () {
    return {
        id: this.id,
        name: this.name,
        type: this.type,
        hp: this.hp,
        attack: this.attack,
        description: this.description,
        imageUrl: this.imageUrl
    };
};
