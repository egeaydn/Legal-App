import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function CustomHeader({ title }: { title: string }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.6)',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        header: ({ route, options }) => <CustomHeader title={options.title || route.name} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Kanunlar',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="book-open-variant" size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Kütüphane',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bookmark-multiple" size={26} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#9d0000',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: Platform.OS === 'ios' ? 100 : 80,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabBar: {
    backgroundColor: '#9d0000',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute', // Needed for border radius to be clearly seen without background artifacts
    left: 0,
    right: 0,
    bottom: 0,
    height: Platform.OS === 'ios' ? 90 : 70,
    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
    paddingTop: 10,
    elevation: 0, // hide shadow on android for exact shape
    borderTopWidth: 0,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingBottom: 5,
  }
});
