import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC9Aw39v6eUNEnHyGhkt9x7NCNCoh34_oE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "kedung-api-7eaed.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://kedung-api-7eaed-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "kedung-api-7eaed",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "kedung-api-7eaed.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "405425437612",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:405425437612:web:a450d6ab4a52cc0ad5d809",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-ZJN5KNRK0V"
}

export const databaseURL = firebaseConfig.databaseURL

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getDatabase(app)

export { auth, db }
export default app
