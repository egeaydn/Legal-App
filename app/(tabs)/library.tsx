import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Pressable, Platform } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeInDown, FadeInUp, Layout, ZoomIn } from 'react-native-reanimated';

export interface Madde {
  id: string;
  madde_no: string;
  baslik: string;
  icerik: string;
  kategori?: string;
  mevzuat_id?: string;
}

export default function LibraryScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Madde[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      loadLibraryData();
    }, [])
  );

  const loadLibraryData = async () => {
    setLoading(true);
    try {
      const favsStr = await AsyncStorage.getItem('favorites');
      const notesStr = await AsyncStorage.getItem('notes');
      
      if (favsStr) setFavorites(JSON.parse(favsStr));
      if (notesStr) setNotes(JSON.parse(notesStr));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (id: string) => {
    try {
      const newFavs = favorites.filter(f => f.id !== id);
      setFavorites(newFavs); // Optimistic UI update (Hemen silindi hissi verir)
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavs));
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item, index }: { item: Madde, index: number }) => {
    const hasNote = notes[item.id] && notes[item.id].trim() !== '';

    return (
      <Animated.View 
        entering={FadeInUp.delay(index * 80).springify().damping(14)} 
        layout={Layout.springify()} // Listeden bir şey silinince diğerleri kayarak yerleşir
        style={{ marginBottom: 16 }}
      >
        <Pressable 
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed
          ]}
          onPress={() => router.push({ pathname: '/article/[id]', params: { id: item.id, item: JSON.stringify(item) } })}
        >
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.kategori || "KANUN"}</Text>
              </View>
              <Text style={styles.maddeNo}>Madde {item.madde_no}</Text>
            </View>
            <IconButton 
              icon="bookmark-remove" 
              iconColor="#ff4444"
              size={22}
              style={{ margin: 0 }}
              onPress={() => removeFavorite(item.id)} 
            />
          </View>
          
          <Text style={styles.cardTitle} numberOfLines={2}>{item.baslik}</Text>
          
          {hasNote && (
            <View style={styles.noteContainer}>
              <View style={styles.noteIndicator} />
              <Text style={styles.noteText} numberOfLines={2}>
                <MaterialCommunityIcons name="notebook-edit" size={14} color="#005b9f" /> {notes[item.id]}
              </Text>
            </View>
          )}
        </Pressable>
      </Animated.View>
    );
  };

  if (loading) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <Animated.Text entering={FadeInDown.duration(400).delay(100)} style={styles.pageTitle}>
        Kaydettiklerim ({favorites.length})
      </Animated.Text>
      
      {favorites.length === 0 ? (
        <Animated.View entering={ZoomIn.duration(600).springify()} style={styles.emptyContainer}>
          <MaterialCommunityIcons name="bookshelf" size={90} color="#c0c8d1" />
          <Text style={styles.emptyTitle}>Kütüphaneniz bomboş</Text>
          <Text style={styles.emptySub}>Maddeleri okurken yer imi butonuna basarak buraya ekleyebilirsiniz.</Text>
        </Animated.View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
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
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  card: {
    backgroundColor: '#FAF9F6',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardPressed: {
    transform: [{ scale: 0.97 }],
    backgroundColor: '#f0efe9',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#9d0000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  maddeNo: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
    lineHeight: 24,
  },
  noteContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    flexDirection: 'row',
  },
  noteIndicator: {
    width: 3,
    backgroundColor: '#005b9f',
    borderRadius: 3,
    marginRight: 8,
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    marginTop: -80,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8a95a5',
    marginTop: 20,
  },
  emptySub: {
    fontSize: 15,
    color: '#a0abb8',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  }
});
