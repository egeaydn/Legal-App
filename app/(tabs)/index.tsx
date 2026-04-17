import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { TextInput, Card, Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { fetchMaddeler } from '../../api/firebase';

export interface Madde {
  id: string;
  mevzuat_id?: string;
  madde_no: string;
  baslik: string;
  icerik: string;
  kategori: string;
}

export default function HomeScreen() {
  const [maddeler, setMaddeler] = useState<Madde[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await fetchMaddeler(); 
    setMaddeler(data);
  };

  const renderItem = ({ item }: { item: Madde }) => (
    <Card 
      style={styles.card} 
      onPress={() => router.push({ pathname: '/article/[id]', params: { id: item.id, item: JSON.stringify(item) } })}
    >
      <Card.Content>
        <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
          {item.kategori} - Madde {item.madde_no}
        </Text>
        <Text variant="bodyMedium" style={styles.baslik}>{item.baslik}</Text>
      </Card.Content>
    </Card>
  );

  const filteredData = maddeler.filter(m => 
    m.baslik.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.icerik.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TextInput
        mode="outlined"
        placeholder="Kanun, madde veya anahtar kelime ara..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        left={<TextInput.Icon icon="magnify" />}
        style={styles.searchBar}
      />
      
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  searchBar: { marginBottom: 16 },
  card: { marginBottom: 12, elevation: 2 },
  baslik: { marginTop: 8, fontWeight: 'bold' }
});
