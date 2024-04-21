/* eslint-disable prettier/prettier */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MarketCard from '~/components/MarketCard';

const HomeScreen = () => {
  return (
    <SafeAreaView className={styles.container}>
      <View className={styles.header}>
        <View className={styles.adressContainer}>
          <MaterialCommunityIcons name="map-marker-outline" size={28} color="black" />
          <Text className={styles.adressText}>Your Adress here</Text>
        </View>
      </View>

      <MarketCard />
    </SafeAreaView>
  );
};

const styles = {
  container: 'flex-1 p-4 mt-6 bg-white',
  header: 'flex-row justify-between',
  adressContainer: 'flex-row items-center',
  adressText: 'ml-2',
};
export default HomeScreen;
