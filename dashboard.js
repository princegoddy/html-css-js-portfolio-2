// Dashboard JavaScript

// Animate numbers
function animateValue(id, start, end, duration, suffix = "") {
  const obj = document.getElementById(id);
  if (!obj) return;

  const range = end - start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / range));
  let current = start;

  const timer = setInterval(() => {
    current += increment * Math.ceil(range / 100);
    if (
      (increment > 0 && current >= end) ||
      (increment < 0 && current <= end)
    ) {
      current = end;
      clearInterval(timer);
    }
    obj.textContent = current.toLocaleString() + suffix;
  }, stepTime);
}

// Animate stats on page load
window.addEventListener("load", () => {
  setTimeout(() => {
    animateValue("followers", 0, 175000, 2000);
    animateValue("engagement", 0, 8.7, 2000, "%");
    animateValue("reach", 0, 2400000, 2000);
    animateValue("posts", 0, 48, 2000);
  }, 500);
});

// Create chart
const chartData = [
  { day: "Mon", value: 450 },
  { day: "Tue", value: 680 },
  { day: "Wed", value: 520 },
  { day: "Thu", value: 890 },
  { day: "Fri", value: 750 },
  { day: "Sat", value: 920 },
  { day: "Sun", value: 650 },
];

function createChart() {
  const chart = document.getElementById("chart");
  if (!chart) return;

  const maxValue = Math.max(...chartData.map((d) => d.value));

  chartData.forEach((data, index) => {
    const bar = document.createElement("div");
    bar.className = "bar";
    const height = (data.value / maxValue) * 100;
    bar.style.height = "0%";

    const label = document.createElement("div");
    label.className = "bar-label";
    label.textContent = data.day;

    const value = document.createElement("div");
    value.className = "bar-value";
    value.textContent = data.value;
    value.style.opacity = "0";

    bar.appendChild(label);
    bar.appendChild(value);
    chart.appendChild(bar);

    // Animate bar height with delay
    setTimeout(() => {
      bar.style.height = height + "%";
      setTimeout(() => {
        value.style.opacity = "1";
        value.style.transition = "opacity 0.3s ease";
      }, 300);
    }, 100 + index * 100);
  });
}

// Update time periodically
function updateTime() {
  const timeElement = document.querySelector(".dashboard-header p");
  if (!timeElement) return;

  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  timeElement.textContent = `Last updated: ${timeString}`;
}

// Initialize dashboard
window.addEventListener("load", () => {
  createChart();
  updateTime();
  setInterval(updateTime, 1000);
});

// Add tooltips to bars
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const bars = document.querySelectorAll(".bar");
    bars.forEach((bar, index) => {
      bar.addEventListener("mouseenter", () => {
        bar.style.filter = "brightness(1.2)";
      });

      bar.addEventListener("mouseleave", () => {
        bar.style.filter = "brightness(1)";
      });
    });
  }, 1000);
});
