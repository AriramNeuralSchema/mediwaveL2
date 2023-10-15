// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGnhECS8nDYHvRhWplQlUe0RHL2A8m7Kg",
  authDomain: "agenhealthcare-adminpanel.firebaseapp.com",
  projectId: "agenhealthcare-adminpanel",
  storageBucket: "agenhealthcare-adminpanel.appspot.com",
  messagingSenderId: "319177234835",
  appId: "1:319177234835:web:55f37e7809834ca62ef066",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
