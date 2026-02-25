import { createClient } from "@supabase/supabase-js";

// REPLACE with your actual Supabase URL and Anon Key
const SUPABASE_URL = "https://rybwuquqsutqqhzqzqra.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_eKA2beRCnuku5LhXpmB58w_WPkI4RDh";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
