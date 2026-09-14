# Google Sheets RSVP setup

1. Create or open the Google Sheet where registrations should be stored.
2. Open **Extensions > Apps Script**.
3. Replace the editor contents with `google-apps-script/Code.gs` and save it.
4. Choose **Deploy > New deployment**.
5. Select **Web app**, set **Execute as** to your account, and set **Who has access** to **Anyone**.
6. Deploy, authorize the script, and copy the deployment URL ending in `/exec`.
7. Create `.env.local` in the project root and add:

   ```text
   GOOGLE_SHEETS_WEBHOOK_URL=your_copied_exec_url
   ```

8. Restart the Next.js server after changing `.env.local`.

The first sheet tab receives these columns:

`timestamp | name | organization | position | city | phone | attending | guests`