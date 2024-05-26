import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

import RestaurantDetails from '~/app/restaurantDetails';
import { dummyRestaurantsData } from '~/assets/data/restaurantsData';

const RestaurantDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  // console.log(id)

  const post = dummyRestaurantsData.find((r) => r.id === id);

  if (!post) {
    return <Text>Not Found</Text>;
  }
  return <RestaurantDetails post={post} />;
};

export default RestaurantDetailsScreen;
