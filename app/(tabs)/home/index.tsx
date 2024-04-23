/* eslint-disable prettier/prettier */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View, FlatList, SafeAreaView } from 'react-native';

import { dummyRestaurantsData } from '~/assets/data/restaurantsData';
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
      <FlatList
        data={dummyRestaurantsData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <Text className={styles.cardTitle}>All Restaurants And Stores</Text>
        )}
        renderItem={({ item }) =><MarketCard restaurantData={item} />}
      />

      
    </SafeAreaView>
  );
};

const styles = {
  container: 'flex-1 p-4 mt-6 bg-white',
  header: 'flex-row justify-between',
  adressContainer: 'flex-row items-center',
  adressText: 'ml-2',
  cardTitle: 'mt-4 mb-2 text-lg font-bold',
};
export default HomeScreen;
