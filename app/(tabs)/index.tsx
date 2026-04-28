import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, Platform, Pressable, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { fetchKanunKitapciklari } from '../../api/firebase';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 24;

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [kitapciklar, setKitapciklar] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const dbData = await fetchKanunKitapciklari();
      setKitapciklar(dbData);
    } catch (err: any) {
      setErrorMsg(err.message || "Bilinmeyen bir iletişim hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = kitapciklar.filter(item =>
    item.Name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.Abbreviation?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderKanunCard = ({ item, index }: { item: any, index: number }) => {
    return (
      <Animated.View entering={FadeInUp.delay(index * 70).springify()}>
        <Pressable
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed
          ]}
          onPress={() => router.push({
            pathname: '/booklet/[id]',
            params: {
              id: item.id, 
              name: item.Name,
              abbreviation: item.Abbreviation
            }
          })}
        >
          <Image
            source={require('../../assets/images/tc-adalet-bakanligi-vector-logo.png')}
            style={styles.cardLogo}
            resizeMode="contain"
          />
          <Text style={styles.cardTitle}>{item.Name}</Text>
          {item.Abbreviation ? <Text style={styles.cardAbbreviation}>{item.Abbreviation}</Text> : null}
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundWatermarkContainer}>
        <Text style={styles.backgroundWatermarkText}>91</Text>
      </View>

      <Animated.View entering={FadeIn.delay(150).duration(500)} style={styles.searchContainer}>
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
      </Animated.View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#9d0000" />
          <Text style={{ marginTop: 10, color: '#666' }}>Kanunlar Yükleniyor...</Text>
        </View>
      ) : errorMsg ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>⚠️ Orada Bir Sorun Oluştu!</Text>
          <Text style={styles.errorSubText}>{errorMsg}</Text>
          <Button mode="outlined" onPress={loadData} style={[styles.errorButton, { marginTop: 15 }]} textColor="#9d0000">
            Tekrar Dene
          </Button>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={renderKanunCard}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8EDF2' },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 1,
  },
  errorText: { fontSize: 20, fontWeight: 'bold', color: '#ff3333', marginBottom: 8 },
  errorSubText: { fontSize: 14, color: '#555', textAlign: 'center' },
  errorButton: { borderColor: '#9d0000' },

  backgroundWatermarkContainer: {
    position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
    justifyContent: 'center', alignItems: 'center', zIndex: 0,
  },
  backgroundWatermarkText: {
    fontSize: 250, fontWeight: 'bold', color: '#D4DEF0', opacity: 0.4,
  },
  searchContainer: {
    paddingHorizontal: 16, paddingTop: 20, paddingBottom: 10, zIndex: 1,
  },
  searchBar: { backgroundColor: '#ffffff', height: 50 },
  searchOutline: { borderColor: '#cccccc', borderWidth: 1 },
  listContent: { paddingHorizontal: 16, paddingBottom: 100, zIndex: 1 },
  row: { justifyContent: 'space-between', marginBottom: 20 },

  card: {
    backgroundColor: '#FAF9F6',
    width: CARD_WIDTH,
    height: 140,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 8 },
      android: { elevation: 4 },
    }),
  },
  cardPressed: { transform: [{ scale: 0.96 }], backgroundColor: '#f0efe9' },
  cardLogo: { position: 'absolute', width: 90, height: 90, opacity: 0.15 },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333333',
    lineHeight: 20,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif', default: 'System' }),
  },
  cardAbbreviation: {
    marginTop: 6,
    fontSize: 12,
    color: '#9d0000',
    fontWeight: 'bold',
  }
});
