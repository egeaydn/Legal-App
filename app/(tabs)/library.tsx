import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LibraryScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={styles.card}>
        <Card.Title 
          title="Kaydedilen Maddeler" 
          left={(props) => <MaterialCommunityIcons name="bookmark-multiple" size={24} color={theme.colors.primary} />} 
        />
        <Card.Content>
          <Text variant="bodyMedium">Henüz hiçbir kanun maddesini kaydetmediniz.</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title 
          title="Kişisel Ders Notları" 
          left={(props) => <MaterialCommunityIcons name="notebook-edit" size={24} color={theme.colors.primary} />} 
        />
        <Card.Content>
          <Text variant="bodyMedium">Burada maddelere çalışırken tuttuğunuz özel ders notlarınız görüntülenecektir.</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  }
});
