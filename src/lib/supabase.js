import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rclyijcgnlfmpmbybxfa.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjbHlpamNnbmxmbXBtYnlieGZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4Mjg5NTgsImV4cCI6MjA5MzQwNDk1OH0.jqLkCo4I7awXQaSlcUOmP-hhqLjPIG22Zi9J5GJWAD0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);