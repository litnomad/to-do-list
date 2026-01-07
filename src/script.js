import "./style.css";

// array for created projects

let projects = [];
console.log(projects);

class Project {
    constructor(project, id) {
        this.project = project;
        this.id = id;
    }
}

// array for created tasks

let list = [];

class Task {
    constructor(title, description, deadline, priority, projectTitle, id) {
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.priority = priority;
        this.project = projectTitle;
        this.id = id;
    }
}

// toggle pop up form for adding new projects

const main = document.querySelector('#main');
const sidebar = document.querySelector('#sidebar');
const popup = document.querySelector('.open-button');
const closeButton = document.querySelector('.btnCancel');
const submitButton = document.querySelector('button[type="submit"]');

const displayForm = () => document.querySelector(".form-popup").style.display = "block";
const hideForm = () => document.querySelector(".form-popup").style.display = "none";

popup.addEventListener('click', (event) => {
    displayForm();
    event.preventDefault();
})

closeButton.addEventListener('click', () => hideForm())

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
    button.setAttribute('type', 'submit');

    h3.innerText = projectTitle;
    button.innerText = 'add to do list';

    main.appendChild(div);
    div.appendChild(h3);
    div.appendChild(button);

    button.addEventListener('click', (event) => {
        toDoForm(id, projectTitle);
        event.preventDefault();
    });

    let proj = new Project(projectTitle, id);
    projects.push(proj);

    console.log(projects);

    storeProject();

}

// Display list array 

function displayList(task) {

    // attach tasks to their projects

    if (document.getElementById(task.id)) {

        const project = document.getElementById(`${task.id}`);
        const taskDiv = document.createElement('div');
        const taskTitle = document.createElement('p');
        const taskDescription = document.createElement('p');
        const taskDeadline = document.createElement('input');
        const deleteTask = document.createElement('button');

        // create dropdown selection for priority
        const taskPriority = document.createElement('select');
        const high = document.createElement('option');
        const medium = document.createElement('option');
        const low = document.createElement('option');

        high.setAttribute('value', 'high');
        medium.setAttribute('value', 'medium');
        low.setAttribute('value', 'low');

        high.textContent = 'high';
        medium.textContent = 'medium';
        low.textContent = 'low';

        taskPriority.appendChild(high);
        taskPriority.appendChild(medium);
        taskPriority.appendChild(low);

        taskPriority.setAttribute('name', 'priority');
        taskPriority.value = task.priority;

        taskDeadline.setAttribute('type', 'date');
        taskDeadline.setAttribute('value', task.deadline);

        taskTitle.textContent = task.title;
        taskDescription.textContent = task.description;
        deleteTask.textContent = 'delete';

        project.appendChild(taskDiv);
        taskDiv.appendChild(taskTitle);
        taskDiv.appendChild(taskDescription);
        taskDiv.appendChild(taskDeadline);
        taskDiv.appendChild(taskPriority);
        taskDiv.appendChild(deleteTask);

        deleteTask.addEventListener('click', () => {
            project.removeChild(taskDiv);

        });
    }

}

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

        let task = new Task(inputTitle.value, inputDescription.value, inputDeadline.value, inputPriority.value, projectTitle, id);
        list.push(task);
        console.log(list);

        storeList();

        displayList(task, id);

        event.preventDefault();
    });

}

// hide to do form after submission

// local storage and restoration of projects and to do lists 

// stores project as JSON string in local storage
function storeProject() {
    const myJSON1 = JSON.stringify(projects);
    localStorage.setItem('proj', myJSON1);
}

function retrieveProject() {
    let proj = localStorage.getItem('proj');
    projects = proj ? JSON.parse(proj) : [];
}

// stores list as JSON string in local storage
function storeList() {
    const myJSON = JSON.stringify(list);
    localStorage.setItem('testJSON', myJSON);
}

// retrieve JSON string of list as object for each page load
function retrieveList() {
    let string = localStorage.getItem('testJSON');
    list = string ? JSON.parse(string) : [];
}

retrieveProject();
console.log(projects);

retrieveList();

function loadProjects() {
    for (const proj of projects) {

        // create projects
        const div = document.createElement('div');
        const h3 = document.createElement('h3');
        const toDoButton = document.createElement('button');

        // create to do list
        const taskDiv = document.createElement('div');
        const taskTitle = document.createElement('p');
        const taskDescription = document.createElement('p');
        const taskDeadline = document.createElement('input');
        const deleteTask = document.createElement('button');

        const id = proj.id;
        div.setAttribute('id', id);
        toDoButton.setAttribute('type', 'submit');

        const projectTitle = proj.project;
        h3.textContent = projectTitle;
        toDoButton.textContent = 'add to do list';

        main.appendChild(div);
        div.appendChild(h3);
        div.appendChild(toDoButton);

        toDoButton.addEventListener('click', (event) => {
            toDoForm(id, projectTitle);
            event.preventDefault();
        });
    }
}

function loadList() {

    if (!list) {
        return false;
    }

    for (const item of list) {
        if (!document.getElementById(item.id)) {

            // create projects
            const div = document.createElement('div');
            const h3 = document.createElement('h3');
            const toDoButton = document.createElement('button');

            // create to do list
            const taskDiv = document.createElement('div');
            const taskTitle = document.createElement('p');
            const taskDescription = document.createElement('p');
            const taskDeadline = document.createElement('input');
            const deleteTask = document.createElement('button');

            // create dropdown selection for priority
            const taskPriority = document.createElement('select');
            const high = document.createElement('option');
            const medium = document.createElement('option');
            const low = document.createElement('option');

            high.setAttribute('value', 'high');
            medium.setAttribute('value', 'medium');
            low.setAttribute('value', 'low');

            high.textContent = 'high';
            medium.textContent = 'medium';
            low.textContent = 'low';

            taskPriority.appendChild(high);
            taskPriority.appendChild(medium);
            taskPriority.appendChild(low);

            taskPriority.setAttribute('name', 'priority');
            taskPriority.value = item.priority;

            taskDeadline.setAttribute('type', 'date');
            taskDeadline.setAttribute('name', 'deadline');
            taskDeadline.setAttribute('value', item.deadline);

            taskTitle.textContent = item.title;
            taskDescription.textContent = item.description;
            deleteTask.textContent = 'delete'

            const id = item.id;
            div.setAttribute('id', id);
            toDoButton.setAttribute('type', 'submit');

            const projectTitle = item.project;
            h3.textContent = projectTitle;
            toDoButton.textContent = 'add to do list';

            main.appendChild(div);
            div.appendChild(h3);
            div.appendChild(toDoButton);
            div.appendChild(taskDiv);
            taskDiv.appendChild(taskTitle);
            taskDiv.appendChild(taskDescription);
            taskDiv.appendChild(taskDeadline);
            taskDiv.appendChild(taskPriority);
            taskDiv.appendChild(deleteTask);

            toDoButton.addEventListener('click', (event) => {
                toDoForm(id, projectTitle);
                event.preventDefault();
            });

            deleteTask.addEventListener('click', () => {
                div.removeChild(taskDiv);
                list = list.filter((obj) => obj != item);
                console.log(list);
                storeList();
            });
        }

        else {
            if (document.getElementById(item.id)) {

                const project = document.getElementById(`${item.id}`);
                const taskDiv = document.createElement('div');
                const taskTitle = document.createElement('p');
                const taskDescription = document.createElement('p');
                const taskDeadline = document.createElement('input');
                const deleteTask = document.createElement('button');

                // create dropdown selection for priority
                const taskPriority = document.createElement('select');
                const high = document.createElement('option');
                const medium = document.createElement('option');
                const low = document.createElement('option');

                high.setAttribute('value', 'high');
                medium.setAttribute('value', 'medium');
                low.setAttribute('value', 'low');

                high.textContent = 'high';
                medium.textContent = 'medium';
                low.textContent = 'low';

                taskPriority.appendChild(high);
                taskPriority.appendChild(medium);
                taskPriority.appendChild(low);

                taskPriority.setAttribute('name', 'priority');
                taskPriority.value = item.priority;

                taskDeadline.setAttribute('type', 'date');
                taskDeadline.setAttribute('value', item.deadline);

                taskTitle.textContent = item.title;
                taskDescription.textContent = item.description;
                deleteTask.textContent = 'delete';

                project.appendChild(taskDiv);
                taskDiv.appendChild(taskTitle);
                taskDiv.appendChild(taskDescription);
                taskDiv.appendChild(taskDeadline);
                taskDiv.appendChild(taskPriority);
                taskDiv.appendChild(deleteTask);

                deleteTask.addEventListener('click', () => {
                    project.removeChild(taskDiv);
                    list = list.filter((obj) => obj != item);
                    console.log(list);
                    storeList();
                });
            }
        }
    }
}

loadProjects();
loadList();


