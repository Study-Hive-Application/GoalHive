function openModal(title, content) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalContent").innerText = content;
    document.getElementById("modal").classList.remove("hidden");
  }
  
  function closeModal() {
    document.getElementById("modal").classList.add("hidden");
  }
  

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});


  // Close modal when clicking outside
  window.onclick = function (event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
      const modalContent = modal.firstElementChild;
      modalContent.classList.remove('modal-enter-active');
      modalContent.classList.add('modal-leave');
      setTimeout(() => {
        modal.classList.add('hidden');
        modalContent.classList.remove('modal-leave');
      }, 300);
    }
  };

  function openModal(title, content) {
    const modal = document.getElementById("modal");
    const modalContent = modal.firstElementChild;
  
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalContent").innerText = content;
  
    // Add fade-in animation class
    modal.classList.remove("hidden");
    modalContent.classList.add("modal-enter-active");
    modalContent.classList.remove("modal-leave");
  }
  
  function closeModal() {
    const modal = document.getElementById("modal");
    const modalContent = modal.firstElementChild;
  
    // Add fade-out animation class
    modalContent.classList.add("modal-leave");
    modalContent.classList.remove("modal-enter-active");
  
    // Wait for the fade-out animation to finish before hiding the modal
    setTimeout(() => {
      modal.classList.add("hidden");
      modalContent.classList.remove("modal-leave");
    }, 300); // This should match the fadeOut animation duration
  }
  
// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    closeModal(); // Calls the closeModal function with animation
  }
};

  // Mobile menu toggle
  document.getElementById('menu-btn').onclick = function () {
    document.getElementById('mobile-menu').classList.toggle('hidden');
  };
  function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
  }