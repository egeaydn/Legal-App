import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app, '(default)');

export const fetchKanunKitapciklari = async () => {
  try {
    const kitapciklarCol = collection(db, '1'); 
    
    console.log("=== YENİ FIREBASE SUNUCUSU BAĞLANTISI ===");
    console.log("Proje ID:", process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID);

    const snapshot = await getDocs(kitapciklarCol);
    console.log("Bulunan Belge Sayısı:", snapshot.size);
    console.log("=========================================");

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
    throw new Error("Bir sorun oluştu. Bulut sunucudan kanun listesi getirilemedi."); 
  }
};

// Sizin tek tek uğraşmamanız için tek tıkla verileri basacak sihirli fonksiyon :)
export const uploadInitialData = async () => {
  const defaultKanunlar = [
    { Name: 'Türk Ceza Kanunu', Abbreviation: 'TCK' },
    { Name: 'Türk Medeni Kanunu', Abbreviation: 'TMK' },
    { Name: 'Türk Ticaret Kanunu', Abbreviation: 'TTK' },
    { Name: 'Türk Borçlar Kanunu', Abbreviation: 'TBK' },
    { Name: 'Ceza Muhakemesi Kanunu', Abbreviation: 'CMK' },
    { Name: 'Türkiye Cumhuriyeti Anayasası', Abbreviation: 'AY' },
    { Name: 'İcra ve İflas Kanunu', Abbreviation: 'İİK' },
    { Name: 'İdari Yargılama Usulü Kanunu', Abbreviation: 'İYUK' },
  ];

  try {
    const kitapciklarCol = collection(db, '1');
    for (const kanun of defaultKanunlar) {
      await addDoc(kitapciklarCol, kanun);
    }
    console.log("Tüm örnek kanunlar başarıyla yüklendi!");
  } catch (error) {
    console.error("Örnek veri yüklenirken hata:", error);
    throw error;
  }
};
