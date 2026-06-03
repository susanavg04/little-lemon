
import debounce from "lodash.debounce";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchMenu, filterByQueryAndCategories } from "../Model/Database_SQLite";

// Convert the array (data) into an object (dataByCategory) using the reduce function
export function getSectionListData(data) {
  const dataByCategory = data.reduce((acc, curr) => {
    const menuItem = {
      id: curr.id,
      title: curr.title,
      price: curr.price,
    };
    if (!Array.isArray(acc[curr.category])) {
      acc[curr.category] = [menuItem];
    } else {
      acc[curr.category].push(menuItem);
    }
    return acc;
  }, {});

  // Convert the object (dataByCategory) back into an array (sectionListData) using Object.entries and map
  const sectionListData = Object.entries(dataByCategory).map(([key, item]) => {
    return {
      title: key,
      data: item,
    };
  });
 return sectionListData;
}

// Custom hook to run an effect only on updates, not on the initial mount
export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
};
const MENU_SECTIONS = ["Appetizers", "Salads", "Beverages"];

export function useHomeViewModel() {
  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState("");
  const [query, setQuery] = useState("");
  const [filterSelections, setFilterSelections] = useState(
    MENU_SECTIONS.map(() => false)
  );

  // Cargar menú inicial
  useEffect(() => {
    (async () => {
      try {
        const menuItems = await fetchMenu();
        setData(getSectionListData(menuItems));
      } catch (e) {
        console.error(e.message);
      }
    })();
  }, []);

  // changes the menu display depending on the buttons in the menu sections or the search entered in the search bar 
  useUpdateEffect(() => {
    (async () => {
      const activeCategories = MENU_SECTIONS.filter((s, i) => {
        if (filterSelections.every((f) => f === false)) return true;
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(query, activeCategories);
        setData(getSectionListData(menuItems));
      } catch (e) {
        console.error(e.message);
      }
    })();
  }, [filterSelections, query]);

  // Debounce the lookup function to prevent excessive calls while typing in the search bar
  const lookup = useCallback((q) => setQuery(q), []);
  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);
  
  //Wait a moment before doing anything.
  useEffect(() => {
  return () => debouncedLookup.cancel();
  }, [debouncedLookup]);
  // Handle changes in the search bar text, update the state and trigger the debounced lookup
  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };
  // Handle changes in the filter selections, toggle the selection state for the given index
  const handleFiltersChange = (index) => {
    const updated = [...filterSelections];
    updated[index] = !updated[index];
    setFilterSelections(updated);
  };

  return {
    data,
    sections: MENU_SECTIONS,
    searchBarText,
    handleSearchChange,
    filterSelections,
    handleFiltersChange,
  };
}
