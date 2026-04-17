import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Button, Card, useTheme, ActivityIndicator, IconButton, TextInput, Divider } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchGeminiSummary } from '../../api/gemini';
import { Madde } from '../(tabs)/index';

export default function ArticleDetailScreen() {
  const params = useLocalSearchParams();
  const item: Madde | null = params.item ? JSON.parse(params.item as string) : null;
  const theme = useTheme();
  
  const [ayrintilar, setAyrintilar] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [note, setNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    if (item) {
      loadData();
    }
  }, []);

  const loadData = async () => {
    try {
      // Favori kontrolü
      const favsStr = await AsyncStorage.getItem('favorites');
      if (favsStr) {
        const favs = JSON.parse(favsStr);
        setIsFavorite(favs.some((f: Madde) => f.id === item?.id));
      }
      
      // Not kontrolü
      const notesStr = await AsyncStorage.getItem('notes');
      if (notesStr) {
        const notes = JSON.parse(notesStr);
        if (notes[item!.id]) {
          setNote(notes[item!.id]);
        }
      }
    } catch (e) {
      console.error('Veri yüklenirken hata:', e);
    }
  };

  const toggleFavorite = async () => {
    try {
      const favsStr = await AsyncStorage.getItem('favorites');
      let favs: Madde[] = favsStr ? JSON.parse(favsStr) : [];
      
      if (isFavorite) {
        favs = favs.filter(f => f.id !== item?.id);
      } else if (item) {
        favs.push(item);
      }
      
      await AsyncStorage.setItem('favorites', JSON.stringify(favs));
      setIsFavorite(!isFavorite);
    } catch (e) {
      console.error('Favori kaydedilemedi', e);
    }
  };

  const saveNote = async () => {
    if (!item) return;
    setSavingNote(true);
    try {
      const notesStr = await AsyncStorage.getItem('notes');
      let notes = notesStr ? JSON.parse(notesStr) : {};
      
      if (note.trim() === '') {
        delete notes[item.id];
      } else {
        notes[item.id] = note;
      }
      
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
    } catch (e) {
      console.error('Not kaydedilemedi', e);
    } finally {
      setSavingNote(false);
    }
  };

  const getAISummary = async () => {
    if (!item) return;
    setLoadingAI(true);
    try {
      const summary = await fetchGeminiSummary(item.icerik);
      setAyrintilar(summary);
    } catch (error) {
      console.error("AI Özeti alınamadı", error);
    } finally {
      setLoadingAI(false);
    }
  };

  if (!item) {
    return <View style={styles.container}><Text>Madde bulunamadı.</Text></View>;
  }

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Card style={styles.card}>
          <Card.Title 
            title={`Madde ${item.madde_no} - ${item.baslik}`} 
            titleNumberOfLines={2}
            right={(props) => (
               <IconButton 
                 {...props} 
                 icon={isFavorite ? "bookmark" : "bookmark-outline"} 
                 iconColor={theme.colors.primary}
                 onPress={toggleFavorite} 
               />
            )}
          />
          <Card.Content>
            <Text variant="bodyLarge" style={{ lineHeight: 24, paddingVertical: 10 }}>
              {item.icerik}
            </Text>
          </Card.Content>
        </Card>

        <View style={styles.aiContainer}>
          <Button 
            mode="contained" 
            icon="robot-outline" 
            onPress={getAISummary}
            disabled={loadingAI}
            style={styles.actionButton}
          >
            {loadingAI ? 'Açıklanıyor...' : "AI ile Basitleştir"}
          </Button>
          
          {loadingAI && <ActivityIndicator style={{ marginTop: 16 }} />}

          {ayrintilar && (
            <Card style={[styles.aiCard, { backgroundColor: theme.colors.elevation.level2 }]}>
              <Card.Content>
                <Text variant="titleMedium" style={{ color: theme.colors.primary, marginBottom: 8 }}>
                  💡 Hukuki Çeviri (Özet)
                </Text>
                <Text variant="bodyMedium" style={{ lineHeight: 22 }}>
                  {ayrintilar}
                </Text>
              </Card.Content>
            </Card>
          )}
        </View>

        <Divider style={styles.divider} />

        <View style={styles.notesContainer}>
          <Text variant="titleMedium" style={{ marginBottom: 10, color: theme.colors.primary }}>
            📝 Kişisel Ders Notum
          </Text>
          <TextInput
            mode="outlined"
            placeholder="Bu madde ile ilgili kendi notunuzu buraya yazın..."
            multiline
            numberOfLines={4}
            value={note}
            onChangeText={setNote}
            style={styles.textInput}
            onBlur={saveNote} // Klavyeden çıkıldığında otomatik kaydeder
          />
          {savingNote && <Text variant="labelSmall" style={{ marginTop: 4, color: 'gray' }}>Kaydediliyor...</Text>}
        </View>
        
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { marginBottom: 20 },
  aiContainer: { marginTop: 5 },
  actionButton: { borderRadius: 8 },
  aiCard: { marginTop: 16, borderColor: '#6200ea', borderWidth: 1 },
  divider: { marginVertical: 24 },
  notesContainer: { paddingBottom: 40 },
  textInput: { minHeight: 100 }
});
