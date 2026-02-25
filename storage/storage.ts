import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveFavorites = async (data: any) => {
  await AsyncStorage.setItem("favorites", JSON.stringify(data));
};

export const getFavorites = async () => {
  const data = await AsyncStorage.getItem("favorites");
  return data ? JSON.parse(data) : [];
};

export const saveCart = async (data: any) => {
  await AsyncStorage.setItem("cart", JSON.stringify(data));
};

export const getCart = async () => {
  const data = await AsyncStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};
