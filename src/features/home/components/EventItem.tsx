import React, { useCallback } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from "react-native";
import moment from "moment";
import { EventItem as EventItemTypes } from "types";
import { useEventsStore } from "@myapp/hooks/useEventStore";
import { useNavigation } from "@react-navigation/native";

interface EventItemProps {
  event: EventItemTypes;
  index: number;
}

const EventItem: React.FC<EventItemProps> = ({ event, index }) => {
    const handleAddToFavorites = useEventsStore((store: any) => store.addToFavorites);
    const handleRemoveFavorites = useEventsStore((store: any) => store.removeFavorites);
    const navigation = useNavigation();
  const image =
    event.images?.find((img: any) => img.ratio === "16_9" && img.width > 500)?.url ||
    event.images?.[0]?.url;

  const venue = event._embedded?.venues?.[0];
  const date = moment(event.dates.start.dateTime).format("ddd, MMM Do YYYY • h:mm A");

  const handleFavirote = useCallback(() => {
    if(!!event.isFavorite) {
        handleRemoveFavorites(index);
    } else {
        handleAddToFavorites(index);
    }
  }, [event, index]);

  return (
    <TouchableOpacity style={styles.card} key={event.id}
      activeOpacity={0.6}
      onPress={() => {
        navigation.navigate('DetailsScreen', { event } as never);
      }}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {event.name}
        </Text>
        <Text style={styles.date}>{date}</Text>
        {venue && (
          <Text style={styles.venue}>
            {venue.name}, {venue.city?.name}
          </Text>
        )}
        <TouchableOpacity
          style={[styles.button,{
            backgroundColor: !!event.isFavorite ? '#aed2f4ff' : '#4CAF50',
          }]}
          onPress={handleFavirote}
        >
          <Text style={[styles.buttonText, {
            color: !!event.isFavorite ? '#555' : '#fff',
          }]}>{!!event.isFavorite ? 'Remove from Favirote' : 'Add to Favirote'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },
  date: {
    marginTop: 4,
    fontSize: 14,
    color: "#666",
  },
  venue: {
    marginTop: 2,
    fontSize: 14,
    color: "#888",
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default EventItem;
