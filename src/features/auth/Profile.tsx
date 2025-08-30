import { storageKey } from '@myapp/utils/constants';
import { Text } from '@react-navigation/elements';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import localStorage from '@myapp/utils/localStorage';

const Profile = () => {
  const [user, setUser] = useState<{[key: string]: string}>({});

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await localStorage().getItem(storageKey.user);
      setUser(userData || {})
    };
    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user.name}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>City</Text>
        <Text style={styles.value}>{user.city}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 20,
  },
  card: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#718093",
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2f3640",
  },
});

export default Profile;
