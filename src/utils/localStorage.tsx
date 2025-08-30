import AsyncStorage from "@react-native-async-storage/async-storage";

const localStorage = () => {
    const addItem = async (key: string, ...params: string[]) => {
      if(params.length === 1) {
         await AsyncStorage.setItem(key, params[0]);
         return;
      } 
      await AsyncStorage.setItem(key, JSON.stringify({
         name: params[0],
         email: params[1],
         password: params[2],
         city: params[3],
      }));
    }
    const getItem = async (key: string) => {
       const keyData = await AsyncStorage.getItem(key);
       if (keyData) {
          return JSON.parse(keyData);
       }
       return null;
    }
    return { addItem, getItem };
}

export default localStorage;