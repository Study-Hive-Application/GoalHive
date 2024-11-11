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
  function closeSideBar(){
    sidebar.classList.add('translate-x-full');
  }