/*
  IMPORTANT: Add your Google Apps Script Web App URL below to collect registrations
  from all parents in one Google Sheet. Setup instructions are in README.md.
*/
const GOOGLE_SCRIPT_URL = ""; // Paste deployed Apps Script URL here.

const form = document.getElementById("registrationForm");
const totalEl = document.getElementById("total");
const weightField = document.getElementById("weightField");
const weightInput = form.elements.weight;
const message = document.getElementById("formMessage");
const submitBtn = document.getElementById("submitBtn");

function selectedEvents() {
  return [...form.querySelectorAll('input[name="events"]:checked')];
}
function updateFee() {
  const selected = selectedEvents();
  const total = selected.reduce((sum, item) => sum + Number(item.dataset.price), 0);
  totalEl.textContent = `₹${total.toLocaleString("en-IN")}`;
  const hasKyorugi = selected.some(item => item.value === "Kyorugi");
  weightField.classList.toggle("hidden", !hasKyorugi);
  weightInput.required = hasKyorugi;
}
form.querySelectorAll('input[name="events"]').forEach(input => input.addEventListener("change", updateFee));

function showMessage(text, type) {
  message.textContent = text;
  message.className = `message show ${type}`;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const events = selectedEvents();
  if (!events.length) {
    showMessage("Please select at least one competition event.", "error");
    return;
  }
  if (events.some(e => e.value === "Kyorugi") && !weightInput.value) {
    showMessage("Please enter the participant's weight for Kyorugi.", "error");
    weightInput.focus();
    return;
  }
  if (new Date() > new Date("2026-11-21T23:59:59+05:30")) {
    showMessage("The registration deadline (21 November 2026) has passed. Please contact your coach.", "error");
    return;
  }

  const data = Object.fromEntries(new FormData(form).entries());
  data.events = events.map(e => e.value);
  data.totalFee = events.reduce((sum, e) => sum + Number(e.dataset.price), 0);
  data.submittedAt = new Date().toISOString();
  data.competition = "YODHI Invitational Interschool Taekwondo Competition 2026";

  submitBtn.disabled = true;
  submitBtn.innerHTML = 'SUBMITTING…';
  try {
    if (!GOOGLE_SCRIPT_URL) {
      // Preview mode only: this does NOT send the entry to the academy.
      const drafts = JSON.parse(localStorage.getItem("yodhiRegistrationPreview") || "[]");
      drafts.push(data);
      localStorage.setItem("yodhiRegistrationPreview", JSON.stringify(drafts));
      showMessage("Preview saved on this device only. The academy has NOT received this registration yet. Connect Google Sheets using the README instructions before sharing this website with parents.", "error");
    } else {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data)
      });
      showMessage("Your registration has been submitted. Please pay the total fee in cash to your respective coach. If you need confirmation, contact your coach.", "success");
      form.reset();
      updateFee();
    }
  } catch (err) {
    showMessage("Could not submit right now. Please check your internet connection or contact your coach.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'SUBMIT REGISTRATION <span>→</span>';
  }
});
updateFee();
