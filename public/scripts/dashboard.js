// Animations
AOS.init();

//Profile
document.addEventListener("DOMContentLoaded", function () {
  // Retrieve profile data from sessionStorage
  const profileDataString = sessionStorage.getItem("profileData");

  if (profileDataString) {
    const profileData = JSON.parse(profileDataString);

    // Update Profile Picture
    const profileImage = document.querySelector("img.w-32.h-32.rounded-full");
    if (profileImage && profileData.profileImage) {
      profileImage.src = profileData.profileImage;
    }

    // Update Name
    const nameElement = document.querySelector("h2.text-2xl.font-bold");
    if (nameElement && profileData.name) {
      nameElement.textContent = profileData.name;
    }

    // Update Bio
    const bioElement = document.querySelector("p.text-gray-600");
    if (bioElement && profileData.bio) {
      bioElement.textContent = profileData.bio;
    }

    // Update Skills
    if (profileData.skills) {
      const skillsArray = profileData.skills
        .split(",")
        .filter((skill) => skill.trim());
      const skillsContainer = document.querySelector(".flex.flex-wrap.gap-2");
      if (skillsContainer) {
        skillsContainer.innerHTML = skillsArray
          .map(
            (skill) =>
              `<span class="bg-blue-100 px-3 py-1 rounded-full text-sm">${skill.trim()}</span>`
          )
          .join("");
      }
    }

    // Update Subjects
    if (profileData.subjects) {
      const subjectsArray = profileData.subjects.split(",");
      const subjectsContainer = document.querySelectorAll(
        ".flex.flex-wrap.gap-2"
      )[1];
      if (subjectsContainer) {
        subjectsContainer.innerHTML = subjectsArray
          .map(
            (subject) =>
              `<span class="bg-green-100 px-3 py-1 rounded-full text-sm">${subject.trim()}</span>`
          )
          .join("");
      }
    }
  }
});
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
