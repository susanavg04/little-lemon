
import debounce from "lodash.debounce";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchMenu, filterByQueryAndCategories } from "../Model/Database_SQLite";


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
  const sectionListData = Object.entries(dataByCategory).map(([key, item]) => {
    return {
      title: key,
      data: item,
    };
  });
  return sectionListData;
}

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
const sections = ["Appetizers", "Salads", "Beverages"];

export function useHomeViewModel() {
  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState("");
  const [query, setQuery] = useState("");
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
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

  // Actualizar al filtrar o buscar
  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
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

  // Debounced search
  const lookup = useCallback((q) => setQuery(q), []);
  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = (index) => {
    const updated = [...filterSelections];
    updated[index] = !updated[index];
    setFilterSelections(updated);
  };

  return {
    data,
    sections,
    searchBarText,
    handleSearchChange,
    filterSelections,
    handleFiltersChange,
  };
}
