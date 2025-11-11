# 🏃‍♀️ Runlytics — CSV Runner Dashboard (Next.js + shadcn/ui)

## 1. Project Overview
This project implements the **CSV Runner Dashboard challenge** using **Next.js 16**, **Tailwind CSS**, and **shadcn/ui**.  
Users can upload a CSV file containing running data (`date`, `person`, `miles run`), and the app visualizes the data through charts and summary metrics.  
It provides both **overall** and **per-person** insights such as **average, minimum, and maximum miles run**.  

---

## 2. Assumptions
- The uploaded CSV must include headers: `date`, `person`, `miles run`.  
- `date` follows the format `YYYY-MM-DD`.  
- `miles run` is numeric (integers or floats).  
- Invalid or missing values trigger validation errors instead of crashing the app.  
- Data is stored in memory — no external database is used.  
- File size limit: ≤ 5MB for optimal parsing.  

---

## 3. Prerequisites
- **Node.js** ≥ 20  
- **npm** ≥ 10  
- No external database required  
- Modern browser (Chrome, Edge, Firefox, Safari)

---

## 4. Setup

### Install
```bash
npm install
```

### Environment
If environment variables are required (e.g., analytics keys), duplicate `.env.example`:
```bash
cp .env.example .env
```
*(Not required for basic CSV parsing — this step is optional.)*

### Seed / Sample Data
A sample CSV file is provided under:
```
/public/sample.csv
```

---

## 5. Run & Verify

### Run locally
```bash
npm run dev
```
App will start at **http://localhost:3000**

### To verify functionality:
1. Go to the **Upload** page.  
2. Upload the provided `sample.csv`.  
3. The dashboard should display:
   - ✅ **Overall metrics** — average, min, max miles.  
   - ✅ **Per-person view** — each runner’s stats.  
   - ✅ **Charts** — visualizing miles run by date and by person.  
4. Try uploading an invalid CSV (e.g., missing headers) — you should see an **error alert**.  
5. Reload page → data resets (as expected, since no DB persistence).  

---

## 6. Features & Limitations

### ✅ Features
- CSV upload and validation using **PapaParse**.  
- Error handling for invalid headers or non-numeric data.  
- **Recharts** for interactive data visualization.  
- **Summary cards** showing min/avg/max metrics.  
- **Per-person and overall views** toggle.  
- Responsive design (optimized for desktop and tablet).  
- Modern UI built with **shadcn/ui** and **TailwindCSS v4**.

### ⚠️ Limitations
- Data not persisted — resets on refresh.  
- No user authentication.  
- Limited mobile optimization.  
- File limit: single CSV upload at a time.  

---

## 7. Notes on Architecture

### Folder Structure
```
/app
 |- layout.tsx     # overall layout ofthe page
 |- globals.css    # global styles
 |- page.tsx       # CSV upload interface
/components
 ├─ ChartView.tsx             # Handles all Recharts logic
 ├─ FileUpload.tsx            # Provides UI for uploading files
/utils
 ├─ parseCSV.js           # CSV validation and transformation
 ├─ calcMetrics.js        # Calculate Metrics
/public
 ├─ sample.csv            # Example input
 ├─ bg.jpg                # Background image
```

### State & Data Flow
- CSV file parsed client-side via **PapaParse**.  
- Cleaned and validated data stored in React state.  
- Aggregated metrics computed using array reducers.  
- Chart components consume derived state (via props).  

---

## 8. Accessibility & UI
- Used semantic HTML (`<main>`, `<section>`, `<button>`).  
- Accessible upload button with `aria-label`.  
- High color contrast ensured via Tailwind defaults.  
- Consistent spacing and typography across components.  
- Keyboard navigable (tab through upload, view toggle, etc.).  

---

## 9. Future Improvements
- Add user authentication (upload history).  
- Persistent storage (e.g., Supabase or MongoDB).  
- Export filtered data to CSV.  
- Advanced analytics (pace trends, total miles per month).  
- Dark mode toggle.  

---

## 10. Built With ❤️
- [Next.js 16](https://nextjs.org/)  
- [React 19](https://react.dev/)  
- [Tailwind CSS v4](https://tailwindcss.com/)  
- [shadcn/ui](https://ui.shadcn.com/)  
- [Recharts](https://recharts.org/)  
- [PapaParse](https://www.papaparse.com/)
