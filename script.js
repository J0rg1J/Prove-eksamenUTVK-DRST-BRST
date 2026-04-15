const supabaseUrl = "https://uuhrbjyitxdbtveijjzi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1aHJianlpdHhkYnR2ZWlqanppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMjE5NzcsImV4cCI6MjA5MTc5Nzk3N30.FIQYhtylQ0xVga4SNxNnQkoY25jf0Ax683Mt0M4097E";

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
