document.addEventListener("DOMContentLoaded", function () {
    // Code here
    const taskInput = document.getElementById("taskInput");
    const addTask = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => {
        renderTask(task);
    });

    addTask.addEventListener("click", () => {
        taskData = taskInput.value;
        if (taskData === "") {
            return;
        }

        const newTask = {
            id: Date.now(),
            text: taskData,
            Completed: false,
        };

        tasks.push(newTask);
        saveTask();
        renderTask(newTask);
        taskInput.value = "";
        console.log(newTask);
    });

    function renderTask(task) {
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);

        if (task.Completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span class="checkbox ${task.completed ? "checked" : ""}"></span>
            <span class="task-text ${task.completed ? "completed" : ""}">${
            task.text
        }</span>
            <button class="delete-btn">Delete</button>
        `;

        taskList.appendChild(li);

        li.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") {
                tasks = tasks.filter((t) => t.id !== task.id);
                li.remove();
                saveTask();
            } else {
                li.querySelector(".checkbox").classList.toggle("checked");
                li.querySelector(".task-text").classList.toggle("completed");
                task.Completed = !task.Completed;
                saveTask();
            }
        });
    }

    function saveTask() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
