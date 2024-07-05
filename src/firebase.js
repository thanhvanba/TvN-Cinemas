// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import FirebaseService from './service/FirebaseService';

const firebaseConfig = {
    apiKey: "AIzaSyDHwt1fpDNNKwnPKas3rGxGfmu-AXGV2KQ",
    authDomain: "nt-cinema.firebaseapp.com",
    projectId: "nt-cinema",
    storageBucket: "nt-cinema.appspot.com",
    messagingSenderId: "769879488147",
    appId: "1:769879488147:web:64afb1ba435bfdbe307f66",
    measurementId: "G-77QZ0THNM7"
};
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = () => {
    console.log('vao đây')
    const { saveTokenFirebaseApi } = FirebaseService()
    const handleSaveToken = async (token) => {
        await saveTokenFirebaseApi(token)
    }
    return Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            navigator.serviceWorker.register('/firebase-messaging-sw.js')
                .then((registration) => {
                    getToken(messaging, { vapidKey: 'BCgXX47z750hEbtv_8Z-iwYQLZm3R5I7_kI5HSauNMFrLaQGGMmKukvKm2KiUZQbQ6bV8yKvtc5OEUSeQuZfn20', serviceWorkerRegistration: registration })
                        .then((currentToken) => {
                            if (currentToken) {
                                console.log('current token for client: ', currentToken);
                                // Gửi token này đến server backend để lưu trữ
                                handleSaveToken(currentToken)
                            } else {
                                console.log('No registration token available. Request permission to generate one.');
                            }
                        })
                        .catch((err) => {
                            console.log('An error occurred while retrieving token. ', err);
                        });
                })
                .catch((err) => {
                    console.error('Service worker registration failed, error:', err);
                });
        } else {
            console.log('Notification permission denied.');
            alert('Please enable notifications in your browser settings.');
        }
    });
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });