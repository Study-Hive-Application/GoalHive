const messageInput = document.getElementById('messageInput');
const messages = document.getElementById('messages');
const sidebar = document.getElementById('sidebar');

function sendMessage() {
  if (messageInput.value.trim()) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('flex', 'items-end', 'justify-end', 'space-x-2', 'mb-4');
    messageDiv.innerHTML = `
        <div class="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
          <p class="text-sm">${messageInput.value}</p>
        </div>
        <img src="https://via.placeholder.com/35" alt="User Avatar" class="w-8 h-8 rounded-full">
      `;
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
    messageInput.value = '';
  }
}

function toggleSidebar() {
  sidebar.classList.toggle('translate-x-full');
}
function closeSideBar() {
  sidebar.classList.add('translate-x-full');
}
function openModal(type) {
  const modalTitle = document.getElementById('modalTitle');
  const modalInput = document.getElementById('modalInput');
  const extraInput = document.getElementById('extraInput');
  const addButton = document.getElementById('addButton');
  const cancelButton = document.getElementById('cancelButton');
  const createButton = document.getElementById('createButton');
  const idList = document.getElementById('idList');
  const modal = document.getElementById('modal');

  if (type === 'single') {
    modalTitle.innerText = "Add User's ID";
    modalInput.placeholder = "Enter user's ID";
    extraInput.classList.add('hidden'); // Hide extra input
    addButton.classList.remove('hidden'); // Hide Add button
    cancelButton.classList.remove('hidden'); // Show Cancel button
    createButton.classList.add('hidden'); // Hide Create button
    idList.classList.add('hidden'); // Hide ID list
  } else if (type === 'group') {
    modalTitle.innerText = "Enter Group Name";
    modalInput.placeholder = "Enter group name";
    extraInput.classList.remove('hidden'); // Show extra input
    addButton.classList.remove('hidden'); // Show Add button
    cancelButton.classList.remove('hidden'); // Show Cancel button
    createButton.classList.remove('hidden'); // Show Create button
    idList.innerHTML = ""; // Reset the ID list
    idList.classList.remove('hidden'); // Show ID list
  }

  modal.classList.remove('hidden'); // Show modal
}


function addUserId() {
  const extraInput = document.getElementById('extraInput');
  const idList = document.getElementById('idList');

  if (extraInput.value) {
    const newId = document.createElement('div');
    newId.textContent = extraInput.value;
    idList.appendChild(newId);
    extraInput.value = "";
  }
}

function toggleModal() {
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
}

function createGroup() {
  // Functionality to create the group can be added here
  alert("Group created successfully!");
  toggleModal(); // Close the modal after creating the group
}

function toggleModal() {
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
}

function addUserId() {
  const extraInput = document.getElementById('extraInput');
  const idList = document.getElementById('idList');

  if (extraInput.value) {
    // Append the new ID to the ID list
    const newId = document.createElement('div');
    newId.textContent = extraInput.value;
    idList.appendChild(newId);

    // Clear the input field
    extraInput.value = "";
  }
}

function toggleModal() {
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
}