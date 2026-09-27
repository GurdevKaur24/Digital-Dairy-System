// Frontend logic for the Customers page.
// Asks our API for customers, then draws them in the table.

// Keep the full list here so the search box can filter it without
// calling the API again
let allCustomers = [];

// Grab the page elements we need
const rows = document.getElementById('rows');
const table = document.getElementById('table');
const loadingBox = document.getElementById('loading');
const errorBox = document.getElementById('error');
const emptyBox = document.getElementById('empty');
const searchInput = document.getElementById('search');

// Show exactly one of: loading / error / empty / table
function show(state, message) {
  loadingBox.hidden = state !== 'loading';
  errorBox.hidden = state !== 'error';
  emptyBox.hidden = state !== 'empty';
  table.hidden = state !== 'table';
  if (state === 'error') errorBox.textContent = message;
}

// 1. Fetch customers from GET /api/customers
async function loadCustomers() {
  show('loading');
  try {
    const response = await fetch('/api/customers');
    const result = await response.json();

    // Our API sends { success: false, error: "..." } when something fails
    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Request failed');
    }

    allCustomers = result.customers;
    updateStats(allCustomers);
    render(allCustomers);
  } catch (err) {
    show('error', '⚠ Could not load customers: ' + err.message);
  }
}

// 2. Fill the summary cards
function updateStats(list) {
  document.getElementById('statCount').textContent = list.length;
  document.getElementById('statCow').textContent =
    list.filter((c) => c.milk_type === 'cow').length;
  document.getElementById('statBuffalo').textContent =
    list.filter((c) => c.milk_type === 'buffalo').length;
}

// 3. Draw the table rows
function render(list) {
  if (list.length === 0) {
    show('empty');
    return;
  }

  rows.innerHTML = '';
  list.forEach((c) => {
    const tr = document.createElement('tr');
    // textContent (not innerHTML) keeps any text from the database safe
    addCell(tr, c.customer_id, 'muted');
    addCell(tr, c.name, 'name');
    addCell(tr, c.phone || '—');
    addCell(tr, c.address || '—', 'muted');

    const milkCell = document.createElement('td');
    const badge = document.createElement('span');
    badge.className = 'badge ' + c.milk_type;
    badge.textContent = c.milk_type;
    milkCell.appendChild(badge);
    tr.appendChild(milkCell);

    addCell(tr, '₹' + Number(c.default_rate).toFixed(2), 'num');
    rows.appendChild(tr);
  });
  show('table');
}

function addCell(tr, text, className) {
  const td = document.createElement('td');
  td.textContent = text;
  if (className) td.className = className;
  tr.appendChild(td);
}

// 4. Search: filter the saved list as the user types
searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  const filtered = allCustomers.filter((c) =>
    [c.name, c.phone, c.address].some((v) => (v || '').toLowerCase().includes(q))
  );
  render(filtered);
});

document.getElementById('refreshBtn').addEventListener('click', loadCustomers);

// Load the customers as soon as the page opens
loadCustomers();
