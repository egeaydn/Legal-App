import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase only if it hasn't been initialized already (helps with Expo Hot Reloading)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Bu fonksiyon Firestore'daki "1" koleksiyonundan ana kitapçıkları çeker
export const fetchKanunKitapciklari = async () => {
  try {
    const kitapciklarCol = collection(db, '1'); // Resimde koleksiyon adı '1' olarak görünüyor
    const snapshot = await getDocs(kitapciklarCol);
    
    if (snapshot.empty) {
      throw new Error("Veritabanında gösterilecek hiçbir kanun kitapçığı bulunamadı.");
    }

    const kitapcikList = snapshot.docs.map(doc => ({
      id: doc.id,
      Name: doc.data().Name || "İsimsiz Kanun",
      Abbreviation: doc.data().Abbreviation || ""
    }));

    return kitapcikList;
  } catch(error) {
    console.error("Firebase bağlantı hatası:", error);
    // Hata fırlatarak arayüzde (UI) "Bir sorun oluştu" hata mesajını tetikliyoruz (Array kullanmıyoruz)
    throw new Error("Bir sorun oluştu. Bulut sunucudan kanun listesi getirilemedi."); 
  }
};
