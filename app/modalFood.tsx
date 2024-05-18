/* eslint-disable prettier/prettier */
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { dummyRestaurantsData } from '~/assets/data/restaurantsData';
import { useAppContext } from '~/context/appContext';

const ModalFood = () => {
  const { id, itemId } = useLocalSearchParams();
  const navigation = useNavigation();
  const { setFoodData, count, setCount } = useAppContext();
  const [note, setNote] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [restaurantById, setRestaurantById] = useState(null);
  const [meals, setMeals] = useState([]);
  const [foundMeals, setfoundMeals] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const restaurantData = dummyRestaurantsData?.find((r) => r?.id === id);
      setRestaurantById(restaurantData);

      if (restaurantData) {
        const allMeals = restaurantData?.food.flatMap((c) => c.meals);
        setMeals(allMeals);
        const foundMeal = allMeals?.find((m) => m.id === +itemId);
        setfoundMeals(foundMeal);

        if (foundMeal) {
          setTotalPrice(foundMeal.price);
        }
      }
    };
    fetchData();
  }, [id, itemId]);

  useEffect(() => {
    if (foundMeals) {
      setTotalPrice(foundMeals.price * count);
    }
  }, [foundMeals, count]);

  // Items count
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const incrementCount = () => {
    setCount(count + 1);
  };
  const goBackAndSetFoodData = () => {
    setFoodData({
      totalPrice, restaurantById, meals, foundMeals, count
    })
    navigation.goBack();
  };

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
          {count > 1 ? (
            <TouchableOpacity onPress={decrementCount}>
              <Text className="text-2xl text-black">-</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <Text className="text-2xl text-gray-500">-</Text>
            </View>
          )}
          <Text className="text-lg">{count}</Text>
          <TouchableOpacity onPress={incrementCount}>
            <Text className=" text-2xl">+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="w-56 items-center justify-center rounded-full bg-[#34bb78]"
          onPress={goBackAndSetFoodData}>
          <Text className=" text-white">add ${totalPrice?.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: 'bg-gray-200 flex flex-1',
};
export default ModalFood;
