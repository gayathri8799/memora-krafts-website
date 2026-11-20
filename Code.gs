const SPREADSHEET_ID = '1iMQqnYSzdT8HXO9Hmkoo4BbzZvFQqnolYkIYGLvDZZE';
const SHEET_NAME = 'Website Enquiries';

function doPost(e) {
  try {
    const p = (e && e.parameter) || {};
    if (!String(p.fullName || '').trim() || !String(p.phone || '').trim()) throw new Error('Name and phone are required.');
    if (!SPREADSHEET_ID || SPREADSHEET_ID.indexOf('PASTE_') === 0) throw new Error('Configure SPREADSHEET_ID in Code.gs.');

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

    const headers = ['Timestamp','Full Name','Company','Email','Phone','Enquiry Type','Quantity','Budget per Gift','Requirements'];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([new Date(), safeCell(p.fullName), safeCell(p.company), safeCell(p.email), safeCell(p.phone), safeCell(p.eventType), safeCell(p.quantity), safeCell(p.budget), safeCell(p.message)]);
    return output({ success: true });
  } catch (err) {
    return output({ success: false, message: String(err.message || err) });
  }
}

function safeCell(v) {
  const s = String(v || '').trim();
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function output(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
