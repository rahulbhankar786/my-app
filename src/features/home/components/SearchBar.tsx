import React, { useMemo, useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { SCREEN_HEIGHT } from "@myapp/utils/utils";
import { useEventsStore } from "@myapp/hooks/useEventStore";
import debounce from "@myapp/utils/debounce";


const SearchBar = () => {
  const [search, setSearch] = useState("");
  const fetchEvents = useEventsStore((state: any) => state.fetchEvents);

    const debouncedSearch = useMemo(
    () =>
      debounce((search: string) => {
        fetchEvents({ keyword: search });
      }, 500),
    []
  );
    
  return (<TextInput
        style={styles.input}
        placeholder="Search here..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={(value: string) => {
          setSearch(value);
          debouncedSearch(value);
        }}
        autoCorrect={false}
      />)
}

export default SearchBar;


const styles = StyleSheet.create({
  input: {
    margin: SCREEN_HEIGHT * 0.01,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 16,
    padding: 10,
    width: "90%",
  },
  result: {
    marginTop: 10,
    fontSize: 16,
    color: "blue",
  },
});