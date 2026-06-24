# Document → OCR → Sheet (100% free setup)

## Kya milega
- `index.html` — website jo browser mein hi OCR karega (Tesseract.js), free hosting GitHub Pages pe.
- `google-apps-script.gs` — free backend (Google Apps Script Web App) jo data ko Sheet mein likhega.

Koi paid API, server, ya hosting cost nahi.

---

## Step 1: Google Sheet + Apps Script setup

1. Naya Google Sheet banao (ya existing use karo).
2. Top menu se **Extensions > Apps Script** kholo.
3. Wahan jo default code hai usko hata ke `google-apps-script.gs` ka pura content paste karo.
4. Top right **Deploy > New deployment** click karo.
5. Gear icon se type select karo: **Web app**.
6. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone**
7. **Deploy** click karo. Pehli baar permission allow karne ko kahega — allow kar do.
8. Deploy hone ke baad jo **Web app URL** milega usko copy kar lo. (Kuch jaisa: `https://script.google.com/macros/s/XXXXXXXX/exec`)

## Step 2: Website mein URL daalo

1. `index.html` file kholo (text editor mein).
2. Yeh line dhoondo:
   ```js
   const SHEET_WEBAPP_URL = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```
3. Apna copied URL paste karo:
   ```js
   const SHEET_WEBAPP_URL = "https://script.google.com/macros/s/XXXXXXXX/exec";
   ```
4. File save karo.

## Step 3: GitHub Pages pe free host karo

1. GitHub pe naya repository banao (public).
2. `index.html` file usme upload karo (root mein).
3. Repo ke **Settings > Pages** mein jao.
4. Source mein **main branch / root** select karke save karo.
5. Kuch minute baad GitHub ek live URL dega, jaisa:
   `https://yourusername.github.io/repo-name/`

Yeh URL hi tumhari live website hai — koi bhi yaha document upload karke OCR + Sheet mein bhej sakta hai.

---

## Pipeline kaise kaam karta hai

1. **Document upload** — user image select karta hai website pe.
2. **OCR** — Tesseract.js browser mein hi text nikalta hai (koi server call nahi).
3. **Data extract** — "Key: Value" pattern wali lines automatically fields ban jaati hain.
4. **Preview** — user fields edit ya add kar sakta hai submit se pehle.
5. **Google Sheet** — submit pe data Apps Script Web App ko jaata hai, jo Sheet mein naya row add kar deta hai. Naye field names khud-ba-khud naye column ban jaate hain.

---

## Notes / limitations

- Tesseract.js sirf images pe accurate kaam karta hai (PDF directly nahi) — agar PDF chahiye to pehle usko image (PNG/JPG) mein convert karna padega, ya `accept="image/*"` ko hata ke PDF-to-image conversion add karna hoga.
- "Key: Value" extraction sirf un documents pe theek se kaam karega jinme clear labels hon (jaise "Name:", "Invoice No:", "Date:"). Bahut messy/unstructured documents ke liye accuracy kam ho sakti hai — us case mein AI-based extraction better rahega.
- Apps Script free tier mein daily quota hai (kaafi generous, normal use ke liye sufficient).
