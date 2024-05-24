/* eslint-disable prettier/prettier */
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';

const PricingComponent = ({ totalPrice }) => {
  const fullyPrice = totalPrice;
  return (
    <>
      {/* discount */}
      <View className="mb-2 flex flex-row items-center justify-between">
        <View className="flex flex-row items-center">
          <Text className=" mr-1 text-sm">Discount</Text>
          <Ionicons name="information-circle-outline" size={24} color="black" />
        </View>
        <Text className=" text-sm">0.00 $</Text>
      </View>
      {/* subtotal */}
      <View className="mb-2 flex flex-row items-center justify-between">
        <View className="flex flex-row items-center">
          <Text className=" mr-1 text-sm font-bold">Subtotal</Text>
        </View>
        <Text className=" text-sm font-bold">0.00 $</Text>
      </View>
      {/* Small order fee */}
      <View className="mb-2 flex flex-row items-center justify-between">
        <View className="flex flex-row items-center">
          <Text className=" mr-1 text-sm ">Small order fee</Text>
          <Ionicons name="information-circle-outline" size={24} color="black" />
        </View>
        <Text className=" text-sm ">0.00 $</Text>
      </View>
      {/* Service fee */}
      <View className="mb-2 flex flex-row items-center justify-between">
        <View className="flex flex-row items-center">
          <Text className=" mr-1 text-sm ">Service fee</Text>
          <Ionicons name="information-circle-outline" size={24} color="black" />
        </View>
        <Text className=" text-sm ">0.00 $</Text>
      </View>
      {/* Delivery fee */}
      <View className="mb-2 flex flex-row items-center justify-between">
        <View className="flex flex-row items-center">
          <Text className=" mr-1 text-sm ">Delivery fee</Text>
        </View>
        <Text className=" text-sm ">0.00 $</Text>
      </View>
      {/* Delivery Discount */}
      <View className="mb-2 flex flex-row items-center justify-between">
        <View className="flex flex-row items-center">
          <Text className=" mr-1 text-sm ">Delivery Discount</Text>
        </View>
        <Text className=" text-sm ">0.00 $</Text>
      </View>
      {/* {separator} */}
      <View className=" my-4 border-[0.5px] border-slate-200" />
      {/* total */}
      <View className="mb-2 flex flex-row items-center justify-between">
        <View className="flex flex-row items-center">
          <Text className=" mr-1 text-sm font-bold">Total</Text>
        </View>
        <Text className=" text-sm font-bold">{fullyPrice} $</Text>
      </View>
    </>
  );
};

export default PricingComponent;
