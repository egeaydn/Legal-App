// This is a mockup for firebase fetching until you configure credentials.
// In a real application, you initialize firebase app and fetch from firestore collections here.

export const fetchMaddeler = async () => {
  // Simüle edilmiş veritabanı yanıtı
  return [
    {
      id: "madde_id_1",
      mevzuat_id: "mevzuat_id_TCK",
      madde_no: "1",
      baslik: "Ceza Kanununun Amacı",
      icerik: "Ceza kanununun amacı; kişi hak ve özgürlüklerini, kamu düzen ve güvenliğini, hukuk devletini, kamu sağlığını ve çevreyi korumak, toplum barışını sağlamak, suç işlenmesini önlemektir.",
      kategori: "TCK"
    },
    {
      id: "madde_id_141",
      mevzuat_id: "mevzuat_id_TCK",
      madde_no: "141",
      baslik: "Hırsızlık",
      icerik: "Zilyedinin rızası olmadan başkasına ait taşınır bir malı, kendisine veya başkasına bir yarar sağlamak maksadıyla bulunduğu yerden alan kimseye bir yıldan üç yıla kadar hapis cezası verilir.",
      kategori: "TCK"
    },
    {
      id: "madde_id_85",
      mevzuat_id: "mevzuat_id_TCK",
      madde_no: "85",
      baslik: "Taksirle Öldürme",
      icerik: "Taksirle bir insanın ölümüne neden olan kişi, iki yıldan altı yıla kadar hapis cezası ile cezalandırılır.",
      kategori: "TCK"
    }
  ];
};
