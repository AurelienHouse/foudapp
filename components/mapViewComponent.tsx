/* eslint-disable prettier/prettier */
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapViewComponent = ({ latitude, longitude, streetName }) => {
  return (
    <>
      {/* Google places autocomplet */}
      <TouchableOpacity className={styles.header}>
        <View className={styles.adressContainer}>
          <MaterialCommunityIcons name="map-marker-outline" size={28} color="black" />
          <Text className={styles.adressText}>{streetName}</Text>
        </View>
        <Entypo name="chevron-thin-right" size={22} color="gray" />
      </TouchableOpacity>
      {/* MapView */}
      <View className=" mt-4 flex h-full w-full flex-1">
        <View className=" flex flex-1 overflow-hidden  rounded-lg">
          <MapView
            className=" h-52 w-full rounded-lg"
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}>
            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}>
              <View className=" flex h-8 w-8 items-center justify-center rounded-full bg-[#34bb78]">
                <View className=" h-3 w-3 rounded-full bg-white" />
              </View>
            </Marker>
          </MapView>
        </View>

        {/* map inputs */}
        <TextInput
          className=" mt-2 rounded-lg bg-gray-100 p-3"
          placeholder="Apt./office/floor/postal code"
          placeholderTextColor="gray"
        />
        <TextInput
          className=" mt-2 rounded-lg bg-gray-100 p-3"
          placeholder="Add a note for the courier"
          placeholderTextColor="gray"
        />
      </View>
    </>
  );
};
const styles = {
  header: 'flex-row justify-between',
  adressContainer: 'flex-row items-center',
  adressText: 'ml-2',
};

export default MapViewComponent;
