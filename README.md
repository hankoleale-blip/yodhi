# YODHI Taekwondo Competition 2026 Registration Website

A responsive static website ready for Vercel. It includes the parent registration form, event selection, automatic fee calculation, competition information and the supplied poster artwork.

## Deploy to Vercel
1. Extract this ZIP.
2. Upload the project folder to a new GitHub repository.
3. In Vercel, choose **Add New → Project**, import that repository and deploy.
4. Framework preset: **Other**. Build command: leave empty. Output directory: `.` (or leave default if Vercel detects the static site).
5. The site will be available on your Vercel domain.

## IMPORTANT: Connect form submissions to Google Sheets before sharing
The website currently has preview mode enabled. Without connecting the Google Sheet, entries are saved only in the browser/device used to test the form; the academy will not receive them.

1. Create a Google Sheet for competition registrations.
2. In the Sheet, open **Extensions → Apps Script**.
3. Copy the content of `google-apps-script.gs` into the Apps Script editor and save.
4. Click **Deploy → New deployment**. Select type **Web app**.
5. Set **Execute as: Me** and **Who has access: Anyone**, then deploy and authorize it.
6. Copy the Web app URL (it ends in `/exec`).
7. Open `script.js` and paste the URL between the quotes in `const GOOGLE_SCRIPT_URL = "";`.
8. Commit and push the change to GitHub. Vercel will redeploy automatically.
9. Submit a test registration and confirm a new row appears in the Google Sheet.

Keep the Sheet private and share it only with authorized academy staff. The Apps Script endpoint accepts public form submissions, so protect the URL from spam and periodically review entries.

## Form details included
- Participant name, school, date of birth, gender, belt/grade
- Parent/guardian name, 10-digit mobile, optional email
- Events: Individual Poomsae ₹1,200; Kyorugi ₹1,200; Speed Kick ₹750
- Automatic total fee; weight field required if Kyorugi is selected
- Cash-only payment reminder
- Reporting times and venue from the supplied poster

## Before publishing
Please verify the event categories, fee amounts, venue spelling/address, reporting times, registration deadline and contact instructions with YODHI Taekwondo Academy. The poster does not provide a phone number or named contact, so none has been invented. The form currently accepts one participant per submission; parents with multiple children should submit one form per child.
