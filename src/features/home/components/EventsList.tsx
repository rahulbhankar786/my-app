import { useEvents } from "@myapp/hooks/useEvents";
import { FlatList, Text } from "react-native";
import EventItem from "./EventItem";
import { EventItem as EventItemType } from "types";
import Placeholder from "./Placeholder";
import { useCallback } from "react";

const EventsList = () => {
    const {
    events, nextPage, loading
    } = useEvents();

    const renderItem = useCallback(({ item, index }: { item: EventItemType; index: number; }) => 
        <EventItem event={item} index={index}/>,
    [])
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
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
    );
}

export default EventsList;