import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3jmtXne9KSfvGT_pt3_yU7wtyGSYOFnU",
  authDomain: "taskmeter-e3b74.firebaseapp.com",
  projectId: "taskmeter-e3b74",
  storageBucket: "taskmeter-e3b74.firebasestorage.app",
  messagingSenderId: "325615319561",
  appId: "1:325615319561:web:8a4619b6bf0ceb057d16d8",
  measurementId: "G-H9EG9TY9XV",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);

// config/firebase.ts
// import { initializeApp } from '@react-native-firebase/app';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import storage from '@react-native-firebase/storage';

// const firebaseConfig = {
//   apiKey: 'AIzaSyB3jmtXne9KSfvGT_pt3_yU7wtyGSYOFnU',
//   authDomain: 'taskmeter-e3b74.firebaseapp.com',
//   projectId: 'taskmeter-e3b74',
//   storageBucket: 'taskmeter-e3b74.appspot.com',
//   messagingSenderId: '325615319561',
//   appId: '1:325615319561:web:8a4619b6bf0ceb057d16d8',
//   measurementId: 'G-H9EG9TY9XV',
// };

// // This makes sure the native app is initialized.
// const firebaseApp = initializeApp(firebaseConfig);
// console.log('🔥 Firebase native app initialized:', firebaseApp.name);

// // Export the native modules:
// export { auth, firestore as db, storage };
