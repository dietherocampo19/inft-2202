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