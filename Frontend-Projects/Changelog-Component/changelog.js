const changelog = [
  { date: "September 3, 2024", update: "Announcing Projects on Frontend Roadmap" },
  { date: "August 28, 2024", update: "Build your learning habits with learning streaks" },
  { date: "August 25, 2024", update: "Git and GitHub Roadmap" },
  { date: "August 22, 2024", update: "Submit your project solution and get feedback" },
  { date: "August 15, 2024", update: "Backend Project Ideas" },
  { date: "August 10, 2024", update: "Redis roadmap" },
  { date: "August 1, 2024", update: "Changelog page to help you stay in the loop" },
];

const visibleEntries = 3;
const timeline = document.getElementById("timeline");
const changelogButton = document.querySelector(".btn");

changelog.forEach(({ date, update }, index) => {
  const entry = document.createElement("div");
  entry.className = `entry${index >= visibleEntries ? " hidden" : ""}`;
  entry.innerHTML = `
    <span class="date">${date}</span>
    <div class="dot"></div>
    <span class="update">${update}</span>
  `;

  timeline.appendChild(entry);
});

changelogButton.addEventListener("click", () => {
  const hiddenEntries = timeline.querySelectorAll(".entry.hidden");

  hiddenEntries.forEach((entry, index) => {
    setTimeout(() => {
      entry.classList.remove("hidden");
      entry.classList.add("reveal");
    }, index * 100);
  });

  changelogButton.style.display = "none";
});
