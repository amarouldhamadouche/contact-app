import { initializeApp } from "firebase/app";

import { getDatabase, ref } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVZUMi0fhYhL8bN7sOv6HMD9DXe4urAkI",
  authDomain: "secondproject-25a4f.firebaseapp.com",
  projectId: "secondproject-25a4f",
  storageBucket: "secondproject-25a4f.appspot.com",
  messagingSenderId: "890033868178",
  appId: "1:890033868178:web:08ec679c74b4a50014054b",
  measurementId: "G-XW61Y3YY0B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default ref(getDatabase(app));
