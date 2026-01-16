// array for to do items
let list = [];
let projects = [];

class Project {
    constructor(projectId, projectTitle) {
        this.id = projectId;
        this.project = projectTitle;
    }
}

export const createProject = function (projectId, projectTitle) {
    let proj = new Project(projectId, projectTitle);
    projects.push(proj);
    console.log(projects);
    localStorage.setItem('projects', JSON.stringify(projects));
}

class Todo {

    constructor(projectTitle, projectId, todoName, description, deadline, priority, status = false) {
        this.project = projectTitle;
        this.id = projectId;
        this.title = todoName;
        this.description = description;
        this.deadline = deadline;
        this.priority = priority;
        this.status = status;
    }

}

export const createToDoItem = function (projectTitle, projectId, todoName, description, deadline, priority, status = false) {
    let item = new Todo(projectTitle, projectId, todoName, description, deadline, priority, status = false);
    list.push(item);
    console.log(list);
    localStorage.setItem('list', JSON.stringify(list));

    let getItem = () => item;

    return { getItem };
}

export function changeDeadline(dateSelected, task) {
    // look for item in array and change its property
    list[list.indexOf(task)].deadline = dateSelected;
    console.log(list);
    localStorage.setItem('list', JSON.stringify(list));
}

export function changePriority(prioritySelected, task) {
    // look for item in array and change its property
    list[list.indexOf(task)].priority = prioritySelected;
    console.log(list);
    localStorage.setItem('list', JSON.stringify(list));
}

export function markComplete(event, task) {
    // look for item in array and change its property
    list[list.indexOf(task)].status = event.target.checked;
    console.log(list);
    localStorage.setItem('list', JSON.stringify(list));
}

export function deleteTodo(task) {
    // look for item in array and delete it
    list = list.filter((obj) => obj != task);
    console.log(list);
    localStorage.setItem('list', JSON.stringify(list));
}

export function deleteProject(proj) {
    // look for project in array and delete it along with any associated to do list
    projects = projects.filter(obj => obj !== proj);
    console.log(projects);
    localStorage.setItem('projects', JSON.stringify(projects));

    list = list.filter(obj => obj.id !== proj.id);
    localStorage.setItem('list', JSON.stringify(list));
}

// for retrieving local storage
export function retrieveProjectData() {

    const storedProjectData = localStorage.getItem('projects');

    if (storedProjectData) {
        projects = JSON.parse(storedProjectData);
    }
    else {
        console.log('No projects data found in local storage.');
    }
}

export function retrieveListData() {

    const storedListData = localStorage.getItem('list');

    if (storedListData) {
        list = JSON.parse(storedListData);
    }
    else {
        console.log('No list data found in local storage.')
    }
}

export { list, projects };