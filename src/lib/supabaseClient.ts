
import { createClient } from "@supabase/supabase-js";
import {PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY} from '$env/static/public'

const supabaseUrl = process.env.SUPABASE_URL || PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
        