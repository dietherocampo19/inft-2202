/*
    Name: Diether Ocampo
    filename: search.js
    Course: INFT 2202
    Date: January 10, 2025
    Description: Handles searching, displaying, and deleting animals.
*/
import AnimalService from "./animal.service.js";

document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#animalTable tbody");

    // Function to redraw the table
    function redrawTable() {
        AnimalService.getAnimalPage({ page: 1, perPage: 10 }).then(animals => {
            tableBody.innerHTML = "";
            animals.forEach(animal => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${animal.name}</td>
                    <td>${animal.species}</td>
                    <td>${animal.age}</td>
                    <td><button class="delete-btn" data-name="${animal.name}">Delete</button></td>
                `;
                tableBody.appendChild(row);
            });
        });
    }

    // Event delegation for delete buttons
    tableBody.addEventListener("click", async (event) => {
        if (event.target.classList.contains("delete-btn")) {
            event.preventDefault();
            const name = event.target.getAttribute("data-name");
            const success = await AnimalService.deleteAnimal(name);
            
            if (success) {
                redrawTable();
                if (tableBody.children.length === 0) {
                    alert("No more animals left.");
                }
            } else {
                alert("Failed to delete animal.");
            }
        }
    });

    redrawTable(); // Initial table load
});