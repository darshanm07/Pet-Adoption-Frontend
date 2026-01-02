import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Initialize Firebase with your config
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
export const messaging = getMessaging(app);

// Function to request user permission and get token
export const getFcmToken = async () => {
  try {
    // Register the service worker manually to ensure it's found
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    const currentToken = await getToken(messaging, {
      vapidKey:
        "BOTP_idjDpA_0sUEvxH0wCKJNKYMthNwK0XVDNE3OY_RxY1wTPh021sKrK-vuhyAtb5mfupK1RO8rIHrq93hVes",
      serviceWorkerRegistration: registration, // Explicitly pass the registration
    });

    if (currentToken) {
      return currentToken;
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
      return null;
    }
  } catch (err) {
    console.error("Error retrieving token:", err);
    return null;
  }
};

// Listener for foreground messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
