
// hamburger icon scirpt 
let menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// faqs scirpt 
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach(item => {
 const question = item.querySelector(".faq-question");
 question.addEventListener("click", () => {
 item.classList.toggle("active");
 });
});

// service learn more toggle script 
const buttons = document.querySelectorAll(".servToggle");

buttons.forEach(btn => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    const desc = this.previousElementSibling;

    desc.classList.toggle("expanded");

    if (desc.classList.contains("expanded")) {
      this.textContent = "Show less";
    } else {
      this.textContent = "Learn more";
    }
  });
});
