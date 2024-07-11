import { supabase } from "$src/lib/supabaseClient";
import type { User } from "$src/lib/schemas/schema";

const get_user = async (user_id: string): Promise<User> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user_id)
    .limit(1)
    .single()

  if (error) {
    throw error;
  }

  return data;
}

const update_user = async ({
  user_id,
  rank,
}: {
  user_id: string,
  rank: number;
}): Promise<User> => {
  const { data: [updated_user], error } = await supabase
    .from('users')
    .update({ rank })
    .eq('id', user_id)
    .select()

  if (error) {
    throw error;
  }

  return updated_user;
}

export {
  get_user,
  update_user
}