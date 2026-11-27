import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDs•••••••••••••••••••••••••••••••',
  authDomain: 'iwamad-chat-c4738.firebaseapp.com',
  databaseURL: 'https://iwamad-chat-c4738-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'iwamad-chat-c4738',
  storageBucket: 'iwamad-chat-c4738.firebasestorage.app',
  messagingSenderId: '299719547859',
  appId: '1:299719547859:web:265449f4ec223ce326ad26',
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);