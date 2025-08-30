import { useEvents } from "@myapp/hooks/useEvents";
import { FlatList } from "react-native";
import EventItem from "./EventItem";
import { EventItem as EventItemType } from "types";
import Placeholder from "./Placeholder";

const EventsList = () => {
    const {
    events, nextPage, loading
    } = useEvents();
    
    return (
        <FlatList
            style={{ width: '90%' }}
            ListFooterComponent={loading ? <Placeholder /> : null}
            showsVerticalScrollIndicator={false}
            onEndReached={() => {
                if (nextPage) {
                    nextPage();
                }
            }}
            onEndReachedThreshold={0.9}
            data={events}
            renderItem={({ item, index }: { item: EventItemType; index: number; }) => <EventItem event={item} index={index}/>}
            keyExtractor={(item) => item.id}
        />
    );
}

export default EventsList;