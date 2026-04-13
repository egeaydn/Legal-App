import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Button, Card, useTheme, ActivityIndicator, IconButton } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { fetchGeminiSummary } from '../../api/gemini';

export default function ArticleDetailScreen() {
  const params = useLocalSearchParams();
  const item = params.item ? JSON.parse(params.item as string) : null;
  const theme = useTheme();
  
  const [ayrintilar, setAyrintilar] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!item) {
    return <View style={styles.container}><Text>Madde bulunamadı.</Text></View>;
  }

  const getAISummary = async () => {
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

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={styles.card}>
        <Card.Title 
          title={`Madde ${item.madde_no} - ${item.baslik}`} 
          right={(props) => (
             <IconButton 
               {...props} 
               icon={isFavorite ? "bookmark" : "bookmark-outline"} 
               iconColor={theme.colors.primary}
               onPress={() => setIsFavorite(!isFavorite)} 
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
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { marginBottom: 20 },
  aiContainer: { marginTop: 10, paddingBottom: 40 },
  aiCard: { marginTop: 16, borderColor: '#6200ea', borderWidth: 1 }
});
