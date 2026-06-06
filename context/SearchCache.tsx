//To save on reading 20+ reads from firebase per query, if the last search was within 20 minutes and the search query was the exact same, we just provide the saved context.
//do not save to local storage because that would be mean (using up so much of their browser storage.)

"use client";
import { GardenResult } from "@/types/garden-result";
import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { GetFromFirebase } from "@/firebase/search/filter-searched";

export type SearchQuery = {
  seeds?: string[];
  category?: string;
  item?: string;
};

type SearchContextType = {
  lastQuery: SearchQuery | null;
  currentCache: GardenResult[];
  searchCacheMessage: string;
  isLoading: true | false;
  updateCurrentSearchQuery: (newSearchQuery: SearchQuery) => void;
  runSearch: (newQuery: SearchQuery) => Promise<any>;
};

//by allowing SearchCache Context to show up as null, we can get a warning if we are trying to access search context type outside of the provider.
const SearchCacheContext = createContext<SearchContextType | null>(null);

//define everything you promised would be in SearchContextType when mounting SearchCacheContextProvider
export const SearchCacheContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [lastQuery, setLastQuery] = useState<SearchQuery | null>(null);
  const [currentCache, setCurrentCache] = useState<GardenResult[]>([]);
  const [searchCacheMessage, setSearchCacheMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  //called upon loading the page by Filter.
  const updateCurrentSearchQuery = async (newSearchQuery: SearchQuery) => {
    console.log("updating query...", newSearchQuery);
    setIsLoading(true);

    setLastQuery(newSearchQuery);
    const searchResults = await GetFromFirebase(newSearchQuery);
    console.log("Search results:", searchResults);

    setCurrentCache(searchResults ?? []);
    setIsLoading(false);
  };

  // TO-DO (but might be redundant, idgaf atp):
  // 1. check if cached query matches lastQuery
  // 2. if fresh, i.e within 20 minutes, use currentCache
  // 3. otherwise fetch from Firebase eg.  const data = await getLatestSubmissions();
  const runSearch = async (newQuery: SearchQuery) => {
    if (newQuery == lastQuery) {
      console.log("You have previously run this query", newQuery);
    } else {
      console.log("The queries are not the same", newQuery);
      setLastQuery(newQuery);
    }
    const newSearchParams = new URLSearchParams();
    //for each seed in lastQuery.seed, add them to newSearchParams.set "seed"
    if (newQuery?.seeds) {
      newQuery.seeds.forEach((seed) => {
        newSearchParams.append("seed", seed);
      });
    }
    if (newQuery?.category) {
      newSearchParams.set("category", newQuery?.category);
    }
    if (newQuery?.item) {
      newSearchParams.set("item", newQuery?.item);
    }
    //redirect
    console.log("search cache has run a search");
    const newUrl = `/database?${newSearchParams.toString()}`;

    router.push(newUrl);
  };

  return (
    <SearchCacheContext.Provider
      value={{
        lastQuery,
        isLoading,
        currentCache,
        searchCacheMessage,
        updateCurrentSearchQuery,
        runSearch,
      }}
    >
      {children}
    </SearchCacheContext.Provider>
  );
};
export const useSearchContext = () => {
  const context = useContext(SearchCacheContext);

  if (!context) {
    throw new Error(
      "useSearchContext must be used inside SearchCacheContextProvider",
    );
  }

  return context;
};
