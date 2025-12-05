// Content Scheduler JavaScript

let selectedPlatforms = new Set();
let scheduledPosts = [];

// Platform selection
function initializePlatforms() {
  document.querySelectorAll(".platform-option").forEach((option) => {
    option.addEventListener("click", function () {
      const platform = this.dataset.platform;
      this.classList.toggle("selected");

      if (selectedPlatforms.has(platform)) {
        selectedPlatforms.delete(platform);
      } else {
        selectedPlatforms.add(platform);
      }
    });
  });
}

// Set minimum datetime to now
function initializeDatetime() {
  const datetimeInput = document.getElementById("scheduleTime");
  if (!datetimeInput) return;

  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  datetimeInput.min = now.toISOString().slice(0, 16);
  datetimeInput.value = now.toISOString().slice(0, 16);
}

// Form submission
function initializeForm() {
  const form = document.getElementById("scheduleForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (selectedPlatforms.size === 0) {
      alert("Please select at least one platform");
      return;
    }

    const content = document.getElementById("postContent").value;
    const scheduleTime = document.getElementById("scheduleTime").value;

    const post = {
      id: Date.now(),
      content: content,
      platforms: Array.from(selectedPlatforms),
      scheduleTime: new Date(scheduleTime),
      status: "scheduled",
    };

    scheduledPosts.unshift(post);
    renderPosts();

    // Reset form
    form.reset();
    document
      .querySelectorAll(".platform-option")
      .forEach((opt) => opt.classList.remove("selected"));
    selectedPlatforms.clear();
    initializeDatetime();

    // Show success message
    alert("Post scheduled successfully!");
  });
}

function getPlatformIcon(platform) {
  const icons = {
    facebook: "📘",
    instagram: "📷",
    twitter: "🐦",
    linkedin: "💼",
  };
  return icons[platform] || "📱";
}

function formatDate(date) {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function deletePost(id) {
  if (confirm("Are you sure you want to delete this post?")) {
    scheduledPosts = scheduledPosts.filter((post) => post.id !== id);
    renderPosts();
  }
}

function renderPosts() {
  const postsList = document.getElementById("postsList");
  const postsCount = document.getElementById("postsCount");

  if (!postsList || !postsCount) return;

  postsCount.textContent = `${scheduledPosts.length} post${
    scheduledPosts.length !== 1 ? "s" : ""
  }`;

  if (scheduledPosts.length === 0) {
    postsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📭</div>
                <h3 style="color: white; margin-bottom: 0.5rem;">No scheduled posts</h3>
                <p>Create your first scheduled post using the form</p>
            </div>
        `;
    return;
  }

  postsList.innerHTML = scheduledPosts
    .map(
      (post) => `
        <div class="post-card">
            <div class="post-header">
                <div class="post-platforms">
                    ${post.platforms
                      .map(
                        (p) =>
                          `<span class="post-platform-badge">${getPlatformIcon(
                            p
                          )}</span>`
                      )
                      .join("")}
                </div>
                <span class="post-status status-${post.status}">${
        post.status
      }</span>
            </div>
            <div class="post-content">${post.content}</div>
            <div class="post-meta">
                <span>📅 ${formatDate(post.scheduleTime)}</span>
                <div class="post-actions">
                    <button class="action-btn delete" onclick="deletePost(${
                      post.id
                    })">Delete</button>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

// Initialize with sample posts
function loadSamplePosts() {
  scheduledPosts = [
    {
      id: 1,
      content:
        "Excited to announce our new product launch! Stay tuned for amazing updates 🚀",
      platforms: ["facebook", "twitter", "linkedin"],
      scheduleTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
      status: "scheduled",
    },
    {
      id: 2,
      content:
        "Check out our latest blog post on web development trends in 2025! Link in bio 💻",
      platforms: ["instagram", "twitter"],
      scheduleTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
      status: "scheduled",
    },
    {
      id: 3,
      content:
        "Thank you for 10K followers! Your support means everything to us ❤️",
      platforms: ["facebook", "instagram", "twitter", "linkedin"],
      scheduleTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: "published",
    },
  ];
  renderPosts();
}

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  initializePlatforms();
  initializeDatetime();
  initializeForm();
  loadSamplePosts();
});

// Expose deletePost to global scope
window.deletePost = deletePost;
