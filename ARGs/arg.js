const container = document.getElementById('sections');
const statusEl = document.getElementById('status');

async function loadARG() {
  try {
    statusEl.textContent = 'Loading ARG…';
    const res = await fetch(`index.json`); // relative to arg.html
    if (!res.ok) throw new Error('Could not load index.json');
    const fs = await res.json();
    statusEl.textContent = 'Transmission received.';
    container.innerHTML = '';
    renderFolder(fs, container, '.'); // current folder
  } catch (e) {
    console.error(e);
    statusEl.textContent = 'ERROR: Could not load ARG index.';
  }
}

// Recursive renderer
function renderFolder(obj, parentEl, path) {
  for (const [name, content] of Object.entries(obj)) {
    const section = document.createElement('div');
    section.className = 'section';

    const header = document.createElement('div');
    header.className = 'section-header';
    header.textContent = name;

    const contentEl = document.createElement('div');
    contentEl.className = 'section-content';

    header.addEventListener('click', async () => {
      const isOpen = section.classList.toggle('open');

      // Only load pseudo-files if it's notes.txt
      if (isOpen && name === 'notes.txt') {
        try {
          const fileRes = await fetch(`${path}/${name}`);
          if (!fileRes.ok) throw new Error('File not found');
          const text = await fileRes.text();
          contentEl.innerHTML = '';

          // Split into pseudo-files by ## Section
          const sections = text.split(/^##\s+/m).filter(s => s.trim() !== '');
          for (const sec of sections) {
            const lines = sec.split('\n');
            const pseudoName = lines.shift().trim();
            const pseudoEl = document.createElement('div');
            pseudoEl.className = 'section';

            const pseudoHeader = document.createElement('div');
            pseudoHeader.className = 'section-header';
            pseudoHeader.textContent = pseudoName;

            const pseudoContent = document.createElement('div');
            pseudoContent.className = 'section-content';
            pseudoContent.textContent = lines.join('\n');

            pseudoHeader.addEventListener('click', () => {
              pseudoEl.classList.toggle('open');
            });

            pseudoEl.appendChild(pseudoHeader);
            pseudoEl.appendChild(pseudoContent);
            contentEl.appendChild(pseudoEl);
          }
        } catch (e) {
          contentEl.textContent = 'ERROR: Could not load file.';
        }
      }
    });

    section.appendChild(header);
    section.appendChild(contentEl);
    parentEl.appendChild(section);

    // Recurse into subfolders (ignore notes.txt here)
    if (typeof content === 'object' && name !== 'notes.txt') {
      renderFolder(content, contentEl, `${path}/${name}`);
    }
  }
}

loadARG();
