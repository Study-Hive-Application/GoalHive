// Animations
AOS.init();
document.addEventListener("DOMContentLoaded", () => {
  loadProfile();
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

document.addEventListener("DOMContentLoaded", () => {
  const scheduleModal = document.getElementById("scheduleModal");
  const subjectInput = document.getElementById("subjectInput");
  const saveSubjectBtn = document.getElementById("saveSubject");
  const cancelModalBtn = document.getElementById("cancelModal");
  const modalTitle = document.getElementById("modalTitle");

  const addDayBtn = document.getElementById("addDayBtn");
  const addDayModal = document.getElementById("addDayModal");
  const newDayInput = document.getElementById("newDayInput");
  const saveNewDayBtn = document.getElementById("saveNewDay");
  const cancelAddDayBtn = document.getElementById("cancelAddDay");

  const scheduleContainer = document.getElementById("scheduleContainer");

  let currentDay = null;

  // In-memory schedule data
  const scheduleData = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  };

  // Load schedule from in-memory object
  const loadSchedule = () => {
    // Clear existing schedule
    scheduleContainer.innerHTML = "";

    // Iterate over each day in the schedule
    for (const day in scheduleData) {
      createDayScheduleElement(day, scheduleData[day]);
    }
  };

  // Create a day-schedule div
  const createDayScheduleElement = (day, subjects) => {
    const dayDiv = document.createElement("div");
    dayDiv.className =
      "day-schedule flex justify-between items-center bg-white p-3 rounded-lg";
    dayDiv.setAttribute("data-day", day);

    const dayInfo = document.createElement("div");
    dayInfo.innerHTML = `
                <span class="font-medium">${capitalizeFirstLetter(day)}</span>
                <p class="text-sm text-gray-600">${
                  subjects.length > 0
                    ? subjects.join(", ")
                    : "No subjects scheduled"
                }</p>
            `;

    const editBtn = document.createElement("button");
    editBtn.className = "edit-day text-gray-500 hover:text-gray-700";
    editBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
            `;
    editBtn.addEventListener("click", () => openEditModal(day));

    dayDiv.appendChild(dayInfo);
    dayDiv.appendChild(editBtn);

    scheduleContainer.appendChild(dayDiv);
  };

  // Capitalize first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Open Edit Schedule Modal
  const openEditModal = (day) => {
    currentDay = day;
    modalTitle.textContent = `Edit ${capitalizeFirstLetter(day)} Schedule`;
    subjectInput.value = "";
    scheduleModal.classList.remove("hidden");
  };

  // Save Subject to current day
  saveSubjectBtn.addEventListener("click", () => {
    const subject = subjectInput.value.trim();
    if (subject) {
      if (!scheduleData[currentDay].includes(subject)) {
        scheduleData[currentDay].push(subject);
        loadSchedule();
        scheduleModal.classList.add("hidden");
      } else {
        alert("Subject already exists for this day.");
      }
    }
  });

  // Cancel Edit Modal
  cancelModalBtn.addEventListener("click", () => {
    scheduleModal.classList.add("hidden");
  });

  // Open Add Day Modal
  addDayBtn.addEventListener("click", () => {
    newDayInput.value = "";
    addDayModal.classList.remove("hidden");
    newDayInput.focus();
  });

  // Save New Day
  saveNewDayBtn.addEventListener("click", () => {
    const newDay = newDayInput.value.trim().toLowerCase();
    if (newDay) {
      if (scheduleData[newDay]) {
        alert("Day already exists.");
      } else {
        scheduleData[newDay] = [];
        loadSchedule();
        addDayModal.classList.add("hidden");
      }
    }
  });

  // Cancel Add Day Modal
  cancelAddDayBtn.addEventListener("click", () => {
    addDayModal.classList.add("hidden");
  });

  // Initial load
  loadSchedule();
});
// Add this to your existing script
document.addEventListener("DOMContentLoaded", () => {
  const clearAllBtn = document.querySelector(".bg-blue-500");
  const notificationsContainer = document.getElementById(
    "notificationsContainer"
  );

  clearAllBtn.addEventListener("click", () => {
    // Clear all notifications
    notificationsContainer.innerHTML = "";
  });
});
// Mobile menu toggle
document.getElementById("menu-btn").onclick = function () {
  document.getElementById("mobile-menu").classList.toggle("hidden");
};
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("hidden");
}
