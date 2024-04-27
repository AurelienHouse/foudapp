/* eslint-disable prettier/prettier */
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { dummyRestaurantsData } from '~/assets/data/restaurantsData';

const ModalFood = () => {
  const { id, itemId } = useLocalSearchParams();
  const restaurantById = dummyRestaurantsData?.find((r) => r?.id === id);
  const meals = restaurantById?.food.flatMap((c) => c.meals);
  const foundMeals = meals?.find((m) => m.id === +itemId);
  const [note, setNote] = useState('');
  // console.log(foundMeals)
  return (
    <View className={styles.container}>
      <View className="rounded-b-2xl bg-white">
        <Image source={{ uri: foundMeals?.img }} resizeMode="contain" className="h-72 w-full" />
        <View className=" p-5">
          <Text className=" text-2xl font-bold">{foundMeals?.name}</Text>
          <Text className=" my-2 font-[#6e6d72] text-base">{foundMeals?.price} $</Text>
          <Text className=" font-[#6f707c] text-base ">{foundMeals?.info}</Text>
        </View>
      </View>
      <View className=" mt-2 rounded-t-2xl bg-white p-4">
        <TextInput placeholder="Add a note" value={note} onChangeText={setNote} />
      </View>
      <View className=" mb-auto mt-1 flex flex-row justify-between bg-white p-4">
        <View className="flex h-12 w-28 flex-row items-center justify-evenly rounded-full border">
          <Text>-</Text>
          <Text>1</Text>
          <Text>+</Text>
        </View>
        <TouchableOpacity className="w-56 items-center justify-center rounded-full bg-[#34bb78]">
          <Text className=" text-white">add $3.00</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: 'bg-gray-200 flex flex-1',
};
export default ModalFood;
