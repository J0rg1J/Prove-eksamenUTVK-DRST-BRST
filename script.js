// Håndterer kontaktskjema, validering og lagring av henvendelser i Supabase.

document.addEventListener("DOMContentLoaded", function () {
  const supabaseUrl = "https://uuhrbjyitxdbtveijjzi.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1aHJianlpdHhkYnR2ZWlqanppIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjIyMTk3NywiZXhwIjoyMDkxNzk3OTc3fQ.TIWJzqKfCqrvFnPyiUlwLXnqLgzu4AUTKXcPZhaOr20";

  const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

  const form = document.getElementById("contactForm");
  const message = document.getElementById("message");

  if (!form) {
    return;
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    message.textContent = "";
    message.className = "mt-3";

    submitButton.disabled = true;
    submitButton.textContent = "Sender...";

    const navn = document.getElementById("name").value.trim();
    const epost = document.getElementById("email").value.trim();
    const melding = document.getElementById("messageInput").value.trim();

    if (!navn || !epost || !melding) {
      message.textContent = "Du må fylle ut alle feltene.";
      message.className = "mt-3 text-danger";
      submitButton.disabled = false;
      submitButton.textContent = "Send";
      return;
    }

    if (!epost.includes("@")) {
      message.textContent = "Skriv inn en gyldig e-postadresse.";
      message.className = "mt-3 text-danger";
      submitButton.disabled = false;
      submitButton.textContent = "Send";
      return;
    }

    try {
      const { error } = await supabaseClient
        .from("henvendelser")
        .insert([{ navn, epost, melding }]);

      if (error) {
        console.error("Feil ved lagring i Supabase:", error);
        message.textContent = "Noe gikk galt. Prøv igjen.";
        message.className = "mt-3 text-danger";
        submitButton.disabled = false;
        submitButton.textContent = "Send";
        return;
      }

      message.textContent = `Takk for henvendelsen, ${navn}!`;
      message.className = "mt-3 text-success";
      form.reset();
      submitButton.disabled = false;
      submitButton.textContent = "Send";
    } catch (err) {
      console.error("Uventet feil:", err);
      message.textContent = "Det oppstod en uventet feil.";
      message.className = "mt-3 text-danger";
      submitButton.disabled = false;
      submitButton.textContent = "Send";
    }
  });
});
