import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC9Aw39v6eUNEnHyGhkt9x7NCNCoh34_oE",
  authDomain: "kedung-api-7eaed.firebaseapp.com",
  databaseURL: "https://kedung-api-7eaed-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kedung-api-7eaed",
  storageBucket: "kedung-api-7eaed.appspot.com",
  messagingSenderId: "405425437612",
  appId: "1:405425437612:web:a450d6ab4a52cc0ad5d809",
  measurementId: "G-ZJN5KNRK0V"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
export default app
