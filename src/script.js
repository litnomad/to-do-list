import "./style.css";

// array for created projects
let projects = [];

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

const displayForm = (selector) => document.querySelector(selector).style.display = "block";
const hideForm = (selector) => document.querySelector(selector).style.display = "none";

popup.addEventListener('click', (event) => {
    event.preventDefault();

    displayForm(".form-popup");
})

closeButton.addEventListener('click', () => hideForm(".form-popup"))

// pop up submit button creates new project

submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    createProject();
    hideForm(".form-popup");
})

// function for creating and pushing projects into an array

function projectArray(name, ref) {
    let proj = new Project(name, ref);
    projects.push(proj);
    storeProject();
    return { proj };
}

// how project will be displayed on page

const createProject = () => {

    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const projectTitle = document.querySelector('input[id=title]').value; // pass projects.title; call createProject in loadProjects()?
    const toDoButton = document.createElement('button');
    const id = window.crypto.randomUUID();
    const deleteProject = document.createElement('button');

    // return true when pop up submit button is clicked
    // if pop up submit is true, then projectTitle = input[id=title] and id = random
    // call projectArray() to push new project into projects array
    // else projectTitle = projects.title and id = projects.id, and toDoForm(projects.id, ..)
    // do not call projectArray in loadProjects()...
    // filter array...
    // should I use factory function to return hidden variables 
    // return div, h3, if..then.., append,  

    div.setAttribute('id', id);
    toDoButton.setAttribute('type', 'submit');

    h3.textContent = projectTitle;
    toDoButton.textContent = 'add to do list';
    deleteProject.textContent = 'delete project';

    main.appendChild(div);
    div.appendChild(h3);
    div.appendChild(toDoButton);
    div.appendChild(deleteProject);

    toDoButton.addEventListener('click', (event) => {
        event.preventDefault();
        toDoForm(id, projectTitle);
    });

    projectArray(projectTitle, id);

    deleteProject.addEventListener('click', () => {
        main.removeChild(div);

        const index = projects.indexOf(projectArray(projectTitle, id).proj);
        projects.splice(index, 1);
        storeProject();

    })
}

// To Do form  

const toDoForm = (id, projectTitle) => {

    if (document.querySelector('.toDoFormContainer')) {
        document.querySelector('.toDoFormContainer').remove();
        return false;
    }

    const project = document.getElementById(`${id}`);
    const div = document.createElement('div');
    const form = document.createElement('form');
    const title = document.createElement('label');
    const description = document.createElement('label');
    const deadline = document.createElement('label');
    const priority = document.createElement('label');
    const inputTitle = document.createElement('input');
    const inputDescription = document.createElement('textarea');
    const inputDeadline = document.createElement('input');
    const submit = document.createElement('button');

    const inputPriority = document.createElement('select');
    ['high', 'medium', 'low'].forEach(v => {
        const inputOption = document.createElement('option');
        inputOption.value = v; inputOption.textContent = v;
        inputPriority.appendChild(inputOption);
    })

    div.setAttribute('class', 'toDoFormContainer');
    form.setAttribute('class', 'toDoForm');

    inputDeadline.setAttribute('type', 'date');

    title.setAttribute('for', 'title');
    description.setAttribute('for', 'description');
    deadline.setAttribute('for', 'deadline');
    priority.setAttribute('for', 'priority');

    title.innerText = 'title:';
    description.innerText = 'description:';
    deadline.innerText = 'deadline:';
    priority.innerText = 'priority:';
    submit.innerText = 'submit';

    inputTitle.setAttribute('id', 'title');
    inputDescription.setAttribute('id', 'description');
    inputDeadline.setAttribute('id', 'deadline');
    inputPriority.setAttribute('id', 'priority');

    // attach to do form below project container

    project.appendChild(div);
    div.appendChild(form);
    form.appendChild(title);
    form.appendChild(inputTitle);
    form.appendChild(description);
    form.appendChild(inputDescription);
    form.appendChild(deadline);
    form.appendChild(inputDeadline);
    form.appendChild(priority);
    form.appendChild(inputPriority);
    form.appendChild(submit);

    // submit button adds new items to To Do List

    submit.addEventListener('click', (event) => {
        event.preventDefault();

        // stores task in array
        let task = new Task(inputTitle.value, inputDescription.value, inputDeadline.value, inputPriority.value, projectTitle, id);
        list.push(task);

        console.log(list);
        storeList();

        displayList(task, id);

        hideForm('.toDoFormContainer');
    });

}

// how tasks will be displayed on page 

function displayList(task) {

    if (document.getElementById(`${task.id}`)) {

        const project = document.getElementById(`${task.id}`);

        const taskDiv = document.createElement('div');
        const taskTitle = document.createElement('p');
        const taskDescription = document.createElement('p');
        const deleteTask = document.createElement('button');
        const taskDeadline = document.createElement('input');

        // checkbox 
        const label = document.createElement('label');
        const taskCheckBox = document.createElement('input');

        // priority dropdown 
        const taskPriority = document.createElement('select');
        ['high', 'medium', 'low'].forEach(v => {
            const opt = document.createElement('option');
            opt.value = v; opt.textContent = v;
            taskPriority.appendChild(opt);
        });

        label.setAttribute('for', `${task.title}`);
        taskCheckBox.setAttribute('id', `${task.title}`);
        taskCheckBox.setAttribute('type', 'checkbox');
        taskCheckBox.setAttribute('value', 'checked');

        taskPriority.setAttribute('name', 'priority');
        taskPriority.value = task.priority;

        taskDeadline.setAttribute('type', 'date');
        taskDeadline.setAttribute('name', 'deadline');
        taskDeadline.setAttribute('value', task.deadline);
        deleteTask.setAttribute('class', 'delete-task');

        label.textContent = 'complete:';
        taskTitle.textContent = task.title;
        taskDescription.textContent = task.description;
        deleteTask.textContent = 'delete';

        // taskDiv keeps getting replaced with each iteration?
        project.appendChild(taskDiv);
        console.log('appending taskDiv for', task.title, taskDiv)
        taskDiv.appendChild(taskTitle);
        taskDiv.appendChild(taskDescription);
        taskDiv.appendChild(taskDeadline);
        taskDiv.appendChild(taskPriority);
        taskDiv.appendChild(label);
        taskDiv.appendChild(taskCheckBox);
        taskDiv.appendChild(deleteTask);

        deleteTask.addEventListener('click', () => {
            project.removeChild(taskDiv);
            list = list.filter((obj) => obj != task);
            console.log(list);
            storeList();
        })

        taskCheckBox.addEventListener('click', (event) => {
            const statusUpdate = event.target.checked;
            console.log(statusUpdate);
            list[list.indexOf(task)].status = statusUpdate;
            console.log(list);
            storeList();
        })
        taskDeadline.addEventListener('click', (event) => {
            const deadlineUpdate = event.target.value;
            console.log(deadlineUpdate);
            list[list.indexOf(task)].deadline = deadlineUpdate;
            console.log(list);
            storeList();
        })

    }

}

// local storage of projects and to do lists 

// stores project as JSON string in local storage
function storeProject() {
    const myJSON1 = JSON.stringify(projects);
    localStorage.setItem('proj', myJSON1);
}

// retrieve JSON string of projects as object for each page load
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
console.log(list);

function loadProjects() {
    for (const proj of projects) {

        // create projects
        const div = document.createElement('div');
        const h3 = document.createElement('h3');
        const toDoButton = document.createElement('button');
        const deleteProject = document.createElement('button');

        const id = proj.id;
        div.setAttribute('id', id);
        toDoButton.setAttribute('type', 'submit');

        const projectTitle = proj.project;
        h3.textContent = projectTitle;
        toDoButton.textContent = 'add to do list';
        deleteProject.textContent = 'delete project';

        main.appendChild(div);
        div.appendChild(h3);
        div.appendChild(toDoButton);
        div.appendChild(deleteProject);

        toDoButton.addEventListener('click', (event) => {
            toDoForm(id, projectTitle);
            event.preventDefault();
        });

        deleteProject.addEventListener('click', () => {
            main.removeChild(div);

            // delete project and list
            projects = projects.filter(obj => obj !== proj);
            console.log(projects);
            storeProject();

            list = list.filter(obj => obj.id !== proj.id);
            storeList();

        })

    }
}

function loadList() {

    if (!list) {
        return false;
    }

    for (const item of list) {

        if (document.getElementById(`${item.id}`)) {

            const project = document.getElementById(`${item.id}`);

            // create task elements
            const taskDiv = document.createElement('div');
            const taskTitle = document.createElement('p');
            const taskDescription = document.createElement('p');
            const taskDeadline = document.createElement('input');
            const deleteTask = document.createElement('button');

            // checkbox 
            const label = document.createElement('label');
            const taskCheckBox = document.createElement('input');

            // priority dropdown
            const taskPriority = document.createElement('select');
            ['high', 'medium', 'low'].forEach(v => {
                const opt = document.createElement('option');
                opt.value = v; opt.textContent = v;
                taskPriority.appendChild(opt);
            });

            label.setAttribute('for', `${item.title}`);
            taskCheckBox.setAttribute('id', `${item.title}`);
            taskCheckBox.setAttribute('type', 'checkbox');
            taskCheckBox.setAttribute('value', 'checked');

            if (item.status === true) { taskCheckBox.checked = true; }
            else if (item.status === false) { taskCheckBox.checked = false; }

            taskPriority.setAttribute('name', 'priority');
            taskPriority.value = item.priority;

            taskDeadline.setAttribute('type', 'date');
            taskDeadline.setAttribute('name', 'deadline');
            taskDeadline.setAttribute('value', item.deadline);
            deleteTask.setAttribute('class', 'delete-task');

            label.textContent = 'complete:';
            taskTitle.textContent = item.title;
            taskDescription.textContent = item.description;
            deleteTask.textContent = 'delete';

            // taskDiv keeps getting replaced with each iteration?
            project.appendChild(taskDiv);
            console.log('appending taskDiv for', item.title, taskDiv)
            taskDiv.appendChild(taskTitle);
            taskDiv.appendChild(taskDescription);
            taskDiv.appendChild(taskDeadline);
            taskDiv.appendChild(taskPriority);
            taskDiv.appendChild(label);
            taskDiv.appendChild(taskCheckBox);
            taskDiv.appendChild(deleteTask);

            deleteTask.addEventListener('click', () => {
                project.removeChild(taskDiv);
                list = list.filter((obj) => obj != item);
                console.log(list);
                storeList();
            })

            taskCheckBox.addEventListener('click', (event) => {
                const statusUpdate = event.target.checked;
                console.log(statusUpdate);
                console.log(list.indexOf(item));
                list[list.indexOf(item)].status = statusUpdate;
                console.log(list);
                storeList();
            })

            taskDeadline.addEventListener('click', (event) => {
                const deadlineUpdate = event.target.value;
                console.log(deadlineUpdate);
                list[list.indexOf(item)].deadline = deadlineUpdate;
                console.log(list);
                storeList();
            })
        }
    }
}

loadProjects();
loadList();


