const form = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoDate = document.getElementById("todo-date");
const todoList = document.getElementById("todo-list");
const deleteAllBtn = document.getElementById("delete-all-btn");

let todos = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const text = todoInput.value.trim();
  const date = todoDate.value;

  if (!text || !date) return;

  todos.push({ text, date, status: "Pending" });
  renderTodos();
  form.reset();
});

deleteAllBtn.addEventListener("click", () => {
  todos = [];
  renderTodos();
});

function renderTodos() {
  todoList.innerHTML = "";

  if (todos.length === 0) {
    todoList.innerHTML = "<tr><td colspan='4'>No task found</td></tr>";
    return;
  }

  todos.forEach((todo, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${todo.text}</td>
      <td>${todo.date}</td>
      <td>${todo.status}</td>
      <td>
        <button onclick="toggleStatus(${index})">Done</button>
        <button onclick="deleteTodo(${index})">Delete</button>
      </td>
    `;
    todoList.appendChild(row);
  });
}

function toggleStatus(index) {
  todos[index].status = todos[index].status === "Pending" ? "Done" : "Pending";
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}
