import { Session } from "@supabase/supabase-js";
import { atom } from "recoil";

export const sessionState = atom<Session | null>({
  key: "sessionState",
  default: null,
});
