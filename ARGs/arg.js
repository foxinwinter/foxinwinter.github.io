// arg.js
const BASE_PATH = "ARGs";
const container = document.getElementById('sections');
const statusEl = document.getElementById('status');

// Fetch the folder structure JSON
async function loadARG() {
  try {
    statusEl.textContent = 'Loading transmission…';
    const res = await fetch(`${BASE_PATH}/index.json`);
    if (!res.ok) throw new Error('Could not load index.json');
    const fs = await res.json();
    statusEl.textContent = 'Transmission received.';
    container.innerHTML = '';
    renderFolder(fs, container, BASE_PATH);
  } catch (e) {
    console.error(e);
    statusEl.textContent = 'ERROR: Could not load ARG index.';
  }
}

// Recursive function to render folders/files
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
      if (isOpen && typeof content === 'string') {
        // Load text file content
        try {
          const fileRes = await fetch(`${path}/${name}`);
          if (!fileRes.ok) throw new Error('File not found');
          const text = await fileRes.text();
          contentEl.textContent = text;
        } catch (e) {
          contentEl.textContent = 'ERROR: Could not load file.';
        }
      }
    });

    section.appendChild(header);
    section.appendChild(contentEl);
    parentEl.appendChild(section);

    if (typeof content === 'object') {
      // Folder, recursively render
      renderFolder(content, contentEl, `${path}/${name}`);
    }
  }
}

loadARG();
