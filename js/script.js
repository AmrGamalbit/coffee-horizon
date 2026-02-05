window.addEventListener("load", () => {
  const overlay = document.querySelector("#overlay");
  const usernameInput = document.querySelector("#username-input");
  const submitBtn = document.querySelector("#submit-btn");
  const greetingText = document.getElementById("name")

  submitBtn.addEventListener("click", () => {
    const name = usernameInput.value.trim();
    if (name) {
      alert(`Welcome, ${name}!`);
      overlay.style.display = "none";
      greetingText.innerText = name
    } else {
      alert("Please enter your name.");
    }
  });
  usernameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") submitBtn.click();
  });
});
