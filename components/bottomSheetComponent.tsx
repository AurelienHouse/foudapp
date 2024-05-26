/* eslint-disable prettier/prettier */
import { AntDesign } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text } from 'react-native';

import { useAppContext } from '~/context/appContext';

const trackData = [
  {
    id: '0',
    text: 'has delayed your order by 15 min',
  },
  {
    id: '1',
    text: 'Courier has been assigned',
  },
  {
    id: '2',
    text: 'Preparing your order',
  },
  {
    id: '3',
    text: 'Courier is on its way',
  },
  {
    id: '4',
    text: 'Courier is delivering your order',
  },
];

const BottomSheetComponent = () => {
  const { totalPrice, foundMeals, count } = useAppContext();
  const snapPoints = useMemo(() => ['20%', '100%'], []);
  const [progress, setProgress] = useState(0); //Progress of the bar
  const stepInterval = 3 * 60 * 1000; // 3 min in miliseconds

  const fixedDeliveryTime = useMemo(() => {
    const baseTime = new Date(); // Current time
    return baseTime;
  }, []);

  const stepTimes = useMemo(() => {
    const times = [];
    let time = new Date(fixedDeliveryTime);
    for (let i = 0; i < trackData.length; i++) {
      times.push(new Date(time));
      time.setMilliseconds(time.getMilliseconds() + stepInterval);
    }

    return times;
  }, [fixedDeliveryTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 4) {
          return prevProgress + 1;
        } else {
          clearInterval(interval);
          return 4;
        }
      });
    }, stepInterval);

    return () => clearInterval(interval);
  });

  return (
    <>
      <BottomSheet index={0} snapPoints={snapPoints}>
        <View className="mt-2 flex flex-1 px-6">
          {/* 1 row Time */}
          <View className="flex flex-row items-center justify-between">
            <Text className="text-5xl text-black">
              {new Date(fixedDeliveryTime.getTime() + 15 * 60000).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </Text>

            <View className="flex items-end">
              <Text className="text-base text-gray-500">Estimated time of</Text>
              <Text className="text-base text-gray-500">delivery</Text>
            </View>
          </View>

          {/* Text */}
          <Text className="mb-4 mt-6 text-xl font-bold text-black">Order progress</Text>

          {/* Progress bar */}
          <View className="flex h-[280px] flex-row justify-start">
            {/* Progress times */}
            <View>
              {trackData.map((track, index) => (
                <Text
                  key={track.id}
                  className={`mr-4 text-base text-gray-500 ${
                    index > 0 && index <= progress ? 'mt-10' : ''
                  } ${index <= progress ? 'text-gray-500' : 'hidden'}`}>
                  {index <= progress
                    ? stepTimes[index].toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                      })
                    : null}
                </Text>
              ))}
            </View>

            {/* Progress line */}
            <View className="relative flex flex-col items-center justify-between">
              <View className="absolute h-[280px] border border-[#34BB78]" />
              {trackData.map((track, index) => (
                <View
                  key={track.id}
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: index <= progress ? '#34BB78' : 'white',
                    borderWidth: index <= progress ? 0 : 2,
                    borderColor: index <= progress ? '' : '#34BB78',
                    borderRadius: 999,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {index <= progress ? (
                    <AntDesign
                      name="check"
                      size={16}
                      color="white"
                      style={{ marginTop: 4, alignItems: 'center', alignSelf: 'center' }}
                    />
                  ) : (
                    <View className="h-3 w-3 items-center justify-center rounded-full bg-[#34BB78]">
                      <View className="h-2 w-2 rounded-full bg-green-100" />
                    </View>
                  )}
                </View>
              ))}
            </View>

            {/* Progress Text */}
            <View className="flex flex-col">
              {trackData.map((track, index) => (
                <Text
                  key={track.id}
                  className={`ml-6 text-base text-gray-500 ${index > 0 ? 'mt-10' : ''}`}>
                  {track.text}
                </Text>
              ))}
            </View>
          </View>

          {/* Order number */}
          <Text className="mb-4 mt-16 text-xl font-bold text-black">Order #P54NK</Text>

          {/* Order */}
          <View>
            <View className="flex flex-row items-center justify-between">
              <Text className="text-base text-gray-800">
                {count} * {foundMeals.name}
              </Text>
              <Text className="text-base text-gray-800">{totalPrice} $</Text>
            </View>
          </View>
        </View>
      </BottomSheet>
    </>
  );
};

export default BottomSheetComponent;
