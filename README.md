# Daily Activity Tracker

A simple fullstack app to track what I do every day and see how I spend my time.

**Problem:** I had no idea where my time was actually going each day, so I built this to log activities and see the patterns.

## Tech I used :

- **Frontend:** React (Vite)
- **Backend:** Express.js
- **Database:** MongoDB Atlas

## How to Run

### 1. Clone the repo
```bash
git clone https://github.com/Suhasubasi/my_fullstack_miniProject.git
cd my_fullstack_miniProject
```

### 2. Install dependencies
```bash
npm install
cd backend
npm install
cd ../frontend 
npm install
cd ..
```

### 3. Create .env file
Create `backend/.env` with:
```
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

### 4. Seed the database
```bash
cd backend
npm run seed
cd ..
```

### 5. Start the app
```bash
npm run dev
```
Opens backend on port 5000 and frontend on port 5173.

## Routes I made

- `GET /api/logs` – get all logs (you can also filter by activityId)
- `POST /api/logs` – create a new log
- `PUT /api/logs/:id` – update a log
- `DELETE /api/logs/:id` – delete a log
- `GET /api/activities` – get all activities with their category
- `GET /api/stats` – get total hours, average mood and breakdown by category