//To save on reading 20+ reads from firebase per query, if the last search was within 20 minutes and the search query was the exact same, we just provide the saved context.
//do not save to local storage because that would be mean (using up so much of their browser storage.)

"use client";
import { GardenResult } from "@/types/garden-result";
import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { GetFromFirebase } from "@/firebase/search/filter-searched";
import { QueryDocumentSnapshot } from "firebase/firestore";

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
  hasPrev: true | false;
  hasNext: true | false;
  lastDoc: QueryDocumentSnapshot | undefined;
  goNext: () => void;
  goPrev: () => void;
  currentPageIndex: number;
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

  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot>();

  const [isLoading, setIsLoading] = useState(true);
  const [hasPrev, setHasPrev] = useState(true);
  const [hasNext, setHasNext] = useState(true);

  //used to navigate previous pages
  const [pageCursors, setPageCursors] = useState<
    (QueryDocumentSnapshot | undefined)[]
  >([undefined]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  //called upon loading the page by Filter, who reads from URL.
  const updateCurrentSearchQuery = async (newSearchQuery: SearchQuery) => {
    setIsLoading(true);

    setLastQuery(newSearchQuery);
    setCurrentPageIndex(0);
    setPageCursors([]);

    const searchResults = await GetFromFirebase(newSearchQuery);
    setCurrentCache(searchResults.results ?? []);

    setHasNext(searchResults.hasNextPage);
    setHasPrev(false);
    if (searchResults.lastDoc) {
      setLastDoc(searchResults.lastDoc);
    } else {
      setLastDoc(undefined);
    }

    setSearchCacheMessage(printQuery(newSearchQuery));
    setIsLoading(false);
  };

  // OPTIONAL/TO-DO (but might not be necessary for now):
  // Previous results are stored in the browser cache in case in the future reads are costly, for now this is not implemented.
  // In case users run a read they've already run before within 20 minutes, they can fetch from their cache instead
  // It would need to include a record of <GardenResults>[] ordered by SearchQuery
  const runSearch = async (newQuery: SearchQuery) => {
    if (newQuery == lastQuery) {
      console.log("You have previously run this query", newQuery);
    } else {
      console.log("The queries are not the same", newQuery);
      setLastQuery(newQuery);
      setHasNext(false);
      setHasPrev(false);
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
    console.log(
      "search cache has run a search, the new search params are",
      newSearchParams.toString(),
    );
    const newUrl = `/database?${newSearchParams.toString()}`;

    router.push(newUrl);
  };

  //view the next results and previous results
  const goNext = async () => {
    if (!lastQuery || !lastDoc || !hasNext) return;

    const nextPageIndex = currentPageIndex + 1;
    const nextCursor = lastDoc;

    setIsLoading(true);

    const searchResults = await GetFromFirebase(lastQuery, {
      lastDoc: nextCursor,
    });

    setCurrentCache(searchResults.results);
    setHasNext(searchResults.hasNextPage);
    setLastDoc(searchResults.lastDoc ?? undefined);

    const newCursors = [...pageCursors];
    newCursors.push(nextCursor);
    setPageCursors(newCursors);

    setCurrentPageIndex(nextPageIndex);
    setHasPrev(true);

    setIsLoading(false);
  };

  const goPrev = async () => {
    if (!lastQuery || currentPageIndex === 0) return;

    const prevPageIndex = currentPageIndex - 1;
    const prevCursor = pageCursors[prevPageIndex];

    setIsLoading(true);

    const searchResults = prevCursor
      ? await GetFromFirebase(lastQuery, { lastDoc: prevCursor })
      : await GetFromFirebase(lastQuery);

    setCurrentCache(searchResults.results);
    setHasNext(searchResults.hasNextPage);
    setLastDoc(searchResults.lastDoc ?? undefined);

    setCurrentPageIndex(prevPageIndex);
    setHasPrev(prevPageIndex > 0);

    setIsLoading(false);
  };

  return (
    <SearchCacheContext.Provider
      value={{
        lastDoc,
        currentPageIndex,
        lastQuery,
        hasNext,
        hasPrev,
        isLoading,
        currentCache,
        searchCacheMessage,
        updateCurrentSearchQuery,
        runSearch,
        goNext,
        goPrev,
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

export const printQuery = (query: SearchQuery | null): string => {
  if (!query) {
    return "";
  }
  let message: string = "Searching for ";
  if (query.seeds) {
    query.seeds.forEach((seed) => {
      message += seed + "s ";
    });
  }
  if (query.category) {
    message += "in category " + query.category;
  }
  if (query.item) {
    message += "with item name " + query.item;
  }
  return message;
};
