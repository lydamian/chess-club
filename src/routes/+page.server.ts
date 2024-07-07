import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  const { data: users } = await supabase.from('users').select('*').order('rank')
  return { users: users ?? [] }
}
