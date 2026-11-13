// Google Apps Script: receives registration data and appends it to a Google Sheet.
// Create a Google Sheet, open Extensions > Apps Script, paste this code and deploy as a Web App.

const SHEET_NAME = "Registrations";
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Submitted At", "Participant Name", "School", "Date of Birth", "Gender",
        "Belt / Grade", "Parent / Guardian", "Mobile", "Email", "Events",
        "Weight (kg)", "Total Fee (INR)", "Competition"
      ]);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      new Date(data.submittedAt || new Date()),
      data.athleteName || "", data.school || "", data.dob || "", data.gender || "",
      data.belt || "", data.parentName || "", data.phone || "", data.email || "",
      (data.events || []).join(", "), data.weight || "", data.totalFee || 0,
      data.competition || ""
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
