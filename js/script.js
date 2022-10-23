"use strict";

const unCompltdTask = document.querySelector(".uncompleted-tasks");
const compltdTask = document.querySelector(".completed-tasks");
let checkboxes = document.querySelectorAll(".checkbox");
let tasks = document.querySelectorAll(".task");

const modalWindow = document.querySelector(".modal-window");
const btnCloseModalWindow = document.querySelector(".close-modal-window");
const overlay = document.querySelector(".overlay");

let btnsDeleteTask = document.querySelectorAll(".dump");

let deleteTask = document.querySelector(".delete-task-yes");
let noDeleteTask = document.querySelector(".delete-task-no");

const percentCompleted = document.querySelector(".percent-completed");

let x;

const completeTasksCount = document.querySelector(".comlete-tasks-count");
const percentage = document.querySelector(".percentage");
const barrier = document.querySelector(".barrier");

let allTasks = compltdTask.children.length + unCompltdTask.children.length;

// Calculating the percentage of completed tasks.
const percentIsCompelete = function () {
  let a =
    allTasks == 0
      ? 0
      : Math.round((compltdTask.children.length / allTasks) * 100);
  percentage.textContent = a + "%";
  completeTasksCount.textContent = compltdTask.children.length;
  document.querySelector(".all-tasks-count").textContent = allTasks;

  // Add color for percentage
  if (a > 0 && a < 50) {
    percentage.classList.remove("yellow", "green");
    percentage.classList.add("red");
  } else if (a >= 50 && a < 90) {
    percentage.classList.remove("red", "green");
    percentage.classList.add("yellow");
  } else if (a >= 90) {
    percentage.classList.remove("red", "yellow");
    percentage.classList.add("green");
  } else {
    percentage.classList.remove("red", "yellow", "green");
  }
};
percentIsCompelete();

// Function for adding new task.
const addTask = function () {
  let inputTask = document.querySelector(".input-new-task");

  if (inputTask.value.length) {
    let task = document.createElement("div");
    task.classList.add("task");
    task.innerHTML = `<input type="checkbox" id="checkbox" class="checkbox">
                        <p class='task--text'></p>
                        <button class="dump">🗑</button>`;
    //console.log(task);

    task.children[1].textContent = inputTask.value;
    unCompltdTask.append(task);

    checkboxes = document.querySelectorAll(".checkbox");
    tasks = document.querySelectorAll(".task");
    btnsDeleteTask = document.querySelectorAll(".dump");

    inputTask.value = "";
    allTasks = compltdTask.children.length + unCompltdTask.children.length;

    percentIsCompelete();
    isCompelete();

    showModalWindow();

    funcDeleteTask();

    congratulations.classList.add("hidden");
    noTasks.classList.add("hidden");
    barrier.classList.remove("hidden");
  }
};
document.querySelector(".add").addEventListener("click", function () {
  addTask();
});

const noTasks = document.querySelector(".no-tasks");
const congratulations = document.querySelector(".congratulations");
// const isCompelete = function () {
//   for (let i = 0; i < checkboxes.length; i++) {
//     checkboxes[i].addEventListener("change", function () {
//       if (checkboxes[i].checked) {
//         tasks[i].children[1].classList.add("checked");
//         compltdTask.prepend(tasks[i]);
//         percentIsCompelete();
//       } else {
//         tasks[i].children[1].classList.remove("checked");
//         unCompltdTask.append(tasks[i]);
//         percentIsCompelete();
//       }
//       if (unCompltdTask.children.length == 0) {
//         congratulations.classList.remove("hidden");
//       } else {
//         congratulations.classList.add("hidden");
//       }
//     });
//   }
// };
// isCompelete();

const isCompelete = function () {
  document.addEventListener("change", function (e) {
    if (e.target.checked) {
      e.path[1].children[1].classList.add("checked");
      compltdTask.prepend(e.path[1]);
      percentIsCompelete();
    } else {
      e.path[1].children[1].classList.remove("checked");
      unCompltdTask.append(e.path[1]);
      percentIsCompelete();
    }
    if (unCompltdTask.children.length == 0) {
      congratulations.classList.remove("hidden");
    } else {
      congratulations.classList.add("hidden");
    }
  });
};
isCompelete();

//  Func for close modal window.
const closeModalWindow = function () {
  modalWindow.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Showing modal window for deleting a task.
const showModalWindow = function () {
  for (let i = 0; i < btnsDeleteTask.length; i++) {
    btnsDeleteTask[i].addEventListener("click", function () {
      modalWindow.classList.remove("hidden");
      overlay.classList.remove("hidden");
      x = i;
      document.querySelector(
        ".delete-task-text"
      ).textContent = `Are you sure you want to delete task "${tasks[i].children[1].textContent}"?`;
    });
  }
};
showModalWindow();

// Closing modal windows and delete overlay blur.
btnCloseModalWindow.addEventListener("click", closeModalWindow);
overlay.addEventListener("click", closeModalWindow);

// Listen to the escape and enter buttons. If you press escape, the window will close, and if the user presses the Enter key, the task will be added.
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalWindow.classList.contains("hidden")) {
    closeModalWindow();
  }
  if (e.key === "Enter") {
    addTask();
  }
});

// Function to delete tasks.
const funcDeleteTask = function () {
  deleteTask.addEventListener("click", function () {
    for (let i = 0; i < tasks.length; i++) {
      if (x == i) {
        tasks[i].remove();
        closeModalWindow();
      }
      allTasks = compltdTask.children.length + unCompltdTask.children.length;

      percentIsCompelete();

      if (allTasks == 0) {
        noTasks.classList.remove("hidden");
        congratulations.classList.add("hidden");
        barrier.classList.add("hidden");
      }
    }
  });
};
funcDeleteTask();

// If the user clicks the "No" button, the modal window closes
noDeleteTask.addEventListener("click", closeModalWindow);

// document.addEventListener("click", function (e) {
//   console.log(e.target);
// });

// const isCompelete = function() {
//     for (let i = 0; i < tasks.length; i++) {
//         if(checkboxes[i].checked) {
//             document.querySelector(`.task--${i}`).children[1].classList.add('line-through');
//             console.log('Hello!');
//        }
//         console.log('How many tasks?');
//         console.log(checkboxes);
//         console.log(tasks);
//     }
// };
//isCompelete();

// Create task
// const createTask = function () {
//     const inputTask = document.querySelector('.input-new-task').value;
//     let elem = document.createElement("p");
//     elem.textContent = inputTask;
//     console.log(elem.textContent);

//     let task = document.querySelector('.task');
//     task.parentNode.appendChild(elem);
// }
//document.querySelector('.check').addEventListener('click',createTask)
