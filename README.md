<div align="center">

<img src="./assets/images/preview.png" alt="App Preview" width="100%" />

<br/>

# ⚖️ Kanun — Complex Laws, Simple Insights

**Türk hukukunu cebinize sığdırın. Yapay zeka destekli madde açıklamaları ile karmaşık kanunları kolayca anlayın.**

<br/>

![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

</div>

---

## 📱 Ekran Görüntüleri

Uygulamanın dört temel ekranı — kanun listesi, kitapçık görünümü, yapay zeka açıklamaları ve kişisel kütüphane — kesintisiz, akıcı bir deneyim sunar.

---

## ✨ Özellikler

| Özellik                      | Açıklama                                                                          |
| ---------------------------- | --------------------------------------------------------------------------------- |
| 📚 **Kanun Kütüphanesi**     | Türkiye'nin temel kanunlarını (TTK, TMK, TCK, CMK…) arayın ve keşfedin            |
| 📖 **Kitapçık Görünümü**     | Seçtiğiniz kanunun maddelerini sıralı ve okunabilir biçimde görüntüleyin          |
| 🤖 **Yapay Zeka Açıklaması** | Google Gemini ile karmaşık maddeleri hukuk fakültesi 1. sınıf seviyesinde anlayın |
| 🔖 **Kişisel Kütüphane**     | Sık başvurduğunuz maddeleri kaydedin, kişisel ders notları ekleyin                |
| 🔍 **Akıllı Arama**          | Kanun adı veya kısaltmasıyla (TTK, TCK…) anında filtreleyin                       |
| ✨ **Akıcı Animasyonlar**    | React Native Reanimated ile smooth geçişler ve dokunuş geri bildirimleri          |

---

## 🛠️ Teknoloji Yığını

```
📦 Expo SDK 54          — Cross-platform mobil uygulama çerçevesi
⚛️  React Native 0.81   — iOS & Android UI
🔥 Firebase Firestore   — Gerçek zamanlı bulut veritabanı
🤖 Google Gemini AI     — Yapay zeka destekli madde açıklamaları
🎨 React Native Paper   — Material Design UI bileşenleri
🎬 Reanimated 4         — Yüksek performanslı animasyonlar
💾 AsyncStorage         — Yerel yer imi ve not depolama
🗂️  Expo Router         — Dosya tabanlı sayfa yönlendirme
```

---

## 🚀 Başlarken

### Gereksinimler

- [Node.js](https://nodejs.org/) (v18+)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS Simulator veya Android Emulator (ya da fiziksel cihaz)

### Kurulum

**1. Depoyu klonlayın**

```bash
git clone https://github.com/kullanici-adi/kanun-app.git
cd kanun-app
```

**2. Bağımlılıkları yükleyin**

```bash
npm install
```

**3. Ortam değişkenlerini ayarlayın**

Proje kök dizininde bir `.env` dosyası oluşturun:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

**4. Uygulamayı başlatın**

```bash
npx expo start
```

Çıktıda aşağıdaki seçenekleri göreceksiniz:

- **`i`** → iOS Simulator
- **`a`** → Android Emulator
- **`w`** → Web tarayıcısı
- **QR Kod** → Expo Go uygulamasıyla fiziksel cihaz

---

## 📁 Proje Yapısı

```
kanun-app/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx        # Ana ekran — kanun listesi & arama
│   │   └── library.tsx      # Kütüphane — kaydedilen maddeler
│   ├── booklet/
│   │   └── [id].tsx         # Kanun kitapçığı — madde listesi
│   ├── article/
│   │   └── [id].tsx         # Madde detayı & AI açıklaması
│   ├── modal.tsx            # Madde detay modalı
│   └── _layout.tsx          # Kök layout
├── api/
│   ├── firebase.ts          # Firestore bağlantısı & veri çekme
│   └── gemini.ts            # Google Gemini AI entegrasyonu
├── components/              # Yeniden kullanılabilir UI bileşenleri
├── constants/
│   └── theme.ts             # Renk paleti & tema sabitleri
└── assets/
    └── images/              # Uygulama ikonları & görseller
```

---

## 🎨 Tasarım Dili

- **Ana renk:** `#9d0000` — Koyu kırmızı (Türk hukuku & resmiyet)
- **Arka plan:** `#E8EDF2` — Soft mavi-gri
- **Kart zemin:** `#FAF9F6` — Kırık beyaz
- **Yazı tipi:** Georgia / Serif (iOS & Android uyumlu)
- **Köşe yarıçapı:** 20px — Modern, yuvarlak kartlar

---

## 📄 Lisans

Bu proje MIT Lisansı kapsamında lisanslanmıştır.

---

<div align="center">

**made with ❤️ by [Ege Aydın](https://github.com/egeaydin)**

_"Hukuk herkese ait, anlamak ise artık kolay."_

</div>
