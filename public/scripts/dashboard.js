// Animations
AOS.init();
document.addEventListener("DOMContentLoaded", () => {
  loadProfile();
  loadSchedule();
});

async function loadProfile() {
  try {
    const response = await fetch("/dashboard?type=load");
    if (!response.ok) {
      return console.log("Failed to fetch profile data");
    }
    console.log("res : ", response);

    const data = await response.json();
    console.log("data : ", data);

    // Profile Image
    const profileImage = document.getElementById("profileImage");
    profileImage.src = data.profileImage;
    profileImage.alt = data.name;

    // Name
    document.getElementById("name").innerText = data.name;

    // Bio
    document.getElementById("bio").innerText = data.bio || "No Bio Provided";

    // Skills
    const skillsContainer = document.getElementById("skills-section");
    skillsContainer.innerHTML = ""; // Clear existing skills
    if (data.skills) {
      data.skills.split(",").forEach((skill) => {
        const skillBubble = document.createElement("span");
        skillBubble.className = "bg-blue-100 px-3 py-1 rounded-full text-sm";
        skillBubble.innerText = skill.trim();
        skillsContainer.appendChild(skillBubble);
      });
    } else {
      skillsContainer.innerHTML = "No Skills Provided";
    }

    // Subjects
    const subjectsContainer = document.getElementById("subjects-section");
    subjectsContainer.innerHTML = ""; // Clear existing subjects
    if (data.subjects) {
      data.subjects.split(",").forEach((subject) => {
        const subjectBubble = document.createElement("span");
        subjectBubble.className = "bg-green-100 px-3 py-1 rounded-full text-sm";
        subjectBubble.innerText = subject.trim();
        subjectsContainer.appendChild(subjectBubble);
      });
    } else {
      subjectsContainer.innerHTML = "No Subjects Provided";
    }
  } catch (error) {
    console.error("Error loading profile:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Initialize schedule data structure
  let scheduleData = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  };

  // Get DOM elements
  const scheduleModal = document.getElementById("scheduleModal");
  const subjectInput = document.getElementById("subjectInput");
  const saveSubjectBtn = document.getElementById("saveSubject");
  const cancelModalBtn = document.getElementById("cancelModal");
  const modalTitle = document.getElementById("modalTitle");
  const scheduleContainer = document.getElementById("scheduleContainer");

  let currentDay = null;
  let currentSubjectIndex = null;

  function updateProfileUI(profileData) {
    // Update profile image
    const profileImg = document.querySelector(
      ".w-32.h-32.rounded-full.object-cover"
    );
    if (profileImg && profileData.profileImage) {
      profileImg.src = profileData.profileImage;
    }

    // Update name
    const nameElement = document.querySelector("h2.text-2xl.font-bold");
    if (nameElement && profileData.name) {
      nameElement.textContent = profileData.name;
    }

    // Update bio
    const bioElement = document.querySelector("p.text-gray-700.text-center");
    if (bioElement && profileData.bio) {
      bioElement.textContent = profileData.bio;
    }

    // Update skills
    const skillsContainer = document.querySelector(
      '.mb-4.w-full:has(h3:contains("Skills")) .flex.flex-wrap.gap-2'
    );
    if (skillsContainer && profileData.skills) {
      const skillsArray = profileData.skills
        .split(",")
        .map((skill) => skill.trim());
      skillsContainer.innerHTML = skillsArray
        .map(
          (skill) =>
            `<span class="bg-blue-100 px-3 py-1 rounded-full text-sm">${skill}</span>`
        )
        .join("");
    }

    // Update subjects
    const subjectsContainer = document.querySelector(
      '.mb-4.w-full:has(h3:contains("Subjects")) .flex.flex-wrap.gap-2'
    );
    if (subjectsContainer && profileData.subjects) {
      subjectsContainer.innerHTML = profileData.subjects
        .map(
          (subject) =>
            `<span class="bg-green-100 px-3 py-1 rounded-full text-sm">${subject}</span>`
        )
        .join("");
    }
  }

  function loadSchedule() {
    scheduleContainer.innerHTML = "";
    Object.entries(scheduleData).forEach(([day, subjects]) => {
      createDayScheduleElement(day, subjects);
    });
  }

  function createDayScheduleElement(day, subjects) {
    const dayDiv = document.createElement("div");
    dayDiv.className =
      "day-schedule flex justify-between items-center bg-white p-3 rounded-lg";
    dayDiv.setAttribute("data-day", day);

    const dayInfo = document.createElement("div");
    dayInfo.className = "flex-grow";
    dayInfo.innerHTML = `
        <span class="font-medium">${capitalizeFirstLetter(day)}</span>
        <div class="text-sm text-gray-600">
            ${
              subjects.length > 0
                ? subjects
                    .map(
                      (subject, index) => `
                    <div class="flex items-center justify-between">
                        <span>${subject}</span>
                        <button class="delete-subject text-red-500 hover:text-red-700 ml-2" data-index="${index}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                `
                    )
                    .join("")
                : "No subjects scheduled"
            }
        </div>
    `;

    const editBtn = document.createElement("button");
    editBtn.className = "edit-day text-gray-500 hover:text-gray-700 ml-4";
    editBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
    `;

    dayDiv.appendChild(dayInfo);
    dayDiv.appendChild(editBtn);

    // Add event listeners
    editBtn.addEventListener("click", () => openEditModal(day));
    dayDiv.querySelectorAll(".delete-subject").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const index = parseInt(btn.dataset.index);
        deleteSubject(day, index);
      });
    });

    scheduleContainer.appendChild(dayDiv);
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function openEditModal(day) {
    currentDay = day;
    currentSubjectIndex = null;
    modalTitle.textContent = `Add Subject to ${capitalizeFirstLetter(day)}`;
    subjectInput.value = "";
    scheduleModal.classList.remove("hidden");
  }

  function deleteSubject(day, index) {
    scheduleData[day].splice(index, 1);
    loadSchedule();
  }

  // Event listeners
  saveSubjectBtn.addEventListener("click", () => {
    const subject = subjectInput.value.trim();
    if (subject) {
      if (!scheduleData[currentDay].includes(subject)) {
        if (currentSubjectIndex !== null) {
          scheduleData[currentDay][currentSubjectIndex] = subject;
        } else {
          scheduleData[currentDay].push(subject);
        }
        loadSchedule();
        scheduleModal.classList.add("hidden");
      } else {
        alert("Subject already exists for this day.");
      }
    }
  });

  cancelModalBtn.addEventListener("click", () => {
    scheduleModal.classList.add("hidden");
  });

  // Initialize schedule
  loadSchedule();
});

// Initialize AOS if it exists
if (typeof AOS !== "undefined") {
  AOS.init();
}

// Mobile menu functionality
const menuBtn = document.querySelector("#menuBtn");
const mobileMenu = document.querySelector("#mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  // Animate hamburger icon
  const paths = menuBtn.querySelector("svg").querySelectorAll("path");
  paths.forEach((path) => {
    path.classList.toggle("translate-y-1");
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("shadow-md");
  } else {
    header.classList.remove("shadow-md");
  }
});
// Function to load the schedule from the server
async function loadSchedule() {
  try {
    // Send a GET request to fetch the schedule
    const response = await fetch("/schedule?type=load"); // Make sure the route matches the server endpoint
    const data = await response.json(); // Assume this returns an object with the schedule data

    // Call the function to render the schedule with the fetched data
    renderSchedule(data);
  } catch (error) {
    console.error("Error fetching schedule:", error);
  }
}

// Function to render the schedule on the page
function renderSchedule(scheduleData) {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const scheduleContainer = document.getElementById("scheduleContainer");

  scheduleContainer.innerHTML = "";

  daysOfWeek.forEach((day) => {
    const dayContainer = document.createElement("div");
    dayContainer.classList.add("bg-gray-200", "p-4", "rounded-lg", "mb-4");

    const dayHeader = document.createElement("h4");
    dayHeader.classList.add("text-lg", "font-semibold", "mb-2");
    dayHeader.textContent = day;

    dayContainer.appendChild(dayHeader);

    const subjects = scheduleData[day] || [];

    subjects.forEach((subject) => {
      const subjectElement = document.createElement("div");
      subjectElement.classList.add(
        "bg-blue-500",
        "text-white",
        "px-4",
        "py-2",
        "rounded-full",
        "mb-2"
      );
      subjectElement.textContent = subject;
      dayContainer.appendChild(subjectElement);
    });
    scheduleContainer.appendChild(dayContainer);
  });
}
