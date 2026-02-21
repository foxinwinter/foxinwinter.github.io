// ==========================
// Hamburger menu
// ==========================
const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("side-menu");

hamburger.addEventListener("click", () => {
  sideMenu.classList.toggle("open");
});

// ==========================
// Load About Me
// ==========================
fetch("Main/AboutMe.txt")
  .then(r => r.text())
  .then(t => {
    document.getElementById("about-box").textContent = t;
  })
  .catch(() => {
    document.getElementById("about-box").textContent = "Failed to load About Me.";
  });

// ==========================
// Social widgets
// ==========================
const socials = [
  { name: "Discord", icon: "discord.png", link: "https://discord.com" },
  { name: "GitHub", icon: "github.png", link: "https://github.com/foxinwinter" },
  { name: "Telegram", icon: "telegram.png", link: "https://t.me/" }
];

const socialsContainer = document.getElementById("socials-widget");

socials.forEach(s => {
  const btn = document.createElement("button");
  btn.innerHTML = `<img src="Assets/Icons/Socials/${s.icon}"> ${s.name}`;
  btn.onclick = () => window.open(s.link, "_blank");
  socialsContainer.appendChild(btn);
});

// ==========================
// Date & Time
// ==========================
function updateTime() {
  const now = new Date();

  document.getElementById("date").textContent =
    now.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

  document.getElementById("time").textContent =
    now.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
}

updateTime();
setInterval(updateTime, 1000);
