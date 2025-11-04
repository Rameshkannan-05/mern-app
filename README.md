# 📁 MERN Records Management App

A full-stack MERN (MongoDB, Express, React, Node.js) application with Tailwind CSS for managing records. Features include CRUD operations, server-side pagination, text search, date-range filtering, and a responsive UI.

---

## 🚀 Features

- **CRUD Operations**: Create, read, update, and delete records.
- **Pagination**: Server-side pagination with customizable page sizes (5, 10, 20, 50 records per page).
- **Search and Filtering**: Text search across title and description, plus date-range filtering.
- **Responsive UI**: Built with React and Tailwind CSS for a clean, mobile-friendly interface.
- **Secure Backend**: Includes input validation, rate limiting, CORS, and Helmet for security.
- **Sample Data**: Seed script to populate ~50 fake records for testing.

---

## 📦 Prerequisites

Ensure the following are installed:

- [Node.js (v16+)](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally at `mongodb://localhost:27017`)
- [Git](https://git-scm.com/) (optional but recommended)

---

## 🛠️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Rameshkannan-05/mern-app.git
cd mern-app
```


### 2. Set Up the Backend (Server)

```bash
cd server
npm install
```

Start MongoDB (if not already running):

- On Windows/Mac: Start the MongoDB service or run `mongod` in a terminal.

Seed the database with sample data:

```bash
npm run seed
```

Start the backend server:

```bash
npm start
```

> The server runs on `http://localhost:5000`. Use `npm run dev` for development mode with auto-restart.

---

### 3. Set Up the Frontend (Client)

Open a new terminal:

```bash
cd ../client
npm install
npx tailwindcss init -p
```

Ensure `tailwind.config.js` includes:

```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // other config...
}
```

Start the React development server:

```bash
npm start
```

> The app opens at `http://localhost:3000`.

---

## 📁 Sample CSV Data

You can view or download the full sample dataset [here](./server/mern-app.records.csv).

## 📊 Sample Data (CSV Preview)

Here’s a sample of the seeded records:

| Title         | Description        | Date       | Status   |
|---------------|--------------------|------------|----------|
| Record One    | First sample entry | 2025-01-01 | Active   |
| Record Two    | Second sample      | 2025-01-02 | Inactive |
| Record Three  | Third sample       | 2025-01-03 | Pending  |

### 4. Verify Setup

- **Backend**: Visit `http://localhost:5000` (should respond with no errors).
- **Frontend**: Visit `http://localhost:3000` to see the app.
- **Database**: Use MongoDB Compass or shell to verify records in `mern-app.records`.

---

## 📋 Usage

### Navigating the App

- **Home Page**: Displays a table of records with Title, Description, Date, Status, and Actions (Edit/Delete).
- **Pagination**: Use Prev/Next buttons or page numbers. Adjust records per page via dropdown.
- **Filters**: Use search bar (title/description), date pickers, and page size dropdown. Click "Filter" to apply.

### Managing Records

- **Create**: Click "Create Record", fill in form, click "Save".
- **Edit**: Click "Edit", update fields, click "Save".
- **Delete**: Click "Delete", confirm in popup.

---

## 🔌 API Endpoints

RESTful backend endpoints:

| Method | Endpoint              | Description                                  |
|--------|-----------------------|----------------------------------------------|
| GET    | `/api/records`        | Fetch records (query: `page`, `limit`, `search`, `startDate`, `endDate`) |
| POST   | `/api/records`        | Create a record (`title`, `description`, `date`, `status`) |
| PUT    | `/api/records/:id`    | Update a record                              |
| DELETE | `/api/records/:id`    | Delete a record                              |

Example API call:

```bash
curl -X GET "http://localhost:5000/api/records?page=1&limit=10&search=test"
```

---

## 🧰 Troubleshooting

- **Port Issues**: Change ports in `server/server.js` (default `5000`) or `client/package.json` (default `3000`).
- **MongoDB Connection**: Ensure MongoDB is running. Look for "MongoDB connected" in logs.
- **CORS Errors**: Backend has CORS enabled; ensure client hits correct server URL.
- **Styling Issues**: Restart React server after Tailwind changes.
- **No Data**: Run `npm run seed` again if records are missing.

> For errors, check browser console (frontend) or server terminal (backend).