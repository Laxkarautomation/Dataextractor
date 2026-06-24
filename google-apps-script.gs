/**
 * Google Apps Script - Web App backend
 *
 * SETUP:
 * 1. Google Sheet kholo jisme data jaana hai.
 * 2. Extensions > Apps Script.
 * 3. Yeh code Code.gs mein paste karo (existing code hata ke).
 * 4. Deploy > New deployment > type: "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Deploy karne ke baad jo URL milega, usko index.html ke
 *    SHEET_WEBAPP_URL variable mein paste karo.
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  var lastCol = sheet.getLastColumn();
  var headers = lastCol > 0 ? sheet.getRange(1, 1, 1, lastCol).getValues()[0] : [];

  // Agar koi field abhi tak column nahi hai, toh naya header column add karo
  Object.keys(data).forEach(function (key) {
    if (headers.indexOf(key) === -1) {
      headers.push(key);
      sheet.getRange(1, headers.length).setValue(key);
    }
  });

  // Headers ke order mein row banao
  var row = headers.map(function (h) {
    return data[h] !== undefined ? data[h] : '';
  });

  sheet.appendRow(row);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
