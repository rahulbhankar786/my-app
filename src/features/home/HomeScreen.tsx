
import { useEvents } from '@myapp/hooks/useEvents';
import { StyleSheet, View, Text } from 'react-native';
import { useMemo } from 'react';
import EventsList from './components/EventsList';
import SearchBar from './components/SearchBar';

 const  HomeScreen = () => {
  const {
     error
  } = useEvents();

   const errorMessage = useMemo(() => typeof error === 'object' && error !== null && 'message' in error
      ? (error as { message: string }).message
      : String(error)
    , [error]);

  return (
    <View style={styles.container}>
      <SearchBar />
      {!errorMessage && <Text>Error: {errorMessage}</Text>}
      <EventsList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});

export default HomeScreen;
