import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({
  params,
  locals: { supabase },
}) => {
  const { data: games, error } = await supabase
    .from('games')
    .select(
      `
      *,
      users!games_user_id_fkey!inner(name),
      opponent_users:users!games_opponent_user_id_fkey!inner(name)
      `,
    )
    .eq(
      'user_id',
      params.user_id,
    )
    .order('created_at', {
      ascending: false,
    })

    if (error) {
      console.error('Error: ', error);
    }

    // Get the user's rank
    const { data: [user], error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', params.user_id);

    if (userError) {
      console.error('Error: ', userError);
    } else {
      console.log('User: ', user);
    }

    // Calculate the number of games won, lost, and drawn
    let gamesWon = 0;
    let gamesLost = 0;
    let gamesDrawn = 0;

    games.forEach(game => {
      switch (game.game_result) {
        case 'win':
          gamesWon++;
          break;
        case 'loss':
          gamesLost++;
          break;
        case 'draw':
          gamesDrawn++;
          break;
      }
    });

    return {
      games: games ?? [],
      stats: {
        user,
        gamesWon,
        gamesLost,
        gamesDrawn,
      },
    }
  }
