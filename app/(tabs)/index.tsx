import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { fetchMaddeler } from '../../api/firebase';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 24; // 2 cols with padding

// Benzersiz mevzuat isimlerini çıkarmak için taslak objeler.
// Şimdilik listeleme kanun isimleri bazında gruplanmış görünmeli.
const KANUNLAR = [
  { id: '1', title: 'Türk Ceza Kanunu' },
  { id: '2', title: 'Türk Medeni Kanunu' },
  { id: '3', title: 'Türk Ticaret Kanunu' },
  { id: '4', title: 'Türk Borçlar Kanunu' },
  { id: '5', title: 'Ceza Muhakemesi Kanunu' },
  { id: '6', title: 'Türkiye Cumhuriyeti Anayasası' },
  { id: '7', title: 'İcra ve İflas Kanunu' },
  { id: '8', title: 'İdari Yargılama Usulü Kanunu' },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Tasarımdaki kanun listesi
  const renderKanunCard = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.8}
      // Gerçek senaryoda bu kanuna ait maddeleri filtreleyen bir listeye geçiş yapılır.
      // Şimdilik test maddemize yönlendiriyoruz:
      onPress={() => router.push({ 
        pathname: '/article/[id]', 
        params: { id: 'madde_id_1', item: JSON.stringify({
          id: 'madde_id_1',
          madde_no: "1",
          baslik: "Ceza Kanununun Amacı",
          icerik: "Ceza kanununun amacı; kişi hak ve özgürlüklerini, kamu düzen ve güvenliğini, hukuk devletini, kamu sağlığını ve çevreyi korumak, toplum barışını sağlamak, suç işlenmesini önlemektir.",
          kategori: item.title
        })} 
      })}
    >
      <Image 
        source={require('../../assets/images/tc-adalet-bakanligi-vector-logo.png')} 
        style={styles.cardLogo}
        resizeMode="contain"
      />
      <Text style={styles.cardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Background Watermark Logosu - Eğer istenirse */}
      <View style={styles.backgroundWatermarkContainer}>
        <Text style={styles.backgroundWatermarkText}>91</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          mode="outlined"
          placeholder="Ara.."
          value={searchQuery}
          onChangeText={setSearchQuery}
          right={<TextInput.Icon icon="magnify" />}
          style={styles.searchBar}
          outlineStyle={styles.searchOutline}
          theme={{ roundness: 25, colors: { primary: '#9e9e9e' } }}
        />
      </View>
      
      <FlatList
        data={KANUNLAR}
        keyExtractor={item => item.id}
        renderItem={renderKanunCard}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#E8EDF2', 
  },
  backgroundWatermarkContainer: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  backgroundWatermarkText: {
    fontSize: 250,
    fontWeight: 'bold',
    color: '#D4DEF0',
    opacity: 0.4,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    zIndex: 1,
  },
  searchBar: { 
    backgroundColor: '#ffffff',
    height: 50,
  },
  searchOutline: {
    borderColor: '#cccccc',
    borderWidth: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Tab bar için boşluk
    zIndex: 1,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: { 
    backgroundColor: '#dcdcdc',
    width: CARD_WIDTH,
    height: 120,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardLogo: {
    position: 'absolute',
    width: 85,
    height: 85,
    opacity: 0.6,
  },
  cardTitle: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    textAlign: 'center',
    color: '#000',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  }
});
