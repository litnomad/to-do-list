import { createToDoItem, createProject, changeDeadline, changePriority, markComplete, deleteTodo, deleteProject, retrieveProject, retrieveList, projects, list } from './applicationlogic.js'

const main = document.querySelector('#main');
const sidebar = document.querySelector('#sidebar');
const dialog = document.querySelector('dialog');
const showButton = document.querySelector('.openDialog');
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

    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const toDoButton = document.createElement('button');
    const deleteProject = document.createElement('button');

    div.setAttribute('id', projectId);
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
        main.removeChild(div);
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

    const inputPriority = document.createElement('select');
    ['high', 'medium', 'low'].forEach(v => {
        const inputOption = document.createElement('option');
        inputOption.value = v; inputOption.textContent = v;
        inputPriority.appendChild(inputOption);
    })

    form.setAttribute('class', 'toDoForm');
    form.setAttribute('method', 'dialog');

    inputDeadline.setAttribute('type', 'date');

    submit.setAttribute('type', 'submit');
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

    submit.addEventListener('click', (event) => {
        event.preventDefault();
        // sends form data of to do item to application logic
        let task = createToDoItem(projectTitle, projectId, inputTitle.value, inputDescription.value, inputDeadline.value, inputPriority.value, false).getItem();
        // resets dial node for next element create
        dial.innerHTML = '';
        dial.remove();
        // creates elements for to do item
        displayList(task);
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
            deleteTodo(task);
        })

        taskCheckBox.addEventListener('click', (event) => {
            markComplete(event, task);
        })

        taskDeadline.addEventListener('change', () => {
            const dateSelected = taskDeadline.value;
            changeDeadline(dateSelected, task);
        })

        taskPriority.addEventListener('change', () => {
            const prioritySelected = taskPriority.value;
            changePriority(prioritySelected, task);
        })

    }

}

// renders page from local storage

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
        const deleteProjectButton = document.createElement('button');

        const projectId = proj.id;
        const projectTitle = proj.project;

        div.setAttribute('id', projectId);
        toDoButton.setAttribute('type', 'submit');

        h3.textContent = projectTitle;
        toDoButton.textContent = 'add to do list';
        deleteProjectButton.textContent = 'delete project';

        main.appendChild(div);
        div.appendChild(h3);
        div.appendChild(toDoButton);
        div.appendChild(deleteProjectButton);

        toDoButton.addEventListener('click', (event) => {
            event.preventDefault();
            // creates dialog 
            createToDoFormDialog(projectId);
            // opens dialog 
            const dialogSelector = document.querySelector(`dialog[id="${projectTitle}"]`);
            if (dialogSelector) {
                // fixes fail to show modal because of open dialog bug
                if (dialogSelector.hasAttribute('open')) { dialogSelector.close() }
                dialogSelector.showModal();
            };
            // renders to do form 
            toDoForm(projectTitle, projectId);
        });

        deleteProjectButton.addEventListener('click', () => {
            main.removeChild(div);
            deleteProject(proj);
        })

    }
}

function loadList() {

    if (!list) {
        console.log('Load list failed. No list data found in local storage.');
        return;
    }

    for (const item of list) {

        if (document.getElementById(`${item.id}`)) {

            const project = document.getElementById(`${item.id}`);

            // to do elements
            const taskDiv = document.createElement('div');
            const taskTitle = document.createElement('p');
            const taskDescription = document.createElement('p');
            const taskDeadline = document.createElement('input');
            const deleteTask = document.createElement('button');

            // checkbox elements
            const label = document.createElement('label');
            const taskCheckBox = document.createElement('input');

            // priority dropdown elements
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
                deleteTodo(item);
            })

            taskCheckBox.addEventListener('click', (event) => {
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
}

loadProjects();
loadList();


