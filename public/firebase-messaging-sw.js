importScripts(
  "https://www.gstatic.com/firebasejs/9.1.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.2/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCDNnz1U6zjFKyUx-qB66PiWHTF9m-TCsY",
  authDomain: "pet-adoption-system-f31ac.firebaseapp.com",
  projectId: "pet-adoption-system-f31ac",
  storageBucket: "pet-adoption-system-f31ac.firebasestorage.app",
  messagingSenderId: "310977206188",
  appId: "1:310977206188:web:8851143b2507bebf698c09",
};

// Initialize Firebase using compat version
firebase.initializeApp(firebaseConfig);

// Get the messaging instance (compat version)
const messaging = firebase.messaging();

// Ensure the background message handler is set correctly
messaging.onBackgroundMessage(function (payload) {
  const title = payload.notification.title;
  const options = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  // Display the notification
  return self.registration.showNotification(title, options);
});
