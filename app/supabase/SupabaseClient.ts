import type {SupabaseClient} from "@supabase/supabase-js";
import {createClient} from "@supabase/supabase-js";
import type {Room} from "~/supabase/types/Room";

interface Database {
  public: {
    Tables: {
      pomoduo: {
        Row: Room;
        Insert: {}; // The data expected passed to an "insert" statement.
        Update: {}; // The data expected passed to an "update" statement.
      }
    }
  }
}

export const supabaseClient = ((): () => SupabaseClient<Database> => {
  let cachedClient: SupabaseClient<Database> | undefined;

  return () => {
    if (cachedClient) return cachedClient;

    cachedClient = createClient(
      "https://wdwiwhwjivnlyvwhxywe.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indkd2l3aHdqaXZubHl2d2h4eXdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE4NTUyNDgsImV4cCI6MTk5NzQzMTI0OH0.tTwpfV6xD3VYic3aXnSdVK8pqzSHfqy0-lwVPVtH42Y",
      {
        realtime: {
          params: {
            eventsPerSecond: 10
          }
        }
      }
    );
    return cachedClient;
  };
})();