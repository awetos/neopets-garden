//gets the search results based on certain options.
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./firebase-client";
import { GardenResult } from "@/types/garden-result";

type GetGardenResultsFilters = {
  filters?: {
    category?: "petpet";
    seedType?: "Maraquan Seed...";
  };
  pagination?: {
    pageSize?: number;
    page?: number;
  };
};
