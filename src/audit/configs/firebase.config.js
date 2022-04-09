import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp({
  apiKey: 'AIzaSyBpca4FGJ6w5SFIReLo4ixEmZCm9mY_hnk',
  authDomain: `${process.env.AUTH_DOMAIN}`,
  projectId: `${process.env.PROJECT_ID}`,
  databaseURL:
    'https://gamma-seven-default-rtdb.europe-west1.firebasedatabase.app/',
  storageBucket: `${process.env.STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.MESSAGING_SENDER_ID}`,
  appId: `${process.env.APP_ID}`,
  measurementId: `${process.env.MEASUREMENT_ID}`,
});

export const firestore = getFirestore(app);
