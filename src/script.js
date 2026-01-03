import "./style.css";

const addButton = document.querySelector('.open-button');
const closeButton = document.querySelector('.btnCancel');

const displayForm = () => document.querySelector(".form-popup").style.display = "block";
const hideForm = () => document.querySelector(".form-popup").style.display = "none";

addButton.addEventListener('click', (event) => {
    displayForm();

    // Prevent default action of the button
    event.preventDefault();
})

closeButton.addEventListener('click', (event) => hideForm())