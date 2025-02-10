// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIXxDjSinM4CPf_YR1B_0xHssPQ_WJ5pE",
  authDomain: "realtime-chat-app-5bb87.firebaseapp.com",
  projectId: "realtime-chat-app-5bb87",
  storageBucket: "realtime-chat-app-5bb87.appspot.com",
  messagingSenderId: "859792545013",
  appId: "1:859792545013:web:6e933ea77336e6e7d861bc"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };