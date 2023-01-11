import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAVLKCjye5WxO4mtLQvQ_O3EwWA_fPa0Bs",
  authDomain: "amzone-clone-e835c.firebaseapp.com",
  projectId: "amzone-clone-e835c",
  storageBucket: "amzone-clone-e835c.appspot.com",
  messagingSenderId: "197495545527",
  appId: "1:197495545527:web:e9e6c8882c66dbfeca3732",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
