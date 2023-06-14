import config from '../firebase-key.json';
import { initFirestore } from "@next-auth/firebase-adapter";
import { cert } from "firebase-admin/app";

export const firestore = initFirestore({
  credential: cert(config),
});