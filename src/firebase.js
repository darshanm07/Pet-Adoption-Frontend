import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCDNnz1U6zjFKyUx-qB66PiWHTF9m-TCsY",
  authDomain: "pet-adoption-system-f31ac.firebaseapp.com",
  projectId: "pet-adoption-system-f31ac",
  storageBucket: "pet-adoption-system-f31ac.firebasestorage.app",
  messagingSenderId: "310977206188",
  appId: "1:310977206188:web:8851143b2507bebf698c09",
  measurementId: "G-48GY3DPFE0",
};

const app = initializeApp(firebaseConfig);

// Export messaging instance
export const messaging = getMessaging(app);
