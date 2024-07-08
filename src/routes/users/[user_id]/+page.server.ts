import type { PageServerLoad } from './$types'


// SELECT
// u.name : user_name,
// u.id as user_id,
// gp.rank_start,
// gp.rank_end,
// gp.color : color,
// opponent.id : opponent_user_id,
// opponent.name : opponent_name,
// opponent_gp.color : opponent_color,
// opponent_gp.rank_start : opponent_rank_start,
// opponent_gp.game_result as opponent_game_result,
// opponent_gp.rank_end as opponent_rank_end,
// games.created_at,
// gp.game_result as game_result
// FROM
// game_players : gp
// INNER JOIN users : u ON gp.user_id = u.id
// INNER JOIN games ON gp.game_id = games.id
// INNER JOIN game_players : opponent_gp ON games.id = opponent_gp.game_id
// INNER JOIN users : opponent ON opponent_gp.user_id = opponent.id
// WHERE
// gp.user_id = '575cb691-958a-4a28-889f-c094279960f6'
// AND gp.user_id <> opponent_gp.user_id
// ORDER BY
// games.created_at DESC

export const load: PageServerLoad = async ({
  params,
  locals: { supabase },
}) => {
  const user_id = params.user_id;

  console.log('[src/routes/users/[user_id]/+page.server.ts] params: ', params);
  // SELECT
  // u.name : user_name,
  // u.id as user_id,
  // gp.rank_start,
  // gp.rank_end,
  // gp.color : color,
  // gp.game_result as game_result
  // opponent.id : opponent_user_id,
  // opponent.name : opponent_name,
  // opponent_gp.color : opponent_color,
  // opponent_gp.rank_start : opponent_rank_start,
  // opponent_gp.game_result as opponent_game_result,
  // opponent_gp.rank_end as opponent_rank_end,
  // games.created_at,
  // FROM
  // game_players : gp
  // INNER JOIN users : u ON gp.user_id = u.id
  // INNER JOIN games ON gp.game_id = games.id
  // INNER JOIN game_players : opponent_gp ON games.id = opponent_gp.game_id
  // INNER JOIN users : opponent ON opponent_gp.user_id = opponent.id
  // WHERE
  // gp.user_id = '575cb691-958a-4a28-889f-c094279960f6'
  // AND gp.user_id <> opponent_gp.user_id
  // ORDER BY
  // games.created_at DESC
  const { data: games, error } = await supabase
    .from('game_players')
    .select(
      `
      rank_start,
      rank_end,
      color,
      game_result,
      ...users!inner(
        user_name:name,
        user_id:id,
        opponent_user_id:id,
        opponent_name:name
      ),
      ...games!inner(
        created_at,
        ...game_players!inner(
          opponent_color:color,
          opponent_rank_start:rank_start,
          opponent_game_result:game_result,
          opponent_rank_end:rank_end,
          ...users!inner()
        )
      )
      `,
    )
    .eq(
      'user_id',
      '575cb691-958a-4a28-889f-c094279960f6',
    )
    .order('games(created_at)', {
      ascending: false,
    })

  if (error) {
    console.error('Error: ', error);
  } else {
    console.log('Data: ', games);
  }

  return {
    games: games ?? []
  }
}
