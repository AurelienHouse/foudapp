/* eslint-disable prettier/prettier */
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import BottomSheetComponent from '~/components/bottomSheetComponent';
import { useAppContext } from '~/context/appContext';

const OrderTracking = () => {
  const { coordinates } = useAppContext();

  const { latitude, longitude } = coordinates || {};

  return (
    <View className="flex flex-1">
      {/* MapView */}
      <MapView
        className="h-full w-full rounded-lg"
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        {/* Person */}
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}>
          <View className="flex h-8 w-8 items-center justify-center rounded-full bg-black">
            <Ionicons name="person" size={18} color="white" />
          </View>
        </Marker>

        {/* Store */}
        <Marker
          coordinate={{
            latitude: 54.7244728,
            longitude: 25.2754447,
          }}>
          <View className="flex h-8 w-8 items-center justify-center rounded-full bg-black">
            <FontAwesome5 name="store" size={14} color="white" />
          </View>
        </Marker>

        {/* Driver */}
        <Marker
          coordinate={{
            latitude: 54.7255593,
            longitude: 25.2775182,
          }}>
          <View className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500">
            <AntDesign name="car" size={18} color="white" />
          </View>
        </Marker>
      </MapView>

      {/* Bottom Sheet */}
      <BottomSheetComponent />
    </View>
  );
};

export default OrderTracking;
