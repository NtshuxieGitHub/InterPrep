import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGsjA-HzK_TWFLzEGkKS_7VGorJzSFZ-0",
  authDomain: "interprep-a1e47.firebaseapp.com",
  projectId: "interprep-a1e47",
  storageBucket: "interprep-a1e47.firebasestorage.app",
  messagingSenderId: "634552028006",
  appId: "1:634552028006:web:0e14194a97a50f5aee96a7",
  measurementId: "G-3PY2R3GYZR",
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
