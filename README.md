# Memora Krafts website

This is the supplied Memora Krafts landing page with its stylesheet, logo and 12 supplied hamper images. The enquiry form now posts to `/api/submit`, which forwards to Google Apps Script and stores enquiries in a Google Sheet. After a successful save, the page displays an on-page thank-you message. The form no longer redirects to WhatsApp. The separate WhatsApp contact links remain available.

## Project structure
- `index.html`, `style.css`, `script.js`: website frontend
- `assets/`: logo and hamper product images
- `api/submit.js`: Vercel serverless function; keep it inside `api/`
- `Code.gs`: Google Apps Script receiver
- `vercel.json`: Vercel function configuration

## Google Sheets setup
1. Create a Google Spreadsheet.
2. Copy its ID from the URL (between `/d/` and `/edit`).
3. Open Extensions → Apps Script and paste all of `Code.gs`.
4. Replace `PASTE_YOUR_GOOGLE_SPREADSHEET_ID_HERE` with your spreadsheet ID.
5. Deploy → New deployment → Web app. Set Execute as: Me and Who has access: Anyone.
6. Copy the Web app URL ending in `/exec`.

## Vercel setup
1. Upload these project files to your GitHub repository, preserving the `api/submit.js` folder structure.
2. In Vercel → Project → Settings → Environment Variables, add `GOOGLE_APPS_SCRIPT_URL` with the Apps Script `/exec` URL. Enable it for Production.
3. Redeploy the project.

## Google Tag Manager
The website includes GTM container `GTM-WGFJ6FN7` once in the head and its noscript iframe after the opening body tag. Do not paste a second copy. Configure GA4 or other tags inside Google Tag Manager to collect analytics.

## Test
Submit a test enquiry on the deployed site. Verify the confirmation appears and a new row is added to the `Website Enquiries` spreadsheet tab. If it fails, check the Apps Script deployment access and the Vercel environment variable.
