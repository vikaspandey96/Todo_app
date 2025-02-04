// Get references to the DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Retrieve tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks
function renderTasks() {
    taskList.innerHTML = ""; // Clear the task list
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.name;
        
        // Add "completed" class if the task is marked as completed
        if (task.completed) {
            li.classList.add("completed");
        }

        // Create a delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTask(index);
        
        // Add event to mark task as completed
        li.onclick = () => toggleCompletion(index);

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Add a new task
function addTask() {
    if (taskInput.value.trim() !== "") {
        const newTask = { name: taskInput.value, completed: false };
        tasks.push(newTask);
        taskInput.value = ""; // Clear input field
        saveTasks();
        renderTasks();
    }
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Toggle task completion
function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add event listener to the "Add Task" button
addTaskBtn.addEventListener("click", addTask);

// Initial render of tasks
renderTasks();
