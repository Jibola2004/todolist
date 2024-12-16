const inputTask = document.getElementById("input-task");
const addTask = document.getElementById("add-task");
const deleteTask = document.getElementById("delete");
const editTask = document.getElementById("edit");
const taskContainer = document.getElementById("task-container");
const closeDialogButton = document.getElementById("closeDialog");
const descriptionDialog = document.getElementById("descriptionDialog");
const TaskDetail = document.getElementById("Task-details");
const submitDescription = document.getElementById("submit-description");

let Tasks = [
    { id: 1, name: "buy rice", description: "I want to buy rice at the KAS market on Sunday, and it costs about 367tl." },
    { id: 2, name: "plant tree", description: "I need to plant a tree on the campus." },
    { id: 3, name: "read book", description: "I plan to read a new book about web development this weekend." },
    { id: 4, name: "exercise", description: "I will go jogging at the park on Saturday morning." },
    { id: 5, name: "call friend", description: "I need to call my friend to discuss the project." },
    { id: 6, name: "clean room", description: "I have to clean my room before the weekend." },
    { id: 7, name: "submit report", description: "I need to submit my monthly project report by Monday." }
];

let countList = Tasks.length;

// Show task in list format
function showList() {
    return Tasks.map(task => `<li data-key="${task.id}">${task.name}</li>`).join("");
}

taskContainer.innerHTML = showList();

// Add new task to the list
function addListName() {
    if (inputTask.value.length !== 0) {
        Tasks.push({ id: countList=countList+1, name: inputTask.value, description: "" });
        taskContainer.innerHTML = showList();
        inputTask.value = "";
        countList++;
        descriptionDialog.showModal();
    } else {
        alert("Please enter a task.");
    }
}
addTask.addEventListener("click",addListName);
// Add description to the last task
function addListDescription() {
    const description = document.getElementById("taskDescription");
    const taskFound = Tasks[Tasks.length - 1];
    if (taskFound) {
        taskFound.description = description.value;
    }
    descriptionDialog.close();
    taskContainer.innerHTML = showList();
    description.value="";
    console.log(Tasks);
}
submitDescription.addEventListener("click",addListDescription);

// Show task details
taskContainer.addEventListener("click", event => {
    if (event.target.tagName === "LI") {
        const key = parseInt(event.target.dataset.key);
        const content = Tasks.find(task => task.id === key);
        TaskDetail.innerHTML = `
            <div id="display" data-key="${content.id}">
                <h2>${content.name}</h2><br><br>
                <p>${content.description}</p>
            </div>`;
    }
});

// Delete task
function deleteList(id) {
    Tasks = Tasks.filter(task => task.id !== id);
    taskContainer.innerHTML = showList();
    TaskDetail.innerHTML = "";
}

deleteTask.addEventListener("click", () => {
    const display = document.getElementById("display");
    const key = parseInt(display.dataset.key);
    deleteList(key);
});

// Edit task
function editList() {
    const display = document.getElementById("display");
    const key = parseInt(display.dataset.key);
    const content = Tasks.find(task => task.id === key);

    display.innerHTML = `
        <div>
            <input type="text" id="editedName" value="${content.name}"><br>
            <textarea id="editedDescription">${content.description}</textarea><br>
            <button id="submitEdit">Submit</button>
        </div>`;

    document.getElementById("submitEdit").addEventListener("click", () => {
        const editedName = document.getElementById("editedName").value;
        const editedDescription = document.getElementById("editedDescription").value;

        content.name = editedName;
        content.description = editedDescription;

        display.innerHTML = `
            <div id="display" data-key="${content.id}">
                <h2>${content.name}</h2><br><br>
                <p>${content.description}</p>
            </div>`;

        taskContainer.innerHTML = showList();
    });
}

editTask.addEventListener("click", editList);

// Mobile view handling
const mediaQuery = window.matchMedia("(max-width: 640px)");

function changeView() {
    const contactContainer = document.getElementsByClassName("contact-container")[0];
    const chatContainer = document.getElementsByClassName("chat-container")[0];
    const backButton = document.getElementById("back");
   // console.log('Checking viewport size:', mediaQuery.matches);
    if (mediaQuery.matches) {
        contactContainer.style.display = "block";
        chatContainer.style.display = "none";
        contactContainer.style.width="100%";
        taskContainer.addEventListener("click", event => {
            if (event.target.tagName === "LI") {
                contactContainer.style.display = "none";
                chatContainer.style.display = "block";
                chatContainer.style.width = "100%";
            }
        });

        backButton.addEventListener("click", () => {
            contactContainer.style.display = "block";
            chatContainer.style.display = "none";
        });
    } else {
        contactContainer.style.display = "block";
        chatContainer.style.display = "block";
        chatContainer.style.width = "60%";
        contactContainer.style.width="40%";
        taskContainer.addEventListener("click", event => {
            if (event.target.tagName === "LI") {
                contactContainer.style.display = "block";
                chatContainer.style.display = "block";
               
            }
        });
        console.log("desktop")
    }
   
}
changeView();
mediaQuery.addEventListener("change", changeView);
