# 🎓 Attendance Marking System

A modern React-based attendance management system with Firebase backend.

## ✨ Features

- 🏫 **Class Management** - Create and manage classrooms
- 👥 **Student Management** - Add students to classes
- ✅ **Attendance Marking** - Mark present/absent for students
- 📊 **Attendance Tracking** - View attendance records and statistics
- 🎨 **Modern UI** - Beautiful gradient cards and responsive design
- 🔄 **Real-time Updates** - Instant data sync with Firebase

## 🚀 Tech Stack

- **Frontend**: React 19.1.0 + Vite 6.3.5
- **Backend**: Firebase Firestore
- **Routing**: React Router DOM 7.6.2
- **Styling**: CSS3 with gradients + Bootstrap
- **Alerts**: SweetAlert2

## 🔧 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/attendance-marking-system.git
cd attendance-marking-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set up Firebase

1. **Create Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Create a project"
   - Enter project name and complete setup

2. **Set up Firestore Database**:
   - Click "Firestore Database" → "Create database"
   - Choose "Start in test mode"
   - Select your preferred location

3. **Get Firebase Configuration**:
   - Go to Project Settings → General → Your apps
   - Click web icon `</>` to register web app
   - Copy the configuration object

4. **Configure Environment Variables**:
   ```bash
   # Copy the example environment file
   cp .env.example .env
   ```
   
   Edit `.env` file and replace with your Firebase config:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

### 4. Run the Application
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── pages/           # React components for different pages
│   ├── Home.jsx     # Class selection page
│   ├── AddClassPage.jsx
│   ├── AttendancePage.jsx
│   └── ViewAttendancePage.jsx
├── services/        # Firebase configuration
│   └── firebase.js
└── assets/          # Static assets
```

## 🔥 Firebase Collections

The app uses these Firestore collections:
- **classes**: Stores class information and student lists
- **attendance**: Stores daily attendance records

## 🚀 Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production
Make sure to set these in your deployment platform:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## 🎨 Features Preview

- **Beautiful gradient cards** with hover effects
- **Responsive design** for mobile and desktop
- **Modern navigation** with smooth transitions
- **Form validation** and error handling
- **Success notifications** with SweetAlert2

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ using React and Firebase
