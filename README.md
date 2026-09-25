# 🩸 Blood Bank Management System

A modern **Blood Bank Management System** developed using **HTML, CSS, JavaScript, Node.js, Express.js, and MySQL**. The system helps blood banks efficiently manage donors, blood stock, hospitals, blood requests, and provides a real-time dashboard for administrators.

---

## 📖 Overview

The Blood Bank Management System is designed to simplify blood bank operations by providing an easy-to-use web interface for managing blood donations and requests. It enables administrators to monitor blood availability, manage donor information, process blood requests, and maintain hospital records efficiently.

---
http://127.0.0.1:5500/frontend/login.html
## ✨ Features

### 🔐 Authentication
- Secure Admin Login
- JWT Authentication
- Session Management
- Logout Functionality

### 👥 Donor Management
- Add New Donors
- Update Donor Information
- Delete Donors
- Search Donors
- View Donor Details

### ❤️ Blood Stock Management
- Add Blood Stock
- Update Blood Units
- Delete Blood Stock
- Search Blood Groups
- Track Blood Availability

### 📄 Blood Request Management
- Add Blood Requests
- Update Request Status
- Delete Requests
- Search Requests
- View Request History

### 🏥 Hospital Management
- Add Hospitals
- Update Hospital Details
- Delete Hospitals
- Search Hospitals

### 📊 Dashboard
- Total Donors
- Total Blood Units
- Total Blood Requests
- Total Hospitals
- Responsive Dashboard
- Real-Time Statistics

---

# 🛠️ Technology Stack

## Frontend
- HTML5
- CSS3
- JavaScript (ES6)
- Font Awesome

## Backend
- Node.js
- Express.js

## Database
- MySQL

## Authentication
- JSON Web Token (JWT)

## Development Tools
- Visual Studio Code
- Git & GitHub
- MySQL Workbench
- Postman
- Live Server

---

# 📁 Project Structure

```
Blood_Management_System
│
├── frontend
│   ├── css
│   │   ├── dashboard.css
│   │   ├── donor.css
│   │   ├── blood-stock.css
│   │   ├── requests.css
│   │   ├── hospital.css
│   │   └── login.css
│   │
│   ├── js
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   ├── donors.js
│   │   ├── blood-stock.js
│   │   ├── request.js
│   │   └── hospitals.js
│   │
│   ├── dashboard.html
│   ├── donors.html
│   ├── blood-stock.html
│   ├── requests.html
│   ├── hospitals.html
│   └── login.html
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── package.json
│   ├── .env
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/Blood_Management_System.git
```

---

## Navigate to Backend

```bash
cd Blood_Management_System/backend
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a **.env** file inside the backend folder.

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=blood_bank_db

JWT_SECRET=your_secret_key
```

---

## Start Backend Server

```bash
npm start
```

or

```bash
npm run dev
```

---

## Run Frontend

Open the **frontend** folder using **Live Server**.

---

# 🗄️ Database

Create a MySQL database.

```sql
CREATE DATABASE blood_bank_db;
```

Import the SQL file containing the following tables:

- users
- donors
- blood_stock
- blood_requests
- hospitals

---

# 🌐 API Endpoints

## Authentication

| Method | Endpoint |
|---------|------------------|
| POST | /api/auth/login |

---

## Donors

| Method | Endpoint |
|---------|-------------------|
| GET | /api/donors |
| GET | /api/donors/:id |
| POST | /api/donors |
| PUT | /api/donors/:id |
| DELETE | /api/donors/:id |

---

## Blood Stock

| Method | Endpoint |
|---------|-------------------------|
| GET | /api/blood-stock |
| GET | /api/blood-stock/:id |
| POST | /api/blood-stock |
| PUT | /api/blood-stock/:id |
| DELETE | /api/blood-stock/:id |

---

## Blood Requests

| Method | Endpoint |
|---------|----------------------|
| GET | /api/requests |
| GET | /api/requests/:id |
| POST | /api/requests |
| PUT | /api/requests/:id |
| DELETE | /api/requests/:id |

---

## Hospitals

| Method | Endpoint |
|---------|------------------------|
| GET | /api/hospitals |
| GET | /api/hospitals/:id |
| POST | /api/hospitals |
| PUT | /api/hospitals/:id |
| DELETE | /api/hospitals/:id |

---

# 🚀 Future Enhancements

- Email Notifications
- SMS Notifications
- Blood Donation Scheduling
- PDF Report Generation
- Data Analytics Dashboard
- Role-Based Authentication
- Mobile Application
- Advanced Search & Filters
- Dashboard Charts

