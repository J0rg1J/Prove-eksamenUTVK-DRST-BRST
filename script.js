console.log("script.js er lastet");

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded kjørte");

  const supabaseUrl = "https://uuhrbjyitxdbtveijjzi.supabase.co";
  const supabaseKey = "LIM_INN_ANON_KEY_HER";

  const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

  const form = document.getElementById("contactForm");
  const message = document.getElementById("message");

  console.log("Fant form:", form);

  if (!form) {
    console.log("Fant ikke skjemaet");
    return;
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log("Submit ble trykket");

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
