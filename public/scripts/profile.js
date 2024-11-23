function saveProfile() {
  // Collect data from input fields
  const formData = {
    name: document.getElementById("name-input").value,
    phone: document.getElementById("phone-input").value,
    bio: document.getElementById("bio-input").value,
    skills: document.getElementById("skills-input").value,
    subjects: Array.from(
      document.querySelectorAll("#subjects-form input[type='checkbox']:checked")
    )
      .filter((checkbox) => checkbox.value !== "Other")
      .map((checkbox) => checkbox.value)
      .join(","),
    profileImage: document.getElementById("profile-image-preview").src,
  };

  // Temporarily store data in sessionStorage
  sessionStorage.setItem("profileData", JSON.stringify(formData));

  // Navigate to dashboard.html
  window.location.href = "EditedDashboard.html";
}

function previewImage(event) {
  const reader = new FileReader();
  reader.onload = function () {
    document.getElementById("profile-image-preview").src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

function addCustomSubject() {
  const customSubjectInput = document.getElementById("custom-subject");
  const customSubjectValue = customSubjectInput.value.trim();

  if (customSubjectValue) {
    const newCheckbox = document.createElement("label");
    newCheckbox.classList.add("block");
    newCheckbox.innerHTML = `<input type="checkbox" value="${customSubjectValue}" class="mr-2" checked> ${customSubjectValue}`;
    const subjectsForm = document.getElementById("subjects-form");
    const customSection = document.getElementById("custom-subject-section");
    subjectsForm.insertBefore(newCheckbox, customSection);

    customSubjectInput.value = "";
    customSection.classList.add("hidden");
  } else {
    alert("Please enter a subject name!");
  }
}

function displayInput() {
  document.getElementById("custom-subject-section").classList.toggle("hidden");
}
