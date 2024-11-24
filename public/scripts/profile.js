//Animations
document.addEventListener("DOMContentLoaded", function () {
  AOS.init();
  loadProfile();
});

async function loadProfile() {
  try {
    const response = await fetch("/profile?type=load");
    if (!response.ok) {
      return console.log("Failed to fetch User data");
    }
    console.log("response : ", response);
    // Data From API
    const data = await response.json();
    console.log("data : ", data);

    // Populate form fields
    document.getElementById("profile-image-preview").src = data.profileImage;
    document.getElementById("name-input").value = data.name;
    document.getElementById("phone-input").value = data.phone || "";
    document.getElementById("bio-input").value = data.bio;

    data.skills.split(", ").forEach((skill) => addSkillBubble(skill));
    data.subjects.split(", ").forEach((subject) => addSubjectBubble(subject));
  } catch (error) {
    console.error("Error loading profile:", error);
  }
}

// Function to add a skill bubble with remove option
function addSkillBubble(skill) {
  const skillsBubbles = document.getElementById("skills-bubbles");
  const newBubble = document.createElement("span");

  newBubble.className =
    "flex items-center bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium shadow-md cursor-pointer hover:bg-green-200";

  newBubble.innerHTML = `
    <span>${skill}</span>
    <button class="ml-2 text-red-500 hover:text-red-700" onclick="removeBubble(this)">
       ×
    </button>
  `;

  skillsBubbles.appendChild(newBubble);
}

// Function to add a subject bubble with remove option
function addSubjectBubble(subject) {
  const subjectBubbles = document.getElementById("subject-bubbles");
  const newBubble = document.createElement("span");

  newBubble.className =
    "flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium shadow-md cursor-pointer hover:bg-blue-200";

  newBubble.innerHTML = `
    <span>${subject}</span>
    <button class="ml-2 text-red-500 hover:text-red-700" onclick="removeBubble(this)">
      ×
    </button>
  `;

  subjectBubbles.appendChild(newBubble);
}

// Function to remove a bubble
function removeBubble(button) {
  const bubble = button.parentElement; // The parent bubble of the button
  bubble.remove(); // Remove the bubble from the DOM
}

function previewImage(event) {
  const input = event.target;
  const file = input.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("profile-image-preview").src = e.target.result; // Change src of the Profile Image
    };
    reader.readAsDataURL(file); // Reading the File as URL
  }
}

// Displaying Skills Input
function displaySkillsInput() {
  document.getElementById("custom-skills-section").classList.toggle("hidden");
}

// Adding Skill as Bubble
function addCustomSkill() {
  const input = document.getElementById("custom-skill");
  const value = input.value.trim();

  if (value) {
    addSkillBubble(value); // Reuse the addSkillBubble function
    input.value = ""; // Clear the input field
    document.getElementById("custom-skills-section").classList.add("hidden");
  }
}

// Displaying Subjects Input
function displaySubjectInput() {
  document.getElementById("custom-subject-section").classList.toggle("hidden");
}

// Adding Subject as Bubble
function addCustomSubject() {
  const input = document.getElementById("custom-subject");
  const value = input.value.trim();

  if (value) {
    addSubjectBubble(value); // Reuse the addSubjectBubble function
    input.value = "";
    document.getElementById("custom-subject-section").classList.add("hidden");
  }
}

async function saveProfile() {
  // Phone Validation
  const phone = document.getElementById("phone-input").value;
  if (phone) {
    const regex = /^\d{10}$/;
    if (!regex.test(phone)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }
  }

  // Collect form data
  const formData = {
    profileImage: document.getElementById("profile-image-preview").src,
    name: document.getElementById("name-input").value,
    phoneNumber: phone,
    bio: document.getElementById("bio-input").value,
    skills: Array.from(document.getElementById("skills-bubbles").children)
      .map((bubble) => bubble.querySelector("span").textContent.trim())
      .join(", "),
    subjects: Array.from(document.getElementById("subject-bubbles").children)
      .map((bubble) => bubble.querySelector("span").textContent.trim())
      .join(", "),
  };
  console.log("Form data : ", formData);
  try {
    const response = await fetch("/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      alert("Profile updated successfully");
      window.location.href = "/dashboard";
    } else {
      alert("Error updating profile");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
