/*
    Name: Diether Ocampo
    filename: app.js
    Course: INFT 2202
    Date: January 30, 2025
    Description: This is my general application script.
*/
console.log("app.js launched");

const currentYear = new Date().getFullYear(); 

console.log(currentYear);

document.getElementById('year').textContent = currentYear;