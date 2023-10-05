import * as SecureStore from 'expo-secure-store';

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string) {
  return await SecureStore.getItemAsync(key);
}

export { save, getValueFor }