import { useRoute } from "@react-navigation/native";
import React from "react";
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Linking 
} from "react-native";

const EventDetailsScreen = () => {
  const route = useRoute();

  const { event } = route.params as { event: any };
  if (!event) return null;

  const mainImage = event.images?.find(img => img.ratio === "16_9")?.url;

  return (
    <ScrollView style={styles.container}>
      {mainImage && (
        <Image source={{ uri: mainImage }} style={styles.banner} />
      )}
      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.date}>
        {event.dates?.start?.localDate} • {event.dates?.start?.localTime}
      </Text>
      <Text style={styles.venue}>
        📍 {event._embedded?.venues?.[0]?.name},{" "}
        {event._embedded?.venues?.[0]?.city?.name}
      </Text>
      {event.info && (
        <Text style={styles.info}>{event.info}</Text>
      )}
      {event.pleaseNote && (
        <Text style={styles.note}>⚠️ {event.pleaseNote}</Text>
      )}
      {event.ticketLimit?.info && (
        <Text style={styles.limit}>🎟 {event.ticketLimit.info}</Text>
      )}
      {event.seatmap?.staticUrl && (
        <Image
          source={{ uri: event.seatmap.staticUrl }}
          style={styles.seatmap}
          resizeMode="contain"
        />
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL(event.url)}
      >
        <Text style={styles.buttonText}>Buy Tickets</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16
  },
  banner: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8
  },
  date: {
    fontSize: 16,
    color: "#444",
    marginBottom: 4
  },
  venue: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12
  },
  info: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
    color: "#333"
  },
  note: {
    fontSize: 14,
    color: "#b22222",
    marginBottom: 10
  },
  limit: {
    fontSize: 14,
    color: "#444",
    marginBottom: 16
  },
  seatmap: {
    width: "100%",
    height: 200,
    marginBottom: 20
  },
  button: {
    backgroundColor: "#1e90ff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default EventDetailsScreen;
