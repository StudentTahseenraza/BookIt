# 🌍 Booklt: Experiences & Slots

**Booklt** is a fullstack travel booking web application where users can explore curated travel experiences, view available dates and slots, and make bookings seamlessly.  
This project demonstrates fullstack proficiency — from API development and database integration to frontend design fidelity using Figma.

---

## 🚀 Project Overview

**Objective:**  
Build a complete end-to-end web application where users can:

- Browse travel experiences
- View experience details & available slots
- Complete a booking flow (with promo code support)
- View booking confirmation or failure message

This project was developed as part of the **Fullstack Intern Assignment**.

---

## 🧠 Features

✅ Responsive and mobile-friendly UI (Figma matched)  
✅ Dynamic experience listing and detail pages  
✅ Slot-based booking system with validation  
✅ Promo code validation (SAVE10, FLAT100, etc.)  
✅ Prevents double-booking  
✅ Live feedback (loading, success, error states)  
✅ Cloud-hosted for live review  

---

## 🛠️ Tech Stack

### 🖥️ Frontend
- **React + TypeScript** (Vite or Next.js)
- **TailwindCSS** for styling
- **Axios / Fetch API** for backend communication
- **React Hooks** for state management

### ⚙️ Backend
- **Node.js + Express.js**
- **Database:** PostgreSQL / MySQL / MongoDB
- **ORM (optional):** Prisma / Mongoose / Sequelize
- **Validation:** Joi / Zod

### ☁️ Deployment
- **Frontend:** Vercel / Netlify
- **Backend:** Render / Railway / AWS

---


## 🧩 Application Flow


- **Home Page:** Lists all available experiences fetched from the backend.  
- **Details Page:** Displays selected experience details and available slots.  
- **Checkout Page:** Collects user info, promo code, and displays price summary.  
- **Result Page:** Shows booking success or failure message.

---

## ⚙️ Backend API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| **GET** | `/experiences` | Fetch list of all experiences |
| **GET** | `/experiences/:id` | Fetch details and available slots for a specific experience |
| **POST** | `/bookings` | Create a new booking |
| **POST** | `/promo/validate` | Validate promo code and return discount |

### 🗄️ Data Rules
- Store all experiences and bookings in the database.
- Validate required fields.
- Prevent double-booking for the same slot.

---

## 💾 Folder Structure

### Frontend



---

## ⚡️ Setup Instructions

### 🔹 Prerequisites
- Node.js (v18+)
- npm or yarn
- PostgreSQL/MySQL/MongoDB installed locally or hosted (e.g., MongoDB Atlas)

### 🔹 Installation

#### 1. Clone the repository
```bash
git clone https://github.com/yourusername/booklt.git
cd booklt

cd frontend && npm install
cd ../backend && npm install

VITE_API_BASE_URL=https://your-backend-domain.com/api

PORT=5000
DB_URL=your_database_connection_string
CORS_ORIGIN=https://your-frontend-domain.com

4. Run the development servers

Frontend:

cd frontend
npm run dev


Backend:

cd backend
npm run dev

5. Access the app

Open your browser at http://localhost:5173

🌐 Deployment

Frontend: Deploy on Vercel

Backend: Deploy on Render
 or Railway

Ensure correct environment variables and CORS setup for production.

📘 Example Promo Codes
Code	Type	Description
SAVE10	Percentage	10% discount
FLAT100	Flat	₹100 off total
🧠 Future Enhancements

Add user authentication (JWT)

Admin dashboard for managing experiences

Email notifications for bookings

Unit tests for APIs
