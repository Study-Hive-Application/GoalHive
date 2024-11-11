// Function to preview the profile image
function previewImage(event) {
  const imagePreview = document.getElementById('profile-image-preview');
  imagePreview.src = URL.createObjectURL(event.target.files[0]);
}

// Function to edit the profile
function editProfile() {
  // Hide display elements
  document.getElementById("name-display").classList.add("hidden");
  document.getElementById("bio-display").classList.add("hidden");
  document.getElementById("subjects-display").classList.add("hidden");
  document.getElementById("skills-display").classList.add("hidden");

  // Show input elements
  document.getElementById("name-input").classList.remove("hidden");
  document.getElementById("bio-input").classList.remove("hidden");
  document.getElementById("subjects-input").classList.remove("hidden");
  document.getElementById("skills-input").classList.remove("hidden");

  // Show save button, hide edit button
  document.getElementById("edit-button").classList.add("hidden");
  document.getElementById("save-button").classList.remove("hidden");

  // Pre-fill input fields with current values
  document.getElementById("name-input").value = document.getElementById("name-display").innerText;
  document.getElementById("bio-input").value = document.getElementById("bio-display").innerText;
  document.getElementById("subjects-input").value = document.getElementById("subjects-display").innerText;
  document.getElementById("skills-input").value = document.getElementById("skills-display").innerText;
}

// Function to save the profile changes
function saveProfile() {
  // Get values from input fields
  const name = document.getElementById("name-input").value;
  const bio = document.getElementById("bio-input").value;
  const subjects = document.getElementById("subjects-input").value;
  const skills = document.getElementById("skills-input").value;

  // Update the display elements with new values
  document.getElementById("name-display").innerText = name;
  document.getElementById("bio-display").innerText = bio;
  document.getElementById("subjects-display").innerText = subjects;
  document.getElementById("skills-display").innerText = skills;

  // Toggle back to view mode
  document.getElementById("name-display").classList.remove("hidden");
  document.getElementById("bio-display").classList.remove("hidden");
  document.getElementById("subjects-display").classList.remove("hidden");
  document.getElementById("skills-display").classList.remove("hidden");

  // Hide input fields
  document.getElementById("name-input").classList.add("hidden");
  document.getElementById("bio-input").classList.add("hidden");
  document.getElementById("subjects-input").classList.add("hidden");
  document.getElementById("skills-input").classList.add("hidden");

  // Show edit button, hide save button
  document.getElementById("edit-button").classList.remove("hidden");
  document.getElementById("save-button").classList.add("hidden");
}
document.getElementById('menu-btn').onclick = function () {
    document.getElementById('mobile-menu').classList.toggle('hidden');
  };
  function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
  }
