import AppRouter from "routes";
import { SearchProvider } from "context/SearchContext";

export default function App() {
  return (
    <SearchProvider>
      <AppRouter />
    </SearchProvider>
  );
}
