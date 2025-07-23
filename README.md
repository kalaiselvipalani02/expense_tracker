# 💸 Expense Tracker (MERN Stack)

A full-featured Expense Tracker application to manage personal or organizational expenses. This application supports user registration/login, role-based access (Admin/User), file uploads, chart visualizations, and advanced filtering.

** Features**

 Authentication
- JWT-based Authentication
- Role-based access control (User/Admin)

 Expense Management
- Add, Update Status
- Upload receipts (image or PDF)
- Track by category, amount, and date

 Insights (Admin Only)
- Bar Chart: Total expenses by category
- Line Chart: Monthly expense trends


 Filters
- Filter by **status**, **category**, **start date**, and **end date**

 Admin Privileges
- Approve / Reject submitted expenses
- View all user submissions
- Real-time status update in expense list



## Tech Stack

| Frontend  | Backend  | Database |
|-----------|----------|----------|
| React.js (with Hooks + MUI)| Node.js, Express.js | MongoDB Atlas |

- Charts: Recharts
- File Upload: Multer
- Token Auth: JWT
- Password Hashing: bcrypt
- Date Picker: MUI 

---

##  Folder Structure

```bash
expense_tracker/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
├── frontend/
│   ├── components/
│   │└── services/
├── .env
└── README.md

 .env Setup
Backend (/backend/.env):
PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

Frontend (/frontend/.env):
REACT_APP_API_URL=http://localhost:4000/api

Install dependencies
Backend:
cd backend
npm install

Frontend:
cd frontend
npm install

Run the app
# Start backend
cd backend
npm run dev

# Start frontend
cd frontend
npm start

Security
Passwords hashed using bcrypt

JWT securely stored and verified

Input validated using middleware

Future Improvements
Pagination for expenses

Admin Dashboard with analytics

Export reports to PDF/Excel/CSV

Email Notifications
