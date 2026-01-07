import "./style.css";

// toggle pop up form for adding new projects

const main = document.querySelector('#main');
const sidebar = document.querySelector('#sidebar');
const addProject = document.querySelector('.open-button');
const closeButton = document.querySelector('.btnCancel');
const submitButton = document.querySelector('button[type="submit"]');

const displayForm = () => document.querySelector(".form-popup").style.display = "block";
const hideForm = () => document.querySelector(".form-popup").style.display = "none";

addProject.addEventListener('click', (event) => {
    displayForm();
    event.preventDefault();
})

closeButton.addEventListener('click', (event) => hideForm())

// pop up submit button creates new project

submitButton.addEventListener('click', (event) => {
    createProject();
    hideForm();
    event.preventDefault();
})

// how project will be displayed on page

const createProject = () => {
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const projectTitle = document.querySelector('input[id=title]').value;
    const button = document.createElement('button');
    const id = window.crypto.randomUUID();

    div.setAttribute('id', id);

    console.log(div.getAttribute('id'));

    h3.innerText = projectTitle;
    button.innerText = 'add to do list';
    button.setAttribute('type', 'submit');

    main.appendChild(div);
    div.appendChild(h3);
    div.appendChild(button);

    button.addEventListener('click', (event) => {
        toDoForm(id, projectTitle);
        event.preventDefault();
    });
}

// creates new to do list items 

let list = [];

class createTask {
    constructor(title, description, deadline, priority, projectTitle, id) {
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.priority = priority;
        this.project = projectTitle;
        this.id = id;
    }
}

// Display list array 

function displayList(task) {

    // attach tasks to their project cards

    if (document.getElementById(task.id)) {

        const project = document.getElementById(`${task.id}`);
        const div = document.createElement('div');
        const title = document.createElement('p');
        const description = document.createElement('p');
        const inputDeadline = document.createElement('input');
        const deleteButton = document.createElement('button');

        // create dropdown selection for priority
        const inputPriority = document.createElement('select');
        const high = document.createElement('option');
        const medium = document.createElement('option');
        const low = document.createElement('option');

        high.setAttribute('value', 'high');
        medium.setAttribute('value', 'medium');
        low.setAttribute('value', 'low');

        high.textContent = 'high';
        medium.textContent = 'medium';
        low.textContent = 'low';

        inputPriority.appendChild(high);
        inputPriority.appendChild(medium);
        inputPriority.appendChild(low);

        inputPriority.setAttribute('name', 'priority');
        inputPriority.value = task.priority;

        inputDeadline.setAttribute('type', 'date');
        inputDeadline.setAttribute('value', task.deadline);

        title.textContent = task.title;
        description.textContent = task.description;
        deleteButton.textContent = 'delete';

        project.appendChild(div);
        div.appendChild(title);
        div.appendChild(description);
        div.appendChild(inputDeadline);
        div.appendChild(inputPriority);
        div.appendChild(deleteButton);

        deleteButton.addEventListener('click', (event) => {
            project.removeChild(div);

        });
    }

}


/* To Do List display

function displayList(task, id) {

    const project = document.getElementById(`${id}`);
    const div = document.createElement('div');
    const title = document.createElement('p');
    const description = document.createElement('p');
    const inputDeadline = document.createElement('input');
    const deleteButton = document.createElement('button');

    // create dropdown selection for priority
    const inputPriority = document.createElement('select');
    const high = document.createElement('option');
    const medium = document.createElement('option');
    const low = document.createElement('option');

    high.setAttribute('value', 'high');
    medium.setAttribute('value', 'medium');
    low.setAttribute('value', 'low');

    high.textContent = 'high';
    medium.textContent = 'medium';
    low.textContent = 'low';

    inputPriority.appendChild(high);
    inputPriority.appendChild(medium);
    inputPriority.appendChild(low);

    inputPriority.setAttribute('name', 'priority');
    inputPriority.value = task.priority;

    inputDeadline.setAttribute('type', 'date');
    inputDeadline.setAttribute('value', task.deadline);

    title.textContent = task.title;
    description.textContent = task.description;
    deleteButton.textContent = 'delete';

    project.appendChild(div);
    div.appendChild(title);
    div.appendChild(description);
    div.appendChild(inputDeadline);
    div.appendChild(inputPriority);
    div.appendChild(deleteButton);

    deleteButton.addEventListener('click', (event) => {
        project.removeChild(div);

    });

}
*/

// To Do List form  

const toDoForm = (id, projectTitle) => {
    const div = document.createElement('div');
    const form = document.createElement('form');
    const title = document.createElement('label');
    const description = document.createElement('label');
    const deadline = document.createElement('label');
    const priority = document.createElement('label');
    const inputTitle = document.createElement('input');
    const inputDescription = document.createElement('textarea');
    const inputDeadline = document.createElement('input');
    const inputPriority = document.createElement('select');
    const highPriority = document.createElement('option');
    const medPriority = document.createElement('option');
    const lowPriority = document.createElement('option');
    const submit = document.createElement('button');

    div.setAttribute('class', 'toDoContainer');
    form.setAttribute('class', 'toDoForm');

    inputDeadline.setAttribute('type', 'date');

    title.setAttribute('for', 'title');
    description.setAttribute('for', 'description');
    deadline.setAttribute('for', 'deadline');
    priority.setAttribute('for', 'priority');

    title.innerText = 'title:';
    description.innerText = 'description:';
    deadline.innerText = 'deadline:';
    priority.innerText = 'priority:'
    highPriority.innerText = 'high';
    medPriority.innerText = 'medium';
    lowPriority.innerText = 'low';
    submit.innerText = 'submit';

    inputTitle.setAttribute('id', 'title');
    inputDescription.setAttribute('id', 'description');
    inputDeadline.setAttribute('id', 'deadline');
    inputPriority.setAttribute('id', 'priority');
    highPriority.setAttribute('value', 'high');
    medPriority.setAttribute('value', 'medium');
    lowPriority.setAttribute('value', 'low');

    main.appendChild(form);
    form.appendChild(title);
    form.appendChild(inputTitle);
    form.appendChild(description);
    form.appendChild(inputDescription);
    form.appendChild(deadline);
    form.appendChild(inputDeadline);
    form.appendChild(priority);
    form.appendChild(inputPriority);
    inputPriority.appendChild(highPriority);
    inputPriority.appendChild(medPriority);
    inputPriority.appendChild(lowPriority);
    form.appendChild(submit);

    // submit button adds new items to To Do List
    submit.addEventListener('click', (event) => {
        let task = new createTask(inputTitle.value, inputDescription.value, inputDeadline.value, inputPriority.value, projectTitle, id);
        list.push(task);
        console.log(list);

        storeList();
        displayList(task, id);

        event.preventDefault();
    });

}

// hide to do form after submission


// local storage and retrieval of lists 

// stores list as JSON string in local storage
function storeList() {
    const myJSON = JSON.stringify(list);
    localStorage.setItem('testJSON', myJSON);
}

// retrieve JSON string of list as object for each page load
function retrieveList() {
    let string = localStorage.getItem('testJSON');
    list = JSON.parse(string);
}

retrieveList();
console.log(list);


function loadStorage() {

    if (!list) {
        return false;
    }

    for (const item of list) {
        if (!document.getElementById(item.id)) {

            // create projects
            const div = document.createElement('div');
            const h3 = document.createElement('h3');
            const projectTitle = item.project;
            const button = document.createElement('button');
            const id = item.id;

            console.log(id);
            div.setAttribute('id', id);
            console.log(div.getAttribute('id'))

            h3.innerText = projectTitle;
            button.innerText = 'add to do list';
            button.setAttribute('type', 'submit');

            // create to do list
            const div2 = document.createElement('div');
            const title = document.createElement('p');
            const description = document.createElement('p');
            const inputDeadline = document.createElement('input');
            const deleteButton = document.createElement('button');

            // create dropdown selection for priority
            const inputPriority = document.createElement('select');
            const high = document.createElement('option');
            const medium = document.createElement('option');
            const low = document.createElement('option');

            high.setAttribute('value', 'high');
            medium.setAttribute('value', 'medium');
            low.setAttribute('value', 'low');

            high.textContent = 'high';
            medium.textContent = 'medium';
            low.textContent = 'low';

            inputPriority.appendChild(high);
            inputPriority.appendChild(medium);
            inputPriority.appendChild(low);

            inputPriority.setAttribute('name', 'priority');
            inputPriority.value = item.priority;

            inputDeadline.setAttribute('type', 'date');
            inputDeadline.setAttribute('name', 'deadline');
            inputDeadline.setAttribute('value', item.deadline);

            title.textContent = item.title;
            description.textContent = item.description;
            deleteButton.textContent = 'delete'

            main.appendChild(div);
            div.appendChild(h3);
            div.appendChild(button);
            div.appendChild(div2);
            div2.appendChild(title);
            div2.appendChild(description);
            div2.appendChild(inputDeadline);
            div2.appendChild(inputPriority);
            div2.appendChild(deleteButton);

            button.addEventListener('click', (event) => {
                toDoForm(id, projectTitle);
                event.preventDefault();
            });

            deleteButton.addEventListener('click', () => {
                div.removeChild(div2);
                list = list.filter((obj) => obj != item);
                console.log(list);
                storeList();
            });
        }
        else {
            if (document.getElementById(item.id)) {

                const project = document.getElementById(`${item.id}`);
                const div = document.createElement('div');
                const title = document.createElement('p');
                const description = document.createElement('p');
                const inputDeadline = document.createElement('input');
                const deleteButton = document.createElement('button');

                // create dropdown selection for priority
                const inputPriority = document.createElement('select');
                const high = document.createElement('option');
                const medium = document.createElement('option');
                const low = document.createElement('option');

                high.setAttribute('value', 'high');
                medium.setAttribute('value', 'medium');
                low.setAttribute('value', 'low');

                high.textContent = 'high';
                medium.textContent = 'medium';
                low.textContent = 'low';

                inputPriority.appendChild(high);
                inputPriority.appendChild(medium);
                inputPriority.appendChild(low);

                inputPriority.setAttribute('name', 'priority');
                inputPriority.value = item.priority;

                inputDeadline.setAttribute('type', 'date');
                inputDeadline.setAttribute('value', item.deadline);

                // set the task div items to equal item.id or random number?
                // delete button 
                // set onclick attribute for delete button to call deleteTask()
                // deleteTask()
                // if div.id == this.id (button) then getElementbyID(this.id).remove()

                title.textContent = item.title;
                description.textContent = item.description;
                deleteButton.textContent = 'delete';

                project.appendChild(div);
                div.appendChild(title);
                div.appendChild(description);
                div.appendChild(inputDeadline);
                div.appendChild(inputPriority);
                div.appendChild(deleteButton);

                deleteButton.addEventListener('click', () => {
                    project.removeChild(div);
                    list = list.filter((obj) => obj != item);
                    console.log(list);
                    storeList();
                });
            }
        }
    }
}

loadStorage();


