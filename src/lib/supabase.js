import { createClient } from "@supabase/supabase-js";

// TODO: Replace with actual Supabase project URL and anon key
const supabaseUrl = "https://your-project-id.supabase.co";
const supabaseAnonKey = "your-anon-key-here";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Example query helpers (not yet wired to real data)
export const fetchTrials = async () => {
  // const { data, error } = await supabase.from("trials").select("*");
  // if (error) throw error;
  // return data;
  throw new Error("Supabase not yet configured");
};

export const fetchCharacters = async () => {
  // const { data, error } = await supabase.from("characters").select("*");
  // if (error) throw error;
  // return data;
  throw new Error("Supabase not yet configured");
};
