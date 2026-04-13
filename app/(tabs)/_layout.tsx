import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        headerStyle: { backgroundColor: theme.colors.elevation.level2 },
        headerTintColor: theme.colors.onSurface,
        tabBarStyle: { backgroundColor: theme.colors.elevation.level1 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Kanunlar',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="book-open-variant" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Kütüphane',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bookmark-multiple" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
