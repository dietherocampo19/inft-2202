/*
    Name: Diether Ocampo
    Filename: pokemon.js
    Course: INFT 2202
    Date: January 30, 2025
    Description: This is my Pokémon script.
*/

export default function Pokemon({ id = null, name, type, price, stock, description }) {
    this.id = id ?? crypto.randomUUID();
    this.name = name;
    this.type = type;
    this.price = price;
    this.stock = stock;
    this.description = description;
}

Pokemon.prototype.toString = function () {
    return `${this.name} - Type: ${this.type}, Price: $${this.price}, Stock: ${this.stock}, Description: ${this.description}`;
};

Pokemon.prototype.toJSON = function () {
    return {
        id: this.id,
        name: this.name,
        type: this.type,
        price: this.price,
        stock: this.stock,
        description: this.description
    };
};

