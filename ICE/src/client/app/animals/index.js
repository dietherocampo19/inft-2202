/*
    Name: Diether Ocampo
    filename: index.js
    Course: INFT 2202
    Date: January 10 2025
    Description: 
*/
import animalService from "./animal.service.mock.js";

function animal() {
    const form = document.createElement('form');
    let description = 'Add Animal';
    function createContent() {
        const container = document.createElement('div');
        container.classList.add('mb-2');
        //create animal form content
        const mb3Name = document.createElement('div');
        mb3Name.classList.add('mb-3');
        mb3Name.innerHTML = '<label for="name" class="form-label">Animal Name</label>'
        '<input type="text" class="form-control" id="name" name="name">'
        '<p class="text-danger d-none">currently hidden</p>'
        container.append(mb3Name);
        const mb3Breed = document.createElement('div');
        mb3Breed.classList.add('mb-3');
        mb3Brred.innerHTML = '<label for="breed" class="form-label">Animal Breed</label>'
        '<input type="text" class="form-control" id="breed" name="breed">'
        '<p class="text-danger d-none"></p>'
        container.append(mb3Breed);
        const mb3Legs = document.createElement('div');
        mb3Legs.classList.add('mb-3');
        mb3Legs.innerHTML = '<label for="legs" class="form-label">Number of Legs</label>'
        '<input type="text" class="form-control" id="legs" name="legs">'
        '<p class="text-danger d-none"></p>'
        container.append(mb3Legs);
        const mb3Eyes = document.createElement('div');
        mb3Eyes.classList.add('mb-3');
        mb3Eyes.innerHTML = '<label for="eyes" class="form-label">Number of Eyes</label>'
        '<input type="text" class="form-control" id="eyes" name="eyes">'
        '<p class="text-danger d-none"></p>'
        container.append(mb3Eyes);
        const mb3Sound = document.createElement('div');
        mb3Sound.classList.add('mb-3');
        mb3Sound.innerHTML ='<label for="sound" class="form-label">Sound this animal makes</label>'
        '<input type="text" class="form-control" id="sound" name="sound">'
        '<p class="text-danger d-none"></p>'
        container.append(mb3Sound);
        



        ///
        form.append(container);
        return form;
    }
    function validate() {
        let valid = true;
        // validate form

        // return if the form is valid or not
        return valid
    }    
    // create a handler to deal with the submit event
    function submit() {
        // validate the form

        // do stuff if the form is valid

    }
    
    // assign a handler to the submit event
    form.addEventListener('submit', function (event) {
        // prevent the default action from happening
        event.preventDefault();
        submit();
    });
    
    return {
        description,
        element: createContent()
    }
}

export default animal;