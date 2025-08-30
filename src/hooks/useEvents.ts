import { useEffect } from "react";
import { useEventsStore } from "@myapp/hooks/useEventStore";

export const useEvents = (filters = {}) => {
  const { events, loading, error, fetchEvents, nextPage, resetEvents } =
    useEventsStore();

  useEffect(() => {
    resetEvents();
    fetchEvents(filters);
  }, [JSON.stringify(filters)]); // re-fetch when filters change

  return { events, loading, error, nextPage, fetchEvents, resetEvents };
};
