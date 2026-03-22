import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKDQyqaKZm1INRH8cXI8zYH5GeZH6-kt0",
  authDomain: "tecnocar-web.firebaseapp.com",
  projectId: "tecnocar-web",
  storageBucket: "tecnocar-web.firebasestorage.app",
  messagingSenderId: "115856564448",
  appId: "1:115856564448:web:c20287d62479e8593f3085"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// EXPORTAMOS LA BASE DE DATOS (Esto es lo que faltaba y rompía tu página)
export const db = getFirestore(app);