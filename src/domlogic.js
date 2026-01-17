import { createToDoItem, createProject, changeDeadline, changePriority, markComplete, deleteTodo, deleteProject, retrieveProjectData, retrieveListData, projects, list } from './applicationlogic.js'

const main = document.querySelector('#main');
const sidebar = document.querySelector('#sidebarLinks');
const dialog = document.querySelector('dialog');
const showButton = document.querySelector('#openDialog');
const closeButton = document.querySelector('dialog button');
const confirm = document.querySelector('#confirmBtn')
const inputProject = document.querySelector('input#title');

// event listeners for "add link"

showButton.addEventListener('click', () => {
    dialog.showModal();
});

closeButton.addEventListener('click', () => {
    dialog.close();
})

confirm.addEventListener('click', (event) => {
    event.preventDefault();
    dialog.close();

    const projectId = crypto.randomUUID();
    const projectTitle = inputProject.value;
    // sends project data to application logic
    createProject(projectId, projectTitle);
    // displays project on page
    createProjectElements(projectId, projectTitle);
})

// how project will be displayed on page

const createProjectElements = (projectId, projectTitle) => {

    const projectDiv = document.createElement('div');
    const headerContainer = document.createElement('div');
    const header = document.createElement('h3');
    const links = document.createElement('div');
    const toDoButton = document.createElement('button');
    const deleteProject = document.createElement('button');

    headerContainer.setAttribute('class', 'header');
    links.setAttribute('class', 'headerLinks');
    projectDiv.setAttribute('class', 'projectDiv');
    projectDiv.setAttribute('id', projectId);
    toDoButton.setAttribute('type', 'submit');

    header.textContent = projectTitle;
    toDoButton.textContent = 'add to do list';
    deleteProject.textContent = 'delete project';

    main.appendChild(projectDiv);
    projectDiv.appendChild(headerContainer);
    headerContainer.appendChild(header);
    headerContainer.appendChild(links);
    links.appendChild(toDoButton);
    links.appendChild(deleteProject);

    toDoButton.addEventListener('click', (event) => {
        event.preventDefault();
        // creates dialog 
        createToDoFormDialog(projectId);
        // opens dialog 
        const dialogSelector = document.querySelector(`dialog[id="${projectId}"]`);
        if (dialogSelector) {
            // fixes fail to show modal because of open dialog bug
            if (dialogSelector.hasAttribute('open')) { dialogSelector.close() }
            dialogSelector.showModal();
        };
        // renders to do form 
        toDoForm(projectTitle, projectId);
    });

    deleteProject.addEventListener('click', () => {
        main.removeChild(projectDiv);
    })

}

// creates dialog element for to do form

const dial = document.createElement('dialog');

const createToDoFormDialog = (projectId) => {

    const project = document.getElementById(`${projectId}`);

    dial.setAttribute('id', `${projectId}`);

    project.appendChild(dial);

    return dial;
}

dial.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        dial.innerHTML = '';
        dial.remove();
    }
});

// creates to do form elements 

const toDoForm = (projectTitle, projectId) => {

    const form = document.createElement('form');
    const title = document.createElement('label');
    const description = document.createElement('label');
    const deadline = document.createElement('label');
    const priority = document.createElement('label');
    const inputTitle = document.createElement('input');
    const inputDescription = document.createElement('textarea');
    const inputDeadline = document.createElement('input');
    const submit = document.createElement('button');
    const cancel = document.createElement('button');

    const inputPriority = document.createElement('select');
    ['high', 'medium', 'low'].forEach(v => {
        const inputOption = document.createElement('option');
        inputOption.value = v; inputOption.textContent = v;
        inputPriority.appendChild(inputOption);
    })

    form.setAttribute('class', 'toDoForm');
    form.setAttribute('method', 'dialog');
    inputDeadline.setAttribute('type', 'datetime-local');
    submit.setAttribute('type', 'submit');

    inputTitle.setAttribute('name', 'title');
    inputDescription.setAttribute('name', 'description');
    inputDeadline.setAttribute('name', 'deadline');
    inputPriority.setAttribute('name', 'priority');

    title.setAttribute('for', 'title');
    description.setAttribute('for', 'description');
    deadline.setAttribute('for', 'deadline');
    priority.setAttribute('for', 'priority');

    title.textContent = 'title:';
    description.textContent = 'description:';
    deadline.textContent = 'deadline:';
    priority.textContent = 'priority:';
    submit.textContent = 'submit';
    cancel.textContent = 'cancel';

    inputTitle.setAttribute('id', 'title');
    inputDescription.setAttribute('id', 'description');
    inputDeadline.setAttribute('id', 'deadline');
    inputPriority.setAttribute('id', 'priority');

    dial.appendChild(form);
    form.appendChild(title);
    form.appendChild(inputTitle);
    form.appendChild(description);
    form.appendChild(inputDescription);
    form.appendChild(deadline);
    form.appendChild(inputDeadline);
    form.appendChild(priority);
    form.appendChild(inputPriority);
    form.appendChild(submit);
    form.appendChild(cancel);

    submit.addEventListener('click', (event) => {
        event.preventDefault();
        // sends form data of to do item to application logic
        let item = createToDoItem(projectTitle, projectId, inputTitle.value, inputDescription.value, inputDeadline.value, inputPriority.value, false).getItem();
        // resets dial node for next element create
        dial.innerHTML = '';
        dial.remove();
        // creates elements for to do item
        displayList(item);
    });

    cancel.addEventListener('click', () => {
        dial.close();
        // resets dial node for next element create
        dial.innerHTML = '';
        dial.remove();
    })

}

// how tasks will be displayed on page 

function displayList(item) {

    const project = document.getElementById(`${item.id}`);

    // to do elements
    const taskDiv = document.createElement('div');
    const taskTitle = document.createElement('p');
    const taskDescription = document.createElement('p');
    const taskDeadline = document.createElement('input');
    const taskCompleteLabel = document.createElement('label');
    const taskComplete = document.createElement('input');
    const deleteTask = document.createElement('button');

    // priority dropdown elements
    const taskPriority = document.createElement('select');
    ['high', 'medium', 'low'].forEach(v => {
        const opt = document.createElement('option');
        opt.value = v; opt.textContent = v;
        taskPriority.appendChild(opt);
    });

    taskDiv.setAttribute('class', 'taskDiv');
    deleteTask.setAttribute('class', 'deleteTask');

    taskCompleteLabel.setAttribute('for', 'complete');
    taskComplete.setAttribute('id', 'complete');

    taskComplete.setAttribute('type', 'checkbox');
    taskDeadline.setAttribute('type', 'datetime-local');

    taskPriority.setAttribute('name', 'priority');
    taskDeadline.setAttribute('name', 'deadline');
    taskComplete.setAttribute('name', item.title);

    taskDeadline.setAttribute('value', item.deadline);
    taskPriority.value = item.priority;

    taskCompleteLabel.textContent = 'complete:';
    taskTitle.textContent = item.title;
    taskDescription.textContent = item.description;
    deleteTask.textContent = 'delete';

    project.appendChild(taskDiv);
    console.log('appending taskDiv for', item.title, taskDiv)
    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(taskDescription);
    taskDiv.appendChild(taskDeadline);
    taskDiv.appendChild(taskPriority);
    taskDiv.appendChild(taskCompleteLabel);
    taskDiv.appendChild(taskComplete);
    taskDiv.appendChild(deleteTask);

    deleteTask.addEventListener('click', () => {
        project.removeChild(taskDiv);
        deleteTodo(item);
    })

    taskComplete.addEventListener('click', (event) => {
        markComplete(event, item);
    })

    taskDeadline.addEventListener('change', () => {
        const dateSelected = taskDeadline.value;
        changeDeadline(dateSelected, item);
    })

    taskPriority.addEventListener('change', () => {
        const prioritySelected = taskPriority.value;
        changePriority(prioritySelected, item);
    })

}

// renders page from local storage

function loadProjects() {

    retrieveProjectData();

    for (const proj of projects) {

        const projectDiv = document.createElement('div');
        const headerContainer = document.createElement('div');
        const header = document.createElement('h3');
        const links = document.createElement('div');
        const toDoButton = document.createElement('button');
        const deleteProjectButton = document.createElement('button');

        const projectId = proj.id;
        const projectTitle = proj.project;

        headerContainer.setAttribute('class', 'header');
        links.setAttribute('class', 'headerLinks')
        projectDiv.setAttribute('class', 'projectDiv');
        projectDiv.setAttribute('id', projectId);
        toDoButton.setAttribute('type', 'submit');

        header.textContent = projectTitle;
        toDoButton.textContent = 'add to do list';
        deleteProjectButton.textContent = 'delete project';

        main.appendChild(projectDiv);
        projectDiv.appendChild(headerContainer);
        headerContainer.appendChild(header);
        headerContainer.appendChild(links);
        links.appendChild(toDoButton);
        links.appendChild(deleteProjectButton);

        toDoButton.addEventListener('click', (event) => {
            event.preventDefault();
            // creates dialog 
            createToDoFormDialog(projectId);
            // opens dialog 
            const dialogSelector = document.querySelector(`dialog[id="${projectId}"]`);
            if (dialogSelector) {
                // fixes fail to show modal because of open dialog bug
                if (dialogSelector.hasAttribute('open')) { dialogSelector.close() }
                dialogSelector.showModal();
            };
            // renders to do form 
            toDoForm(projectTitle, projectId);
        });

        deleteProjectButton.addEventListener('click', () => {
            main.removeChild(projectDiv);
            deleteProject(proj);
        })

    }
}

function loadList() {

    retrieveListData();

    for (const item of list) {

        const project = document.getElementById(`${item.id}`);

        // to do elements
        const taskDiv = document.createElement('div');
        const taskTitle = document.createElement('p');
        const taskDescription = document.createElement('p');
        const taskDeadline = document.createElement('input');
        const taskCompleteLabel = document.createElement('label');
        const taskComplete = document.createElement('input');
        const deleteTask = document.createElement('button');

        // priority dropdown elements
        const taskPriority = document.createElement('select');
        ['high', 'medium', 'low'].forEach(v => {
            const opt = document.createElement('option');
            opt.value = v; opt.textContent = v;
            taskPriority.appendChild(opt);
        });

        taskDiv.setAttribute('class', 'taskDiv');
        deleteTask.setAttribute('class', 'deleteTask');

        taskComplete.setAttribute('type', 'checkbox');
        taskDeadline.setAttribute('type', 'datetime-local');

        taskPriority.setAttribute('name', 'priority');
        taskDeadline.setAttribute('name', 'deadline');
        taskComplete.setAttribute('name', item.title);

        taskComplete.setAttribute('value', 'complete');
        taskDeadline.setAttribute('value', item.deadline);

        taskCompleteLabel.textContent = 'complete:';
        taskTitle.textContent = item.title;
        taskDescription.textContent = item.description;
        deleteTask.textContent = 'delete';

        taskPriority.value = item.priority;
        taskComplete.checked = item.status;

        taskCompleteLabel.appendChild(taskComplete);

        project.appendChild(taskDiv);
        console.log('appending taskDiv for', item.title, taskDiv)
        taskDiv.appendChild(taskTitle);
        taskDiv.appendChild(taskDescription);
        taskDiv.appendChild(taskDeadline);
        taskDiv.appendChild(taskPriority);
        taskDiv.appendChild(taskCompleteLabel);
        taskDiv.appendChild(deleteTask);

        deleteTask.addEventListener('click', () => {
            project.removeChild(taskDiv);
            deleteTodo(item);
        })

        taskComplete.addEventListener('click', (event) => {
            markComplete(event, item);
        })

        taskDeadline.addEventListener('change', () => {
            const dateSelected = taskDeadline.value;
            changeDeadline(dateSelected, item);
        })

        taskPriority.addEventListener('change', () => {
            const prioritySelected = taskPriority.value;
            changePriority(prioritySelected, item);
        })

    }

}

loadProjects();
loadList();


