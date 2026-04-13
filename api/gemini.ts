// Projede .env kullanarak API anahtarlarınızı daima gizleyin
// Örnek: process.env.EXPO_PUBLIC_GEMINI_API_KEY
// Buraya API key eklenebilir veya app.json içerisinden çekilebilir.

export const fetchGeminiSummary = async (maddeMetni: string) => {
  const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || "TEST_KEY";
  
  if (GEMINI_API_KEY === "TEST_KEY") {
    // If no key is set up yet, delay for 1.5s to simulate network request 
    // and return a mock simplified summary.
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(`(Simüle Edilen AI Özeti): Maddeyi özetlemek gerekirse, bu durum temelde ${maddeMetni.split(" ").slice(0, 5).join(" ")}... bağlamında incelenmektedir ve özetle hukuki olarak şu anlama gelir: Eğer bir kişi kasıtlı veya taksirli olarak bir fiil işlerse, kanun ona belirli yaptırımlar öngörmektedir. Daha anlaşılır olarak: Kurallara aykırı eylemlerin sonucu vardır.`);
      }, 1500);
    });
  }

  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
  const prompt = `Aşağıdaki kanun maddesini, hukuk fakültesi 1. sınıf öğrencisinin anlayabileceği kadar açık, net ve yalın bir Türkçe ile özetle ve açıkla. Gerekirse günlük hayattan kısa bir örnek ver. Sadece açıklamayı dön.\n\nMadde Metni: "${maddeMetni}"`;

  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
            temperature: 0.3, 
            maxOutputTokens: 800,
        }
      })
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0].content.parts[0].text) {
        return data.candidates[0].content.parts[0].text;
    } else {
        throw new Error("Beklenmeyen yanıt formatı");
    }

  } catch (error) {
    console.error("Gemini API Hatası:", error);
    return "Maddenin açıklaması şu an AI tarafından oluşturulamadı. Lütfen API anaharını veya internetinizi kontrol edin.";
  }
};
