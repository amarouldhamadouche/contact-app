import { initializeApp } from "firebase/app";

import { getDatabase, ref } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
ur firebase configuration
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default ref(getDatabase(app));
