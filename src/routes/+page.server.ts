import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  const [
    usersResponse,
    gamesResponse,
  ] = await Promise.all([
    supabase
      .from('users')
      .select('*')
      .order('rank', { ascending: false }),
    supabase
      .from('games')
      .select('user_id, count()'),
  ])

  const users = usersResponse.data
  const games = gamesResponse.data
  const usersError = usersResponse.error
  const gamesError = gamesResponse.error

  if (usersError) {
    console.error(`[admin/page.server/load(...)] Error: `, usersError)
  }
  if (gamesError) {
    console.error(`[admin/page.server/load(...)] Error: `, gamesError)
  }

  let totalNumberOfGamesPlayed = 0;
  // convert the games to a map and keep count of total number of games
  const gameCounts = games.reduce((acc, { user_id, count }) => {
    acc[user_id] = count
    totalNumberOfGamesPlayed += count
    return acc
  }, {} as Record<string, number>)

  return {
    users: users ?? [],
    gameCounts,
    totalNumberOfGamesPlayed
  }
}
