import { createClient, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const supabase = createClient(
  "https://rphpgdwfvgbqodprwhbo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwaHBnZHdmdmdicW9kcHJ3aGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE4NDU4NTEsImV4cCI6MjAwNzQyMTg1MX0.Rni5vkoj06n16aobQ3uuz-Id2A09a4GEPCx6EkzZLgs",
);

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
    };

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return;
  });

  return session;
};
