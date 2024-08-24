// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyBL9oIzk1F82Sc0QnCa-VuEavUerdKWp3U",
    authDomain: "find-me-c82e9.firebaseapp.com",
    projectId: "find-me-c82e9",
    storageBucket: "find-me-c82e9.appspot.com",
    messagingSenderId: "47113311084",
    appId: "1:47113311084:web:51acb04aff33636fc4d949",
    measurementId: "G-Q95SN20QJN"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//   console.log("Received background message ", payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "/public/assets/find-me-logo.png",
//   };

//   // eslint-disable-next-line no-restricted-globals
//   return self.registration.showNotification(
//     notificationTitle,
//     notificationOptions
//   );
// });