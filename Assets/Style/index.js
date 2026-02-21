// Load About Me Text
fetch('Main/welcome.txt')
  .then(res => res.text())
  .then(txt => document.getElementById('about-box').textContent = txt)
  .catch(() => document.getElementById('about-box').textContent = 'Failed to load About Me.');

// Clock Widget
function updateClock() {
  const now = new Date();
  const timeEl = document.getElementById('time');
  const dateEl = document.getElementById('date');
  timeEl.textContent = now.toLocaleTimeString('en-US', {hour12:false});
  dateEl.textContent = now.toLocaleDateString('en-US', {weekday:'long', year:'numeric', month:'long', day:'numeric'});
}
setInterval(updateClock, 1000);
updateClock();
