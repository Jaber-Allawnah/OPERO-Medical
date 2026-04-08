import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

//AsyncStorage
export const saveToStorage = async (key: string, value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = async (key: string) => {
    const data =await AsyncStorage.getItem(key);
    return data?JSON.parse(data) : null;
};

export const removeFromStorage = async (key: string) => {
    await AsyncStorage.removeItem(key);
};
//SecureStorage
export const saveSecure = async (key: string, value: string) => {
    await SecureStore.setItemAsync(key,value);
};

export const getSecure = async (key: string) => {
    const data=await SecureStore.getItemAsync(key)
    return data?data : null;
};

export const removeSecure = async (key: string) => {
    await SecureStore.deleteItemAsync(key);
};
