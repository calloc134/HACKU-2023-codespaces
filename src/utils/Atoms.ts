import { Session } from "@supabase/supabase-js";
import { atom } from "recoil";

export const sessionState = atom<Session | null>({
  key: "sessionState",
  default: null,
});

export const postsState = atom<any[]>({
  key: "posts",
  default: undefined,
});
