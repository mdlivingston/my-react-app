import 'firebase/auth';
import firebase from 'firebase';

var app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
});

export const auth = app.auth();
const firestore = app.firestore()

export const db = {
    folders: firestore.collection('folders'),
    files: firestore.collection("files"),
    editor: firestore.collection('editor'),
    exams: firestore.collection('exams'),
    formatDoc: doc =>
    {
        return {
            id: doc.id,
            ...doc.data(),
        }
    },
    getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}
export const storage = app.storage();
export default app;
