/* eslint-disable prettier/prettier */
import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};
export const AppProvider = ({ children }) => {
  const [streetName, setStreetName] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [restaurantById, setRestaurantById] = useState(null);
  const [meals, setMeals] = useState([]);
  const [foundMeals, setfoundMeals] = useState(null);
  const [count, setCount] = useState(1);

  const setStreet = (street) => {
    setStreetName(street);
  };
  const setFoodData = (data) => {
    setTotalPrice(data.totalPrice);
    setRestaurantById(data.restaurantById);
    setMeals(data.meals);
    setfoundMeals(data.foundMeals);
    setCount(data.count);
  };

  return (
    <AppContext.Provider
      value={{
        streetName,
        setStreet,
        totalPrice,
        setTotalPrice,
        restaurantById,
        setRestaurantById,
        meals,
        setMeals,
        foundMeals,
        setfoundMeals,
        count,
        setCount,
        setFoodData,
      }}>
      {children}
    </AppContext.Provider>
  );
};
