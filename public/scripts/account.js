const container = document.querySelector(".container");
const signUpButton = document.getElementById("signup-btn");
const signInButton = document.getElementById("signin-btn");

signUpButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

//Signup Form Fetching API
document
  .getElementById("signup-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("signup-name");
    const email = document.getElementById("signup-email");
    const password = document.getElementById("signup-password");

    try {
      const response = await fetch("/account?type=signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          password: password.value,
        }),
      });

      name.value = "";
      email.value = "";
      password.value = "";

      const result = await response.json();

      if (response.ok) {
        alert("Account Created Successfull!!!");
        window.location.href = "/dashboard";
      } else {
        document.getElementById("signupError").textContent =
          result.errorMessage;
      }
    } catch (error) {
      console.error(error);
    }
  });

const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("login-email");
  const password = document.getElementById("login-password");

  try {
    const response = await fetch("/account?type=login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    email.value = "";
    password.value = "";

    const result = await response.json();

    if (response.ok) {
      alert("Login Successfull!!!");
      window.location.href = "/dashboard";
    } else {
      document.getElementById("loginError").textContent = result.errorMessage;
    }
  } catch (error) {
    console.error(error);
  }
});
