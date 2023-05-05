import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgi3Gx4a4dOCZnO8SQugfh2Ol-C4_WMf8",
  authDomain: "reddit-clone-project-d8e3a.firebaseapp.com",
  projectId: "reddit-clone-project-d8e3a",
  storageBucket: "reddit-clone-project-d8e3a.appspot.com",
  messagingSenderId: "551367948361",
  appId: "1:551367948361:web:008239475bd98c0009e798",
  measurementId: "G-Z74N5D691H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
