document.addEventListener("DOMContentLoaded", function () {
  const supabaseUrl = "https://uuhrbjyitxdbtveijjzi.supabase.co";
  const supabaseKey = "DIN_ANON_KEY_HER"; // behold din egen

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
