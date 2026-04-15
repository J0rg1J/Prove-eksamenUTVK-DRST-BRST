document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const message = document.getElementById("message");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const userMessage = document.getElementById("messageInput").value.trim();

      if (name === "" || email === "" || userMessage === "") {
        message.textContent = "Du må fylle ut alle feltene.";
        message.className = "mt-3 text-danger";
        return;
      }

      message.textContent = `Takk for henvendelsen, ${name}! Vi tar kontakt på ${email}.`;
      message.className = "mt-3 text-success";

      form.reset();
    });
  }
});
