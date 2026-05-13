// src/services/OpinionService.ts
import { rtdb } from "@/lib/firebase";
import type { Opinion } from "@/types/opinion.types";
import { ref, push, set, get, child } from "firebase/database";

export const OpinionService = {
  // For the Form: Create a new entry
  async create(data: Omit<Opinion, "id" | "createdAt">) {
    const opinionsRef = ref(rtdb, "opinions");
    const newOpinionRef = push(opinionsRef);
    await set(newOpinionRef, {
      ...data,
      createdAt: Date.now(),
    });
  },

  // Initial fetch for the Canvas (Optional, see Realtime below)
  async getAll(): Promise<Opinion[]> {
    const dbRef = ref(rtdb);
    const snapshot = await get(child(dbRef, "opinions"));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
    }
    return [];
  },
};
