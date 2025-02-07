/*
    Name: Diether Ocampo
    filename: search.js
    Course: INFT 2202
    Date: January 10, 2025
    Description: Handles searching, displaying, and deleting animals.
*/
/*
    Name: Diether Ocampo
    filename: search.js
    Course: INFT 2202
    Date: January 10, 2025
    Description: Handles searching, displaying, and deleting animals.
*/

// Wait for the DOM to load before executing
document.addEventListener("DOMContentLoaded", () => {
    loadAnimalList();
});

// Function to load the list of animals
async function loadAnimalList() {
    try {
        const animals = await animalService.getAnimals(); // Fetch all animals
        const tableBody = document.getElementById("animal-table-body");
        tableBody.innerHTML = ""; // Clear existing rows

        if (animals.length === 0) {
            document.getElementById("no-animals-message").classList.remove("d-none");
            document.getElementById("animal-table").classList.add("d-none");
        } else {
            document.getElementById("no-animals-message").classList.add("d-none");
            document.getElementById("animal-table").classList.remove("d-none");

            animals.forEach(animal => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${animal.name}</td>
                    <td>${animal.type}</td>
                    <td>${animal.eyes}</td>
                    <td>${animal.legs}</td>
                    <td>
                        <button class="btn btn-warning btn-sm edit-btn" data-id="${animal.id}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-btn" data-id="${animal.id}">Delete</button>
                    </td>
                `;

                tableBody.appendChild(row);
            });
        }

        attachEventListeners();
    } catch (error) {
        console.error("Error loading animals:", error);
    }
}

// Function to attach event listeners to buttons
function attachEventListeners() {
    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", event => {
            const animalId = event.target.getAttribute("data-id");
            window.location = `create.html?id=${animalId}`; // Redirect to edit page
        });
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", async event => {
            event.preventDefault();
            const animalId = event.target.getAttribute("data-id");

            if (confirm("Are you sure you want to delete this animal?")) {
                try {
                    await animalService.deleteAnimal(animalId);
                    loadAnimalList(); // Reload the list after deletion
                } catch (error) {
                    console.error("Error deleting animal:", error);
                }
            }
        });
    });
}

