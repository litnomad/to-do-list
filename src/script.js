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

// how project will be displayed on page

const createProject = () => {
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const title = document.querySelector('input[id=title]').value;
    const button = document.createElement('button');
    const id = window.crypto.randomUUID();

    div.id = id;
    div.classList.add(id); // how do I create a unique class for each project?

    h3.innerText = title;
    button.innerText = 'add to do list';

    main.appendChild(div);
    div.appendChild(h3);
    div.appendChild(button);

    button.addEventListener('click', (event) => {
        toDoForm();
        event.preventDefault();
    });

}

// submit button creates new project

submitButton.addEventListener('click', (event) => {
    createProject();
    hideForm();
    event.preventDefault();
})

// creates new to do list items 

let list = [];

class createTask {
    constructor(title, description, deadline, priority) {
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.priority = priority;
    }
}

// To Do List display

function displayList() {

    for (const item of list) {

        const project = document.querySelector(`.${item.title}`); // Mixing up task with project title //
        const div = document.createElement('div');
        const title = document.createElement('p');
        const description = document.createElement('p');
        const deadline = document.createElement('p');
        const inputPriority = document.createElement('select');
        const highPriority = document.createElement('option');
        const mediumPriority = document.createElement('option');
        const lowPriority = document.createElement('option');

        inputPriority.setAttribute('class', '.inputPriority');
        /* document.querySelector('.inputPriority').value = 'list.inputPriority'; */

        title.innerText = item.title;
        description.innerText = item.description;
        deadline.innerText = item.deadline;

        project.appendChild(div);
        div.appendChild(title);
        div.appendChild(description);

    }

}

// To Do List form  

const toDoForm = () => {
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
        let task = new createTask(inputTitle.value, inputDescription.value, inputDeadline.value, inputPriority.value);
        list.push(task);
        console.log(list);

        storeList();
        displayList();

        event.preventDefault()
    });

}

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

/* retrieveList(); 
console.log(list)
console.log(list[1].title);
*/

