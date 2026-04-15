console.log("script.js er lastet");

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded kjørte");

  const form = document.getElementById("contactForm");
  console.log("Fant form:", form);

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("Submit ble trykket");
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const supabaseUrl = "https://uuhrbjyitxdbtveijjzi.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1aHJianlpdHhkYnR2ZWlqanppIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjIyMTk3NywiZXhwIjoyMDkxNzk3OTc3fQ.TIWJzqKfCqrvFnPyiUlwLXnqLgzu4AUTKXcPZhaOr20";

  const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

  const form = document.getElementById("contactForm");
  const message = document.getElementById("message");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const navn = document.getElementById("name").value.trim();
    const epost = document.getElementById("email").value.trim();
    const melding = document.getElementById("messageInput").value.trim();

    if (!navn || !epost || !melding) {
      message.textContent = "Du må fylle ut alle feltene.";
      message.className = "mt-3 text-danger";
      return;
    }

    console.log("Sender data til Supabase...");

    const { error } = await supabaseClient
      .from("henvendelser")
      .insert([{ navn, epost, melding }]);

    console.log("Error:", error);

    if (error) {
      message.textContent = "Noe gikk galt. Prøv igjen.";
      message.className = "mt-3 text-danger";
      return;
    }

    message.textContent = `Takk for henvendelsen, ${navn}!`;
    message.className = "mt-3 text-success";

    form.reset();
  });
});
