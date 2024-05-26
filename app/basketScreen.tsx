/* eslint-disable prettier/prettier */
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useNavigation } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, FlatList, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import DeliveryOptions from '~/components/deliveryOptions';
import MapViewComponent from '~/components/mapViewComponent';
import PricingComponent from '~/components/pricingComponent';
import SwipeButtonComponent from '~/components/swipeButtonComponent';
import { useAppContext } from '~/context/appContext';

const sauceData = [
  {
    id: '1',
    imageUri:
      'https://images.bolt.eu/store/2023/2023-01-18/ceb12673-e2cb-4f24-a65d-ba900aeac3b1.jpeg',
    title: 'Garlic sauce',
    price: 0.5,
  },
  {
    id: '2',
    imageUri:
      'https://images.bolt.eu/store/2023/2023-01-18/60b40de0-f5a3-41d7-ad5c-91208b9f0ff4.jpeg',
    title: 'Barbeque sauce',
    price: 0.5,
  },
  {
    id: '3',
    imageUri:
      'https://images.bolt.eu/store/2023/2023-01-18/241c707d-d9cc-4b95-8941-47b9743b5f44.jpeg',
    title: 'Pitta sauce',
    price: 0.5,
  },
];

const renderItem = ({ item }) => (
  <View>
    <View>
      <Image
        source={{ uri: item.imageUri }}
        className=" mr-2 h-32 w-32 rounded-lg"
        resizeMode="contain"
      />
      <AntDesign
        name="pluscircle"
        size={34}
        color="white"
        style={{ position: 'absolute', right: 14, bottom: 6 }}
      />
    </View>
    <View>
      <Text className=" text-sm text-gray-700">{item.price} $</Text>
      <Text className=" text-sm text-gray-700">{item.title}</Text>
    </View>
  </View>
);

const BasketScreen = () => {
  const {
    restaurantById,
    count,
    setCount,
    totalPrice,
    setTotalPrice,
    foundMeals,
    streetName,
    coordinates,
  } = useAppContext();
  const [isChecked, setChecked] = useState(false);
  const navigation = useNavigation();
  const { latitude, longitude } = coordinates || {};

  useLayoutEffect(() => {
    if (restaurantById && restaurantById.name) {
      navigation.setOptions({
        headerTitle: restaurantById.name,
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={handleTrashPress}>
            <Ionicons name="trash-outline" size={24} color="black" />
          </TouchableOpacity>
        ),
      });
    }
  }, [restaurantById]);

  const handleTrashPress = () => {
    setCount(0);
    setTotalPrice(0);
    navigation.goBack();
  };
  // Items count
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <ScrollView className=" flex flex-1 bg-[#ecedef]">
      <View className=" flex rounded-b-2xl bg-white px-4 py-6">
        {/* {Item} */}
        <View className=" flex flex-row items-center justify-between">
          <View className="flex flex-row">
            <Image
              source={{ uri: foundMeals.img }}
              className=" mr-2 h-14 w-14"
              resizeMode="contain"
            />
            <View>
              <Text className=" text-lg text-gray-800">{foundMeals.name}</Text>
              <Text className=" text-base font-bold">{totalPrice} $</Text>
            </View>
          </View>

          <View className="flex h-10 w-24 flex-row items-center justify-evenly rounded-full border">
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
        </View>
        {/* {separator} */}
        <View className=" my-4 border-[0.5px] border-slate-200" />
        {/* {Add More} */}
        <View className="flex flex-row items-center ">
          <AntDesign name="pluscircle" size={24} color="#34bb78" />
          <Text className="ml-4 text-base font-semibold text-[#34bb78]">Add More</Text>
        </View>
        {/* {separator} */}
        <View className=" my-4 border-[0.5px] border-slate-200" />
        {/* {Leave Comment} */}
        <View>
          <TextInput
            multiline
            placeholder={'Need cutlery ? Napkins ? Other ? \nLeave a comment...'}
          />
        </View>
        {/* {separator} */}
        <View className=" my-4 border-[0.5px] border-slate-200" />
        {/* { People also added} */}
        <View>
          <Text className=" mb-4 text-lg font-bold">People also added</Text>
          <FlatList
            data={sauceData}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      {/* {delivery or pick up} */}
      <View className="mt-2 flex rounded-2xl bg-white px-4 py-6">
        <DeliveryOptions restaurantById={restaurantById} />
      </View>

      {/* {pricing Component} */}
      <View className="mt-2 flex rounded-2xl bg-white px-4 py-6">
        <PricingComponent totalPrice={totalPrice} />
      </View>
      {/* map view */}
      <View className="mt-2 flex flex-1 rounded-2xl bg-white px-4 py-6">
        <MapViewComponent streetName={streetName} latitude={latitude} longitude={longitude} />
      </View>

      {/* place order */}
      <View className="mt-2 flex flex-1 rounded-2xl bg-white py-6">
        {/* Total */}
        <View className=" mb-4 flex flex-row items-center justify-between px-4">
          <View className=" flex flex-row items-center">
            <Text className=" mr-1 text-lg font-bold">Total</Text>
          </View>
          <Text className=" text-lg font-bold">{totalPrice} $</Text>
        </View>
        {/* Cash Row */}
        <View className=" mb-2 mt-2 flex flex-row items-center justify-between px-4">
          <View className=" flex flex-row items-center">
            <FontAwesome5 name="money-bill-wave-alt" size={24} color="#34BB78" />
            <View className=" ml-2 flex flex-col">
              <Text className=" text-base ">Cash</Text>
              <Text className=" text-base text-[#34BB78]">Change</Text>
            </View>
          </View>
          <Text className=" text-base">{totalPrice} $</Text>
        </View>
        {/* Cash Warning */}
        <View className=" mb-2 mt-2 flex flex-row items-center px-4">
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? '#34BB78' : undefined}
          />
          <Text className=" ml-2 text-base">
            <Text>Cash order</Text>
            <FontAwesome5 name="exclamation-triangle" size={18} color="#fcb001" />
            <Text>I accept that courier may not have change</Text>
            <FontAwesome5 name="exclamation-triangle" size={18} color="#fcb001" />
          </Text>
        </View>
        {/* {separator} */}
        <View className=" my-4 border-[0.5px] border-slate-200" />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SwipeButtonComponent />
        </GestureHandlerRootView>
      </View>
    </ScrollView>
  );
};

export default BasketScreen;
