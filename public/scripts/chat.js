//Sockets
const socket = io();
const userId = document.getElementById("userId").value.trim();
const userSocketid = userId + socket.id;
console.log(userSocketid);

//Chats
const messageInput = document.getElementById("messageInput");
const messages = document.getElementById("messages");
const sidebar = document.getElementById("sidebar");

function sendMessage() {
  const message = messageInput.value.trim();
  if (message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(
      "flex",
      "items-end",
      "justify-end",
      "space-x-2",
      "mb-4"
    );
    messageDiv.innerHTML = `
        <div class="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
          <p class="text-sm">${message}</p>
        </div>
        <img src="https://via.placeholder.com/35" alt="User Avatar" class="w-8 h-8 rounded-full">
      `;
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
    socket.emit("sender-text", message);
    messageInput.value = "";
  }
}

socket.on("re-message", (message) => {
  receiveMessage(message);
});

function receiveMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(
    "flex",
    "items-start",
    "justify-start",
    "space-x-2",
    "mb-4"
  );
  messageDiv.innerHTML = `
    <div class="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-xs">
      <p class="text-sm">${message}</p>
    </div>`;
  messages.appendChild(messageDiv);
  messages.scrollTop = messages.scrollHeight;
}

function toggleSidebar() {
  sidebar.classList.toggle("translate-x-full");
}

function closeSideBar() {
  sidebar.classList.add("translate-x-full");
}

function openModal(type) {
  const modalTitle = document.getElementById("modalTitle");
  const modalInput = document.getElementById("modalInput");
  const extraInput = document.getElementById("extraInput");
  const addButton = document.getElementById("addButton");
  const cancelButton = document.getElementById("cancelButton");
  const createButton = document.getElementById("createButton");
  const idList = document.getElementById("idList");
  const modal = document.getElementById("modal");

  currentChatType = type;

  if (type === "single") {
    modalTitle.innerText = "Add User's ID";
    modalInput.placeholder = "Enter user's ID";
    extraInput.classList.add("hidden");
    addButton.classList.add("hidden");
    cancelButton.classList.remove("hidden");
    createButton.classList.add("hidden");
    idList.classList.add("hidden");
  } else if (type === "group") {
    modalTitle.innerText = "Enter Group Name";
    modalInput.placeholder = "Enter group name";
    extraInput.classList.remove("hidden");
    addButton.classList.remove("hidden");
    cancelButton.classList.remove("hidden");
    createButton.classList.remove("hidden");
    idList.innerHTML = "";
    idList.classList.remove("hidden");
  }

  modal.classList.remove("hidden");
}

function createGroup() {
  const modalInput = document.getElementById("modalInput");
  const groupName = modalInput.value.trim();

  if (groupName) {
    socket.emit("create-group", groupName, (groupId) => {
      currentGroup = groupId;
      alert("Group created successfully!");
      toggleModal();
    });
  }
}

function toggleModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
}

function addUserId() {
  const extraInput = document.getElementById("extraInput");
  const idList = document.getElementById("idList");

  if (extraInput.value) {
    const newId = document.createElement("div");
    newId.textContent = extraInput.value;
    idList.appendChild(newId);
    extraInput.value = "";
  }
}

function singleChatUserAdd() {
  socket.emit("join", userId);
}
