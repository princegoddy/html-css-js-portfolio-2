// Task Manager JavaScript
let tasks = [];
let currentFilter = "all";
let taskToDelete = null;

// Load tasks from localStorage on startup
window.addEventListener("load", () => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
  renderTasks();
  updateStats();
});

// Form submission
document.getElementById("taskForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("taskTitle").value;
  const description = document.getElementById("taskDescription").value;
  const category = document.getElementById("taskCategory").value;
  const priority = document.getElementById("taskPriority").value;

  const newTask = {
    id: Date.now(),
    title,
    description,
    category,
    priority,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.unshift(newTask);
  saveTasks();
  renderTasks();
  updateStats();

  // Reset form
  document.getElementById("taskForm").reset();

  // Show success modal
  showModal("successModal");
});

// Filter buttons
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

function renderTasks() {
  const tasksList = document.getElementById("tasksList");

  let filteredTasks = tasks;
  if (currentFilter === "completed") {
    filteredTasks = tasks.filter((t) => t.completed);
  } else if (currentFilter === "pending") {
    filteredTasks = tasks.filter((t) => !t.completed);
  }

  if (filteredTasks.length === 0) {
    tasksList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📋</div>
                <h3>No ${
                  currentFilter === "all" ? "" : currentFilter
                } tasks</h3>
                <p>${
                  currentFilter === "all"
                    ? "Add your first task to get started!"
                    : "Create some tasks to see them here"
                }</p>
            </div>
        `;
    return;
  }

  tasksList.innerHTML = filteredTasks
    .map(
      (task) => `
        <div class="task-item ${task.completed ? "completed" : ""}">
            <div class="task-header">
                <h4 class="task-title">${task.title}</h4>
                <div class="task-badges">
                    <span class="task-badge badge-category">${getCategoryIcon(
                      task.category
                    )}</span>
                    <span class="task-badge badge-priority ${
                      task.priority
                    }">${getPriorityIcon(task.priority)}</span>
                </div>
            </div>
            ${
              task.description
                ? `<p class="task-description">${task.description}</p>`
                : ""
            }
            <div class="task-actions">
                ${
                  !task.completed
                    ? `<button class="task-btn btn-complete" onclick="toggleComplete(${task.id})">✓ Complete</button>`
                    : `<button class="task-btn btn-complete" onclick="toggleComplete(${task.id})">↺ Undo</button>`
                }
                <button class="task-btn btn-delete" onclick="showDeleteModal(${
                  task.id
                })">🗑️ Delete</button>
            </div>
        </div>
    `
    )
    .join("");
}

function getCategoryIcon(category) {
  const icons = {
    work: "💼 Work",
    personal: "👤 Personal",
    shopping: "🛒 Shopping",
    health: "💪 Health",
    other: "📌 Other",
  };
  return icons[category] || category;
}

function getPriorityIcon(priority) {
  const icons = {
    high: "🔴 High",
    medium: "🟡 Medium",
    low: "🟢 Low",
  };
  return icons[priority] || priority;
}

function toggleComplete(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
    updateStats();
  }
}

function showDeleteModal(id) {
  taskToDelete = id;
  showModal("deleteModal");
}

function confirmDelete() {
  if (taskToDelete) {
    tasks = tasks.filter((t) => t.id !== taskToDelete);
    saveTasks();
    renderTasks();
    updateStats();
    taskToDelete = null;
  }
  closeModal("deleteModal");
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  document.getElementById("totalTasks").textContent = total;
  document.getElementById("completedTasks").textContent = completed;
  document.getElementById("pendingTasks").textContent = pending;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Modal Functions
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
  }
}

// Close modal when clicking outside
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
});

// Expose functions to global scope
window.toggleComplete = toggleComplete;
window.showDeleteModal = showDeleteModal;
window.confirmDelete = confirmDelete;
window.closeModal = closeModal;

// Add some sample tasks on first load
if (tasks.length === 0) {
  tasks = [
    {
      id: 1,
      title: "Complete portfolio project",
      description:
        "Finish building the responsive portfolio website with all demo projects",
      category: "work",
      priority: "high",
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Review client feedback",
      description:
        "Go through the feedback from the recent project and make necessary adjustments",
      category: "work",
      priority: "medium",
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      title: "Workout session",
      description: "30 minutes cardio + strength training",
      category: "health",
      priority: "low",
      completed: true,
      createdAt: new Date().toISOString(),
    },
  ];
  saveTasks();
  renderTasks();
  updateStats();
}
