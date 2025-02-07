/*
    Name: Diether Ocampo
    filename: index.js
    Course: INFT 2202
    Date: January 10 2025
    Description: 
*/
import animalService from "../animal.service.mock.js";

async function animal(name) {
    const form = document.createElement('form');
    let description = 'Add Animal';
    let animal = null;

    function createContent() {
        const container = document.createElement('div');
        container.classList.add('mb-2');

        const mb3Name = document.createElement('div');
        mb3Name.classList.add('mb-3');
        let editableInput = `<input type="text" class="form-control" id="name" name="name">`;
        let readonlyInput = `<input type="text" class="form-control" id="name" name="name" value="${animal ? animal.name : ""}" readonly>`;
        mb3Name.innerHTML = `<label for="name" class="form-label">Animal Name</label>` +
            (animal ? readonlyInput : editableInput) +
            `<p class="text-danger d-none"></p>`;
        container.append(mb3Name);

        const fields = ["breed", "legs", "eyes", "sound"];
        fields.forEach(field => {
            const div = document.createElement('div');
            div.classList.add('mb-3');
            div.innerHTML = `<label for="${field}" class="form-label">${field.charAt(0).toUpperCase() + field.slice(1)}</label>` +
                `<input type="text" class="form-control" id="${field}" name="${field}" value="${animal ? animal[field] : ""}">` +
                `<p class="text-danger d-none"></p>`;
            container.append(div);
        });

        const submitBtn = document.createElement('div');
        submitBtn.innerHTML = `<button type="submit" class="btn btn-primary">
            Save Animal <i class="fa-solid fa-check"></i>
        </button>`;
        container.append(submitBtn);

        form.append(container);
        return form;
    }

    function validate() {
        let valid = true;
        const fields = ["name", "breed", "legs", "eyes"];
        fields.forEach(field => {
            const input = form[field];
            const errorElement = input.nextElementSibling;
            if (!input.value.trim()) {
                errorElement.classList.remove('d-none');
                errorElement.textContent = `Please enter ${field}!`;
                valid = false;
            } else {
                errorElement.classList.add('d-none');
            }
        });

        if (isNaN(form.legs.value) || isNaN(form.eyes.value)) {
            form.legs.nextElementSibling.classList.remove('d-none');
            form.legs.nextElementSibling.textContent = "This must be a number.";
            valid = false;
        }

        return valid;
    }

    async function submit(action) {
        if (validate()) {
            const formData = new FormData(form);
            const animalObject = {};
            formData.forEach((value, key) => {
                animalObject[key] = key === "legs" || key === "eyes" ? Number(value) : value;
            });

            try {
                if (action === "new") {
                    await animalService.saveAnimal(animalObject);
                } else {
                    await animalService.updateAnimal(animalObject);
                }
                form.reset();
                window.location = "./list.html";
            } catch (error) {
                console.log(error);
                form.name.nextElementSibling.classList.remove('d-none');
                form.name.nextElementSibling.textContent = "This animal already exists!";
            }
        }
    }

    if (!name) {
        form.addEventListener('submit', event => {
            event.preventDefault();
            submit("new");
        });
    } else {
        description = "Update Animal";
        animal = await animalService.findAnimal(name);
        form.addEventListener('submit', event => {
            event.preventDefault();
            submit("update");
        });
    }

    return {
        description,
        element: createContent()
    };
}

export default animal;