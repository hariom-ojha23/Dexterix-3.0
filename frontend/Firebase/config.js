import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCZgQ3A3SDcfK_myM0RgU31W8QBKpFdpDA',
  authDomain: 'dexterix-27f60.firebaseapp.com',
  projectId: 'dexterix-27f60',
  storageBucket: 'dexterix-27f60.appspot.com',
  messagingSenderId: '1088699999840',
  appId: '1:1088699999840:web:26a0a52e21b1c2aabe8505',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
