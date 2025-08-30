import { create } from "zustand";
import axios from "axios";
import Config from "react-native-config";
import { pageSize } from "@myapp/utils/constants";


export const useEventsStore = create((set: any, get: any) => ({
  events: [],
  loading: false,
  error: null,
  page: 0,
  totalPages: 1,

  fetchEvents: async (params: any = {}) => {
    set({ loading: true, error: null });

    try {
      const { page } = get();
      const response = await axios.get(`${Config.BASE_URL}/events.json?apikey=${Config.API_KEY}`,{
        params: {
            size: pageSize,
            page,
            ...params
        }
      });

      const data = response.data._embedded?.events || [];
      const pageInfo = response.data.page || {};

      set({
        events: params.keyword ? data : page === 0 ? data : [...get().events, ...data], // append for infinite scroll
        totalPages: pageInfo.totalPages || 1,
      });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch events" });
    } finally {
      set({ loading: false });
    }
  },

  nextPage: () => {
    const { page, totalPages, fetchEvents } = get();
    if (page + 1 < totalPages) {
      set({ page: page + 1 });
      fetchEvents();
    }
  },

  resetEvents: () => set({ events: [], page: 0 }),

  addToFavorites: (index: number) => {
    const { events } = get();
    const updatedEvents = [
      ...events.slice(0, index),
      { ...events[index], isFavorite: true },
      ...events.slice(index + 1)
    ]
    set({ events: updatedEvents });
  },
  removeFavorites: (index: number) => {
    const { events } = get();
    const updatedEvents = [
      ...events.slice(0, index),
      { ...events[index], isFavorite: false },
      ...events.slice(index + 1)
    ]
    set({ events: updatedEvents });
  }
}));
