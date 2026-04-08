const form = document.getElementById('music-form');
const messageEl = document.getElementById('message');
const listEl = document.getElementById('music-list');
const refreshBtn = document.getElementById('refresh');

function setMessage(text, isError = false) {
  messageEl.textContent = text;
  messageEl.style.color = isError ? '#dc2626' : '#2563eb';
}

function itemMarkup(item) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span><strong>${item.title}</strong> — ${item.artist} (${item.year}) ${item.genre ? `• ${item.genre}` : ''}</span>
    <button class="danger" data-id="${item.id}" type="button">Delete</button>
  `;
  return li;
}

async function loadItems() {
  try {
    const res = await fetch('/api/music');
    const payload = await res.json();
    listEl.innerHTML = '';
    for (const item of payload.data || []) {
      listEl.appendChild(itemMarkup(item));
    }
    setMessage(`Loaded ${payload.data?.length || 0} item(s).`);
  } catch (_err) {
    setMessage('Failed to load items.', true);
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const body = {
    title: document.getElementById('title').value.trim(),
    artist: document.getElementById('artist').value.trim(),
    year: Number.parseInt(document.getElementById('year').value, 10),
    genre: document.getElementById('genre').value.trim()
  };

  try {
    const res = await fetch('/api/music', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const payload = await res.json();
    if (!res.ok) {
      setMessage(payload.error || 'Create failed.', true);
      return;
    }
    form.reset();
    setMessage('Item added.');
    await loadItems();
  } catch (_err) {
    setMessage('Create failed.', true);
  }
});

listEl.addEventListener('click', async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) return;
  const id = target.dataset.id;
  if (!id) return;

  try {
    const res = await fetch(`/api/music/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const payload = await res.json();
      setMessage(payload.error || 'Delete failed.', true);
      return;
    }
    setMessage('Item deleted.');
    await loadItems();
  } catch (_err) {
    setMessage('Delete failed.', true);
  }
});

refreshBtn.addEventListener('click', loadItems);

loadItems();
