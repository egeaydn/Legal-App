import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, useTheme, Card, IconButton, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Madde } from './index';

export default function LibraryScreen() {
  const theme = useTheme();
  const router = useRouter();
  
  const [favorites, setFavorites] = useState<Madde[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  // useFocusEffect ensures data is re-fetched every time user opens the tab
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
      console.error("Kütüphane yüklenemedi", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (id: string) => {
    try {
      const newFavs = favorites.filter(f => f.id !== id);
      setFavorites(newFavs);
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavs));
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }: { item: Madde }) => {
    const hasNote = notes[item.id] && notes[item.id].trim() !== '';

    return (
      <Card 
        style={styles.card}
        onPress={() => router.push({ pathname: '/article/[id]', params: { id: item.id, item: JSON.stringify(item) } })}
      >
        <Card.Title 
          title={`${item.kategori} - Madde ${item.madde_no}`}
          subtitle={item.baslik}
          right={(props) => (
            <IconButton 
              {...props} 
              icon="bookmark-remove" 
              iconColor={theme.colors.error}
              onPress={() => removeFavorite(item.id)} 
            />
          )}
        />
        {hasNote && (
          <>
            <Divider />
            <Card.Content style={styles.noteContent}>
              <Text variant="labelMedium" style={{ color: theme.colors.primary, marginBottom: 4 }}>
                <MaterialCommunityIcons name="notebook-edit" size={14} /> Benim Notum:
              </Text>
              <Text variant="bodySmall" numberOfLines={2} style={{ fontStyle: 'italic', opacity: 0.8 }}>
                {notes[item.id]}
              </Text>
            </Card.Content>
          </>
        )}
      </Card>
    );
  };

  if (loading) {
    return <View style={[styles.container, { backgroundColor: theme.colors.background }]} />
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="bookshelf" size={64} color={theme.colors.onSurfaceDisabled} />
          <Text variant="titleMedium" style={{ marginTop: 16, color: theme.colors.onSurfaceDisabled }}>
            Kütüphaneniz bomboş.
          </Text>
          <Text variant="bodyMedium" style={{ marginTop: 8, textAlign: 'center', opacity: 0.6 }}>
            Maddeleri okurken yer imi butonuna basarak buraya ekleyebilirsiniz.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListHeaderComponent={
            <Text variant="titleLarge" style={[styles.header, { color: theme.colors.onSurface }]}>
              Kaydettiklerim ({favorites.length})
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
    fontWeight: 'bold'
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  noteContent: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.02)'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  }
});
