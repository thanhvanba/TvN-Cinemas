// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDHwt1fpDNNKwnPKas3rGxGfmu-AXGV2KQ",
    authDomain: "nt-cinema.firebaseapp.com",
    projectId: "nt-cinema",
    storageBucket: "nt-cinema.appspot.com",
    messagingSenderId: "769879488147",
    appId: "1:769879488147:web:64afb1ba435bfdbe307f66",
    measurementId: "G-77QZ0THNM7"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
