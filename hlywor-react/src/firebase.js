import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAg7yTP5YEDsTUpmNYhCi5iroqNQ_67o58",
  authDomain: "hlywor.firebaseapp.com",
  projectId: "hlywor",
  storageBucket: "hlywor.firebasestorage.app",
  messagingSenderId: "697637160825",
  appId: "1:697637160825:web:00dae42c1b0242c9f4d1a8"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);