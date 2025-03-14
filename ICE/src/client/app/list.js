/*
    Name: Diether Ocampo
    filename: list.js
    Course: INFT 2202
    Date: January 10 2025
    Description: 
*/


import animalService from "./animal.service.mock.js";

console.log("we are on the list page");

const params = new URL(document.location).searchParams;

// Add records for pagination test
let recCount = params.get("records");
if (recCount !== null) {
  let animals = [];
  for (let index = 0; index < recCount; index++) {
    animals.push({
      name: `name ${index}`,
      breed: "Grizzly Bear",
      legs: 4,
      eyes: 2,
      sound: "Moo",
    });
  }
  animalService.saveAnimal(animals);
}

// Get references to elements
const eleEmpty = document.getElementById("empty-message");
const eleTable = document.getElementById("animal-list");
const eleWaiting = document.getElementById("waiting");
const eleErrorMessage = document.getElementById("error-message");

let recordPage = {
  page: Number(params.get("page") ?? 1),
  perPage: Number(params.get("perPage") ?? 7),
};

// Function to fetch and display animals
async function loadAnimals() {
  try {
    const { records, pagination } = await animalService.getAnimalPage(recordPage);
    
    eleWaiting.classList.add("d-none");

    if (!records.length) {
      eleEmpty.classList.remove("d-none");
      eleTable.classList.add("d-none");
    } else {
      eleEmpty.classList.add("d-none");
      eleTable.classList.remove("d-none");
      drawAnimalTable(records);
      drawPagination(pagination);
    }
  } catch (ex) {
    if (eleWaiting) {
      eleWaiting.classList.add("d-none");
    }
    if (eleErrorMessage) {
      eleErrorMessage.textContent = ex;
      eleErrorMessage.classList.remove("d-none");
    }
  }
}

/* Draw pagination */
function drawPagination({ page = 1, perPage = 5, pages = 10 }) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = ""; // Clear old pagination

  if (pages > 1) {
    pagination.classList.remove("d-none");
  }

  const ul = document.createElement("ul");
  ul.classList.add("pagination");

  ul.insertAdjacentHTML("beforeend", addPage(page - 1, "Previous", page === 1 ? "disabled" : ""));
  for (let i = 1; i <= pages; i++) {
    ul.insertAdjacentHTML("beforeend", addPage(i, i, i === page ? "active" : ""));
  }
  ul.insertAdjacentHTML("beforeend", addPage(page + 1, "Next", page === pages ? "disabled" : ""));

  pagination.appendChild(ul);

  function addPage(number, text, style) {
    return `<li class="page-item ${style}">
              <a class="page-link" href="./list.html?page=${number}&perPage=${perPage}">${text}</a>
            </li>`;
  }
}

/* Draw table */
function drawAnimalTable(animals) {
  eleTable.querySelector("tbody").innerHTML = ""; // Clear table before inserting new rows

  for (let animal of animals) {
    const row = eleTable.insertRow();

    row.insertCell().textContent = animal.name;
    row.insertCell().textContent = animal.breed;
    row.insertCell().textContent = animal.legs;
    row.insertCell().textContent = animal.eyes;
    row.insertCell().textContent = animal.sound;

    const eleBtnCell = row.insertCell();

    // Delete button
    const eleBtnDelete = document.createElement("button");
    eleBtnDelete.classList.add("btn", "btn-danger", "mx-1");
    eleBtnDelete.innerHTML = `<i class="fa fa-trash"></i>`;
    eleBtnDelete.addEventListener("click", () => onDeleteButtonClick(animal));
    eleBtnCell.appendChild(eleBtnDelete);

    // Edit button
    const eleBtnEdit = document.createElement("a");
    eleBtnEdit.classList.add("btn", "btn-primary", "mx-1");
    eleBtnEdit.innerHTML = `<i class="fa fa-user"></i>`;
    eleBtnEdit.href = `./animal.html?name=${animal.name}`;
    eleBtnCell.appendChild(eleBtnEdit);
  }
}

/* Delete function */
function onDeleteButtonClick(animal) {
  animalService.deleteAnimal(animal.name).then(() => {
    window.location.reload();
  });
}

// Call function to load animals when script runs
loadAnimals();