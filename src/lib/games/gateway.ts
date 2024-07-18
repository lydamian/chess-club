
import type { Game } from "$src/lib/schemas/schema";
import { get_game_result_for_user } from '$src/lib/games/helpers';

const create_game = async (
  supabase: any,
  user_1_id: string,
  user_1_color: string,
  user_1_start_rank: number,
  user_1_end_rank: number,
  user_2_id: string,
  user_2_color: string,
  user_2_start_rank: number,
  user_2_end_rank: number,
  game_result: string,
): Promise<Game> => {
  const { data: [created_game], error } = await supabase
  .from('games')
  .insert({
    user_id: user_1_id,
    color: user_1_color,
    rank_start: user_1_start_rank,
    rank_end: user_1_end_rank,
    game_result: get_game_result_for_user(user_1_id, game_result),
    opponent_user_id: user_2_id,
    opponent_color: user_2_color,
    opponent_rank_start: user_2_start_rank,
    opponent_rank_end: user_2_end_rank,
    opponent_game_result: get_game_result_for_user(user_2_id, game_result),
  })
  .select()

  if (error) {
    throw error;
  }

  return created_game;
}

export {
  create_game
}