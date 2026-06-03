//To save on reading 20+ reads from firebase per query, if the last search was within 20 minutes and the search query was the exact same, we just provide the saved context.
//do not save to local storage because that would be mean (using up so much of their browser storage.)
import { GardenResult } from "@/types/garden-result";
import { createContext, useContext, useEffect, useState } from "react";
import { categories } from "@/types/garden-result";
import { Timestamp } from "firebase/firestore";
type SearchQuery = {
  seeds?: string[];
  category?: string;
  item?: string;
};

type SearchContextType = {
  latestSearch: SearchQuery | null;
  currentCache: GardenResult[];
  testString: string;
};

const SearchCacheContext = createContext<SearchContextType | null>(null);

//define everything you promised would be in SearchContextType when mounting SearchCacheContextProvider
export const SearchCacheContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const latestSearch = null;
  const testGardenResult: GardenResult = {
    id: "12345",
    item: "test item",
    createdAt: Timestamp.fromDate(new Date()),
    seed: "Maraquan Seed",
    category: categories[0],
    fragment: "false",
    modifiers: ["", "", ""],
    fragmentCharm: "true",
  };
  const currentCache: GardenResult[] = [testGardenResult];

  return (
    <SearchCacheContext.Provider
      value={{
        latestSearch,
        currentCache,
        testString: "hello from search context!",
      }}
    >
      {children}
    </SearchCacheContext.Provider>
  );
};
export const useSearchContext = () => useContext(SearchCacheContext);
