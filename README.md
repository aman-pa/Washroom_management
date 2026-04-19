# 🏥 SanitizeQ — Hospital Washroom Management System

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

**A full-stack, role-based washroom management system designed for hospitals and healthcare facilities to maintain superior hygiene standards and operational efficiency.**

🔗 **[Live Demo](https://washroom-management.onrender.com)**

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Getting Started](#-getting-started)
- [Default Login Credentials](#-default-login-credentials)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)


---

## 🏗 About the Project

**SanitizeQ** is a comprehensive hospital washroom management platform that enables healthcare facilities to monitor, manage, and maintain washroom hygiene in real time. The system provides role-based access for **Admins**, **Supervisors**, and **Cleaning Staff**, ensuring seamless coordination and accountability across all levels.

The platform features a live dashboard with real-time washroom status monitoring, an issue reporting system for visitors, complaint tracking, staff shift assignment, and automated daily resets — all wrapped in a modern, responsive UI with dark/light mode support.

---

## ✨ Features

### 🛡️ Role-Based Access Control
- **Admin** — Full system overview, complaint monitoring, washroom management, contact inbox, and activity logs
- **Supervisor** — Staff shift assignment, task monitoring, complaint reassignment, and manual day reset
- **Cleaning Staff** — View assigned washrooms, mark areas as cleaned, and manage assigned complaints

### 📊 Live Dashboard
- Real-time floor map with washroom status indicators (Clean / Dirty / Maintenance)
- Interactive cards with status badges and last-cleaned timestamps
- Public access for hospital visitors and staff

### 🚨 Issue Reporting
- Visitors can report washroom issues without logging in
- Automatic ticket generation with unique IDs
- Status tracking from submission to resolution

### 👥 Staff Shift Management
- Supervisors assign cleaning staff to specific wings/locations
- Admin has read-only visibility into shift assignments
- Automatic daily reset at midnight (new shift cycle)

### 🌙 Dark / Light Mode
- System-wide theme toggle with persistent preference
- Smooth transitions across all pages

### 📬 Contact System
- Public contact form with message storage
- Admin inbox for viewing all contact submissions
- Google Maps integration showing facility location

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3 (Vanilla), JavaScript (ES6+) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Atlas) |
| **Authentication** | JWT (JSON Web Tokens) |
| **Password Hashing** | bcryptjs |
| **Fonts** | Google Fonts (Inter) |
| **Icons** | Font Awesome 6 |

---

## 🏛 System Architecture

```
┌────────────────────────────────────────────────┐
│                  Frontend                       │
│   HTML/CSS/JS  ──  Served by Express Static     │
├────────────────────────────────────────────────┤
│                  Backend API                     │
│   Express.js  ──  REST API  ──  JWT Auth         │
├────────────────────────────────────────────────┤
│                  Database                        │
│   MongoDB Atlas  ──  Mongoose ODM                │
└────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or above)
- [MongoDB](https://www.mongodb.com/try/download/community) (local) or [MongoDB Atlas](https://www.mongodb.com/atlas) (cloud)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aman-pa/Washroom_management.git
   cd Washroom_management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/sanitizeq
   JWT_SECRET=your_secret_key_here
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:5000
   ```

> The database is automatically seeded with default users and sample data on first run.

---

## 🔐 Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@hospital.org` | `password123` |
| **Supervisor** | `amanpandey10a3@gmail.com` | `952544` |
| **Staff (Team A)** | `staffa@gmail.com` | `123456` |
| **Staff (Team B)** | `staffb@gmail.com` | `123456` |

---

## 📁 Project Structure

```
Washroom_management/
├── backend/
│   ├── middleware/
│   │   └── auth.js              # JWT verification & role checking
│   ├── models/
│   │   ├── Activity.js          # Activity log schema
│   │   ├── Complaint.js         # Complaint/ticket schema
│   │   ├── Message.js           # Contact message schema
│   │   ├── User.js              # User schema (roles)
│   │   └── Washroom.js          # Washroom schema
│   ├── routes/
│   │   ├── auth.js              # Login & registration
│   │   ├── complaints.js        # Complaint CRUD
│   │   ├── messages.js          # Contact messages
│   │   ├── staff.js             # Staff operations
│   │   └── washrooms.js         # Washroom management
│   └── server.js                # Express server + auto-reset scheduler
├── css/
│   └── style.css                # Complete design system
├── js/
│   ├── app.js                   # API integration layer
│   ├── admin.js                 # Admin panel logic
│   ├── supervisor.js            # Supervisor panel logic
│   ├── staff.js                 # Staff panel logic
│   ├── dashboard.js             # Live dashboard logic
│   ├── login.js                 # Auth & form validation
│   ├── report.js                # Issue reporting logic
│   ├── contact.js               # Contact form logic
│   └── script.js                # Theme toggle & shared UI
├── index.html                   # Landing page
├── login.html                   # Authentication page
├── admin.html                   # Admin panel
├── supervisor.html              # Supervisor panel
├── staff.html                   # Staff panel
├── dashboard.html               # Live washroom dashboard
├── report.html                  # Issue reporting page
├── contact.html                 # Contact page
├── about.html                   # About page
├── services.html                # Services page
├── faq.html                     # FAQ page
├── package.json
├── .env                         # Environment variables (not in repo)
└── .gitignore
```

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/login` | User login |
| POST | `/api/register` | User registration |

### Washrooms
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/washrooms` | Get all washrooms (public) |
| PUT | `/api/washrooms/:id` | Update washroom status/assignment |
| PUT | `/api/washrooms/reset/all` | Reset all washrooms (Supervisor/Admin) |

### Complaints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/complaints` | Get all complaints |
| POST | `/api/complaints` | Report a new issue |
| PUT | `/api/complaints/:id` | Update complaint status |

### Staff
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/staff/list` | Get all staff members |
| PUT | `/api/staff/clean/:id` | Mark washroom as cleaned |

### Messages
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages` | Get contact messages (Admin) |
| POST | `/api/messages` | Submit contact message (public) |

### Activity
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/activity` | Get system activity logs |

---

## 👨‍💻 Author

**Aman Pandey**
- 📧 amanpandey10a3@gmail.com
- 🎓 Lovely Professional University, Jalandhar, Punjab, India
- **Ankit Gupta*
- 📧 ankitgupta893392@gmail.com
- **Babru Ranjan Mohanty*
- 📧 babruranjanmohanty2005@gmail.com

---

<div align="center">

**⭐ Star this repo if you found it useful!**

Made with ❤️ for better hospital hygiene management.

</div>
