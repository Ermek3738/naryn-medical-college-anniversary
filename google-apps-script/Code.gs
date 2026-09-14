const HEADERS = [
  "timestamp",
  "name",
  "organization",
  "position",
  "city",
  "phone",
  "attending",
  "guests",
]

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS)
    }

    const lock = LockService.getScriptLock()
    lock.waitLock(10000)
    sheet.appendRow(HEADERS.map((header) => data[header] ?? ""))
    lock.releaseLock()

    return response({ ok: true })
  } catch (error) {
    return response({ ok: false, error: String(error) })
  }
}

function response(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON)
}