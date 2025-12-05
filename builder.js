// Portfolio Builder JavaScript

let currentColors = ["#6366f1", "#ec4899"];
let currentTemplate = "modern";
let currentMode = "desktop";

function updatePreview() {
  const name = document.getElementById("nameInput").value;
  const title = document.getElementById("titleInput").value;

  const nameEl = document.getElementById("previewName");
  const titleEl = document.getElementById("previewTitle");

  if (nameEl) nameEl.textContent = name;
  if (titleEl) titleEl.textContent = title;
}

function changeColors(element) {
  document
    .querySelectorAll(".color-option")
    .forEach((opt) => opt.classList.remove("active"));
  element.classList.add("active");

  const colors = element.dataset.colors.split(",");
  currentColors = colors;

  const heroSection = document.getElementById("heroSection");
  if (heroSection) {
    heroSection.style.background = `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
  }
}

function changeTemplate(element, template) {
  document
    .querySelectorAll(".template-btn")
    .forEach((btn) => btn.classList.remove("active"));
  element.classList.add("active");
  currentTemplate = template;

  const preview = document.getElementById("portfolioPreview");
  if (!preview) return;

  if (template === "creative") {
    preview.style.transform = "rotate(-1deg)";
    preview.style.borderRadius = "20px";
  } else if (template === "professional") {
    preview.style.transform = "none";
    preview.style.borderRadius = "0";
  } else {
    preview.style.transform = "none";
    preview.style.borderRadius = "10px";
  }
}

function changeMode(mode, buttonElement) {
  document
    .querySelectorAll(".mode-btn")
    .forEach((btn) => btn.classList.remove("active"));
  if (buttonElement) {
    buttonElement.classList.add("active");
  }
  currentMode = mode;

  const preview = document.getElementById("portfolioPreview");
  if (!preview) return;

  if (mode === "mobile") {
    preview.classList.add("mobile");
  } else {
    preview.classList.remove("mobile");
  }
}

function exportPortfolio() {
  const name = document.getElementById("nameInput").value;
  const title = document.getElementById("titleInput").value;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - Portfolio</title>
    <style>
        * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
        }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
        }
        .hero { 
            padding: 4rem 2rem; 
            text-align: center; 
            color: white; 
            background: linear-gradient(135deg, ${currentColors[0]}, ${currentColors[1]}); 
        }
        .hero h1 { 
            font-size: 2.5rem; 
            margin-bottom: 0.5rem; 
        }
        .hero p { 
            font-size: 1.2rem; 
            opacity: 0.9; 
        }
        .content { 
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 2rem; 
        }
        .section { 
            margin-bottom: 2rem; 
        }
        .section h2 { 
            font-size: 1.5rem; 
            margin-bottom: 1rem; 
            color: ${currentColors[0]}; 
        }
        .section p { 
            color: #64748b; 
            line-height: 1.8; 
        }
        .skills { 
            display: flex; 
            flex-wrap: wrap; 
            gap: 0.5rem; 
            margin-top: 1rem; 
        }
        .skill { 
            padding: 0.5rem 1rem; 
            background: #f1f5f9; 
            border-radius: 20px; 
            color: #475569; 
        }
        .projects { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
            gap: 1rem; 
            margin-top: 1rem; 
        }
        .project { 
            background: #f8fafc; 
            padding: 1.5rem; 
            border-radius: 10px; 
        }
        .project h3 { 
            color: #1e293b; 
            margin-bottom: 0.5rem; 
        }
        .project p { 
            color: #64748b; 
            font-size: 0.9rem; 
        }
        @media (max-width: 768px) {
            .hero h1 { font-size: 2rem; }
            .content { padding: 1rem; }
            .projects { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="hero">
        <h1>${name}</h1>
        <p>${title}</p>
    </div>
    <div class="content">
        <div class="section">
            <h2>About Me</h2>
            <p>Passionate developer with expertise in creating modern web applications. 
            I love turning ideas into reality through clean code and intuitive design.</p>
        </div>
        <div class="section">
            <h2>Skills</h2>
            <div class="skills">
                <span class="skill">React</span>
                <span class="skill">Node.js</span>
                <span class="skill">JavaScript</span>
                <span class="skill">Python</span>
                <span class="skill">MongoDB</span>
                <span class="skill">UI/UX Design</span>
            </div>
        </div>
        <div class="section">
            <h2>Projects</h2>
            <div class="projects">
                <div class="project">
                    <h3>E-Commerce Platform</h3>
                    <p>Full-featured online store with payment integration</p>
                </div>
                <div class="project">
                    <h3>Social Dashboard</h3>
                    <p>Analytics platform for social media metrics</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "portfolio.html";
  a.click();
  URL.revokeObjectURL(url);

  alert("Portfolio exported successfully! Check your downloads folder.");
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Add input listeners
  const nameInput = document.getElementById("nameInput");
  const titleInput = document.getElementById("titleInput");

  if (nameInput) nameInput.addEventListener("input", updatePreview);
  if (titleInput) titleInput.addEventListener("input", updatePreview);

  // Set first color as active
  const firstColor = document.querySelector(".color-option");
  if (firstColor) firstColor.classList.add("active");

  // Set first template as active
  const firstTemplate = document.querySelector(".template-btn");
  if (firstTemplate) firstTemplate.classList.add("active");

  // Set desktop mode as active
  const desktopBtn = document.querySelector(".mode-btn");
  if (desktopBtn) desktopBtn.classList.add("active");
});

// Expose functions to global scope
window.updatePreview = updatePreview;
window.changeColors = changeColors;
window.changeTemplate = changeTemplate;
window.changeMode = changeMode;
window.exportPortfolio = exportPortfolio;
