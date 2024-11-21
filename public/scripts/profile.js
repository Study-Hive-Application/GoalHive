function editProfile() {
  document.getElementById("name-display").classList.add("hidden");
  document.getElementById("email-display").classList.add("hidden");
  document.getElementById("phone-display").classList.add("hidden");
  document.getElementById("bio-display").classList.add("hidden");
  document.getElementById("skills-display").classList.add("hidden");
  document.getElementById("subjects-display").classList.add("hidden");

  document.getElementById("name-input").classList.remove("hidden");
  document.getElementById("phone-input").classList.remove("hidden");
  document.getElementById("bio-input").classList.remove("hidden");
  document.getElementById("skills-input").classList.remove("hidden");
  document.getElementById("subjects-dropdown").classList.remove("hidden");

  document.getElementById("profile-picture").classList.remove("hidden");

  document.getElementById("edit-button").classList.add("hidden");
  document.getElementById("save-button").classList.remove("hidden");
}

function addCustomSubject() {
  const customSubjectInput = document.getElementById("custom-subject");
  const customSubjectValue = customSubjectInput.value.trim();

  if (customSubjectValue) {
    // Create a new label element
    const newCheckbox = document.createElement("label");
    newCheckbox.classList.add("block");

    // Add the checkbox HTML
    newCheckbox.innerHTML = `
      <input type="checkbox" value="${customSubjectValue}" class="mr-2"> ${customSubjectValue}
    `;

    // Append the new checkbox to the subjects form
    const subjectsForm = document.getElementById("subjects-form");
    if (subjectsForm) {
      subjectsForm.appendChild(newCheckbox);
    } else {
      console.error("The subjects-form element is missing.");
    }

    // Clear the input field
    customSubjectInput.value = "";

    // Optionally hide the input section
    const customSubjectSection = document.getElementById(
      "custom-subject-section"
    );
    if (customSubjectSection) {
      customSubjectSection.classList.add("hidden");
    }
  } else {
    alert("Please enter a subject name!");
  }
}

function saveProfile() {
  document.getElementById("name-display").textContent =
    document.getElementById("name-input").value;

  const emailInput = document.getElementById("email-input");
  if (emailInput) {
    document.getElementById("email-display").textContent = emailInput.value;
  }

  document.getElementById("phone-display").textContent =
    document.getElementById("phone-input").value;
  document.getElementById("bio-display").textContent =
    document.getElementById("bio-input").value;
  document.getElementById("skills-display").textContent =
    document.getElementById("skills-input").value;

  // Collect selected subjects excluding "Other"
  const checkboxes = document.querySelectorAll(
    "#subjects-dropdown input[type='checkbox']"
  );
  const selectedSubjects = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked && checkbox.value !== "Other") // Exclude "Other"
    .map((checkbox) => checkbox.value);

  document.getElementById("subjects-display").textContent =
    selectedSubjects.join(", ");

  // Reset visibility
  [
    "name-display",
    "email-display",
    "phone-display",
    "bio-display",
    "skills-display",
    "subjects-display",
  ].forEach((id) => {
    document.getElementById(id).classList.remove("hidden");
  });

  [
    "name-input",
    "phone-input",
    "bio-input",
    "skills-input",
    "subjects-dropdown",
  ].forEach((id) => {
    document.getElementById(id).classList.add("hidden");
  });

  const profilePicture = document.getElementById("profile-picture");
  if (profilePicture) {
    profilePicture.classList.add("hidden");
  }

  document.getElementById("edit-button").classList.remove("hidden");
  document.getElementById("save-button").classList.add("hidden");
}

function displayInput() {
  const customSubjectSection = document.getElementById(
    "custom-subject-section"
  );
  customSubjectSection.classList.remove("hidden");
}

function previewImage(event) {
  const reader = new FileReader();
  reader.onload = function () {
    const output = document.getElementById("profile-image-preview");
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}
