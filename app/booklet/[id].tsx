import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Pressable, Platform } from 'react-native';
import { Text, IconButton, useTheme, ActivityIndicator, Appbar } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function BookletScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const theme = useTheme();
  
  const bookletName = params.name as string || "Kanun Kitapçığı";
  const bookletAbbreviation = params.abbreviation as string || "KANUN";

  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    // Şimdilik API olmadığı için sahte (Dummy) maddeler üretiyoruz.
    // Gerçek veritabanını bağladığımızda burası Firebase'den veya bir JSON API'den gelecek.
    setTimeout(() => {
      const dummyArticles = Array.from({ length: 20 }).map((_, i) => ({
        id: `madde-${i + 1}`,
        madde_no: `${i + 1}`,
        baslik: i === 0 ? 'Amaç ve Kapsam' : i === 1 ? 'Tanımlar' : 'Genel Hükümler',
        icerik: `Bu metin, ${bookletName} madde ${i + 1} için geçici bir yer tutucudur. Gerçek kanun verileri API'den çekildiğinde burada asıl hukuki metin yer alacaktır. Yapay zeka bu gerçek metni özetleyecektir.`,
        kategori: bookletAbbreviation
      }));
      setArticles(dummyArticles);
      setLoading(false);
    }, 800); // Sanki internetten indiriyormuş gibi ufak bir bekleme efekti
  }, []);

  const renderArticle = ({ item, index }: { item: any, index: number }) => (
    <Animated.View entering={FadeInUp.delay(index * 50).springify()}>
      <Pressable 
        style={({ pressed }) => [
          styles.articleCard,
          pressed && styles.articleCardPressed
        ]}
        onPress={() => router.push({ 
          pathname: '/article/[id]', 
          params: { id: item.id, item: JSON.stringify(item) } 
        })}
      >
        <View style={styles.cardHeader}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Madde {item.madde_no}</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" />
        </View>
        <Text style={styles.articleTitle}>{item.baslik}</Text>
        <Text style={styles.articlePreview} numberOfLines={2}>{item.icerik}</Text>
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
        <IconButton 
          icon="arrow-left" 
          iconColor="#fff" 
          size={24} 
          onPress={() => router.back()} 
          style={styles.backButton}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerAbbreviation}>{bookletAbbreviation}</Text>
          <Text style={styles.headerTitle} numberOfLines={1}>{bookletName}</Text>
        </View>
      </Animated.View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#9d0000" />
          <Text style={styles.loadingText}>Maddeler Yükleniyor...</Text>
        </View>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id}
          renderItem={renderArticle}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EDF2',
  },
  header: {
    backgroundColor: '#9d0000',
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    paddingBottom: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6 },
      android: { elevation: 8 },
    }),
    zIndex: 10,
  },
  backButton: {
    margin: 0,
    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  headerAbbreviation: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  listContent: {
    padding: 16,
    paddingTop: 24,
    paddingBottom: 40,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
    fontWeight: '500',
  },
  articleCard: {
    backgroundColor: '#FAF9F6',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 },
      android: { elevation: 2 },
    }),
  },
  articleCardPressed: {
    transform: [{ scale: 0.98 }],
    backgroundColor: '#f0efe9',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#005b9f',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 6,
  },
  articlePreview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  }
});
