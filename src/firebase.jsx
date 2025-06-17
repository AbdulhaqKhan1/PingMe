import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCvqahxeKoF3V248lHviBGpSFUqFJLSAp8",
  authDomain: "pingme-2d3c4.firebaseapp.com",
  projectId: "pingme-2d3c4",
  storageBucket: "pingme-2d3c4.appspot.com",
  messagingSenderId: "41586373156",
  appId: "1:41586373156:web:0a8c00cfc919db114a9eb1"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
