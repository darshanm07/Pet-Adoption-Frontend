importScripts("www.gstatic.com");
importScripts("www.gstatic.com");

firebase.initializeApp({
  apiKey: "AIzaSyCDNnz1U6zjFKyUx-qB66PiWHTF9m-TCsY",
  authDomain: "pet-adoption-system-f31ac.firebaseapp.com",
  projectId: "pet-adoption-system-f31ac",
  storageBucket: "pet-adoption-system-f31ac.firebasestorage.app",
  messagingSenderId: "310977206188",
  appId: "1:310977206188:web:8851143b2507bebf698c09",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
