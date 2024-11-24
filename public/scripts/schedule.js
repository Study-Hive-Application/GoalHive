document.addEventListener("DOMContentLoaded", function () {
  // Animations
  AOS.init();

  const scheduleModal = document.getElementById("scheduleModal");
  const subjectInput = document.getElementById("subjectInput");
  const saveSubjectBtn = document.getElementById("saveSubject");
  const cancelModalBtn = document.getElementById("cancelModal");
  const modalTitle = document.getElementById("modalTitle");

  let currentDay = null;

  // Static days of the week
  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  // Fetch schedule data from the server
  async function loadSchedule() {
    try {
      const response = await fetch("/schedule"); // Make sure this endpoint matches your server route
      const data = await response.json();
      console.log(data); // Check the data format returned from the server
      const scheduleData = data || {}; // Default to empty object if no data is returned
      renderSchedule(scheduleData); // Pass data to renderSchedule function
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  }

  function renderSchedule(scheduleData) {
    daysOfWeek.forEach((day) => {
      const subjectsContainer = document
        .getElementById(day)
        .querySelector(".subjects");
      const subjects = scheduleData[day] || []; // Empty array if no subjects
      // Clear the subjects container and add the subjects
      subjectsContainer.innerHTML = "";
      if (subjects.length > 0) {
        subjects.forEach((subject) => {
          const subjectElement = document.createElement("div");
          subjectElement.classList.add(
            "flex",
            "items-center",
            "justify-between",
            "bg-blue-500",
            "text-white",
            "rounded-full",
            "px-4",
            "py-2",
            "m-2"
          );
          subjectElement.innerHTML = `
          <span>${subject}</span>
          <button class="delete-subject" data-day="${day}" data-subject="${subject}">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        `;
          subjectsContainer.appendChild(subjectElement);
        });
      }
    });

    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll(".delete-subject");
    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const day = e.target.getAttribute("data-day");
        const subject = e.target.getAttribute("data-subject");
        deleteSubject(day, subject);
      });
    });
  }

  // Delete subject
  async function deleteSubject(day, subject) {
    try {
      const response = await fetch("/schedule?type=delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day, subject }),
      });
      const data = await response.json();
      if (data.message === "Subject deleted") {
        // Remove the subject from the UI
        const subjectElements = document.querySelectorAll(
          `#${day} .subjects .flex`
        );
        subjectElements.forEach((el) => {
          if (el.querySelector("span").textContent === subject) {
            el.remove();
          }
        });
      }
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  }

  function openEditModal(day) {
    currentDay = day;
    modalTitle.textContent = `Add Subject for ${capitalizeFirstLetter(day)}`;
    subjectInput.value = "";
    scheduleModal.classList.remove("hidden");
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Update the schedule without reloading everything
  function updateDaySchedule(day, subject) {
    const subjectsContainer = document
      .getElementById(day)
      .querySelector(".subjects");

    const subjectElement = document.createElement("div");
    subjectElement.classList.add(
      "flex",
      "items-center",
      "justify-between",
      "bg-blue-500",
      "text-white",
      "rounded-full",
      "px-4",
      "py-2",
      "m-2"
    );
    subjectElement.innerHTML = `<span>${subject}</span>`;
    subjectsContainer.appendChild(subjectElement);
  }

  async function addSubject() {
    const subject = subjectInput.value.trim();
    if (subject) {
      try {
        const response = await fetch("/schedule?type=add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ day: currentDay, subject }),
        });
        const data = await response.json();
        if (data.message === "Subject added") {
          // Dynamically update the schedule for the selected day
          updateDaySchedule(currentDay, subject);
          scheduleModal.classList.add("hidden"); // Hide the modal
        }
      } catch (error) {
        console.error("Error adding subject:", error);
      }
    }
  }

  saveSubjectBtn.addEventListener("click", addSubject);
  cancelModalBtn.addEventListener("click", () => {
    scheduleModal.classList.add("hidden");
  });

  // Add event listener for edit buttons
  const editButtons = document.querySelectorAll(".edit-day");
  editButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const day = e.target.closest(".day-schedule").id;
      openEditModal(day);
    });
  });

  // Initialize schedule
  loadSchedule();
});
