window.addEventListener("load", () => {
  if (!window.name) {
    const overlay = document.querySelector("#overlay");
    overlay.style.display = "flex";
    const usernameInput = document.querySelector("#username-input");
    const submitBtn = document.querySelector("#submit-btn");
    const greetingText = document.getElementById("name");

    submitBtn.addEventListener("click", () => {
      const name = usernameInput.value.trim();
      window.name = name;
      if (name) {
        alert(`Welcome, ${name}!`);
        overlay.style.display = "none";
        greetingText.innerText = name;
      } else {
        alert("Please enter your name.");
      }
    });
    usernameInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") submitBtn.click();
    });
  }
});

const coffeeSlider = document.getElementById("coffee-slider");
const cups = document.getElementById("cups-drunk");
let saturation = 0;
coffeeSlider.addEventListener("input", () => {
  cups.textContent = coffeeSlider.value;
  saturation = coffeeSlider.value * 10;
  cups.style.color = `hsl(0, ${saturation}%, 21%)`;
});
