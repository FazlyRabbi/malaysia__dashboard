import { create } from "zustand";
import { fetchReadme } from "@varandas/fetch-readme";
import "text-encoding";

import axios from "axios";

const useStore = create((set) => ({
 
  clients: [],
  contacts: [],
  loading: false,
  error: null,
  category: null,
  latest18: null,

  setClients: async (data) => {
    set({ clients: data });
  },
  
  setContacts: async (data) => {
    set({ contacts: data });
  },


}));

export default useStore;

