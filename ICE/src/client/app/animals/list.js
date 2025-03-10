import animalService from "../animal.service.mock.js";

function list(recordPage) {
    const container = document.createElement('div');
    container.classList.add('container');

    const divWaiting = document.createElement('div');
    divWaiting.classList.add('text-center');
    divWaiting.innerHTML = '<i class="fa fa-5x fa-spinner fa-spin"></i>';
    container.append(divWaiting);

    const divMessage = document.createElement('div');
    divMessage.classList.add('alert', 'text-center', 'd-none');
    container.append(divMessage);

    function drawPagination({ page = 1, perPage = 5, pages = 10 }) {
        function addPage(number, text, style) {
            return `<li class="page-item ${style}">
                        <a class="page-link" href="./list.html?page=${number}&perPage=${perPage}">${text}</a>
                    </li>`
        }
        const pagination = document.createElement('div');
        const ul = document.createElement("ul"); // Create the ul element here
        ul.classList.add('pagination');

        if (pages > 1) {
            pagination.classList.remove('d-none');
        }

        ul.insertAdjacentHTML('beforeend', addPage(page - 1, 'Previous', (page == 1) ? 'disabled' : ''));
        for (let i = 1; i <= pages; i++) {
            ul.insertAdjacentHTML('beforeend', addPage(i, i, (i == page) ? 'active' : ''));
        }
        ul.insertAdjacentHTML('beforeend', addPage(page + 1, 'Next', (page == pages) ? 'disabled' : ''));

        pagination.append(ul); // Now append the ul to the pagination div
        return pagination;
    }

    function drawAnimalTable(animals) {
        const eleTable = document.createElement('table');
        eleTable.classList.add('table', 'table-striped');
        const thead = eleTable.createTHead();
        const row = thead.insertRow();
        const headers = ['Name', 'Breed', 'Legs', 'Eyes', 'Sound'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            row.appendChild(th);
        });
        for (let animal of animals) {
            const row = eleTable.insertRow();
            row.insertCell().textContent = animal.name;
            row.insertCell().textContent = animal.breed;
            row.insertCell().textContent = animal.legs;
            row.insertCell().textContent = animal.eyes;
            row.insertCell().textContent = animal.sound;
            const eleBtnCell = row.insertCell();
            const eleBtnDelete = document.createElement('button');
            eleBtnDelete.classList.add('btn', 'btn-danger', 'mx-1');
            eleBtnDelete.innerHTML = `<i class="fa fa-trash"></i>`;
            eleBtnDelete.addEventListener('click', onDeleteButtonClick(animal));
            eleBtnCell.append(eleBtnDelete);
            const eleBtnEdit = document.createElement('a');
            eleBtnEdit.classList.add('btn', 'btn-primary', 'mx-1');
            eleBtnEdit.innerHTML = `<i class="fa fa-user"></i>`;
            eleBtnEdit.href = `./animal.html?name=${animal.name}`
            eleBtnCell.append(eleBtnEdit);
        }
        return eleTable;
    }

    function onDeleteButtonClick(animal) {
        return event => {
            animalService.deleteAnimal(animal.name).then(() => { window.location.reload(); });
        }
    }

    function createContent() {
        const params = new URLSearchParams(recordPage);
        const url = new URL(`/api/animals?${params.toString()}`, 'https://inft2202.opentech.durhamcollege.org');
        const req = new Request(url, {
            headers: {
                'User': '100944258',
                'apiKey': '3816cc78-08c7-498e-96f7-325edb238ea2'
            },
            method: 'GET',
        });

        fetch(req)
            .then(response => {
                if (!response.ok) {
                    // More specific error handling
                    if (response.status === 401) {
                        throw new Error('Unauthorized: Please check your API key and User ID.');
                    } else if (response.status === 404) {
                        throw new Error('API not found. Please check the URL.'); // Example of a more specific error
                    } else {
                        throw new Error('Network response was not ok. Status: ' + response.status);
                    }
                }
                return response.json();
            })
            .then((ret) => {
                let { records, pagination } = ret;
                divWaiting.classList.add('d-none');
                let header = document.createElement('div');
                header.classList.add('d-flex', 'justify-content-between');
                let h1 = document.createElement('h1');
                h1.innerHTML = 'Animal List';
                header.append(h1);
                header.append(drawPagination(pagination));
                container.append(header);
                container.append(drawAnimalTable(records));
            })
            .catch(err => {
                divWaiting.classList.add('d-none');
                divMessage.innerHTML = err.message; // Display the error message
                divMessage.classList.remove('d-none');
                divMessage.classList.add('alert-danger');
            });
        return container;
    }

    return {
        element: createContent()
    }
}

export default list;