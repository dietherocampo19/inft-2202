/*
    Name: Diether Ocampo
    Filename: animal.js
    Course: INFT 2202
    Date: MArch 13, 2025
    Description: This is  animal script.
*/

export default class Animal {
    constructor({ id = null, name, breed, eyes, legs, sound }) {
        this.id = id ?? crypto.randomUUID();
        Object.assign(this, { name, breed, eyes, legs, sound });
    }

    toString() {
        return `<strong>${this.name}</strong> is a <strong>${this.breed}</strong> with <strong>${this.eyes}</strong> eyes, <strong>${this.legs}</strong> legs, and makes a "<strong>${this.sound}</strong>" sound.`;
    }    

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            breed: this.breed,
            eyes: this.eyes,
            legs: this.legs,
            sound: this.sound
        };
    }
}