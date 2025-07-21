import { useState } from "react";
import AppRouter from "routes";
import { SearchContext } from "context/SearchContext";

export default function App() {
  const [search, setSearch] = useState("");

  return (
    <SearchContext value={{ search: search, setSearch: setSearch }}>
      <AppRouter />
    </SearchContext>
  );
}
