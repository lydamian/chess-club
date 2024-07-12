import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';
import { ColorSchena, RankSchema, UserSchema } from '$lib/schemas/schema';
import { get_user, update_user } from '$lib/users/gateway';
import { create_game } from '$lib/games/gateway';
import { update } from "$src/lib/elo";
import {
	StatusCodes,
} from 'http-status-codes';

import {
	convert_game_result_to_number,
	get_game_result_for_user,
} from '$lib/games/helpers';
import { fromError } from 'zod-validation-error';
import { fail, redirect, error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({
  params,
  locals: { supabase },
}) => {
	const { data: users, error } = await supabase
		.from('users')
		.select('*')
		.eq(
			'status',
			'active',
		)
		.order('name')

	if (error) {
		console.error(`[admin/page.server/load(...)] Error: `, error);
	}

	return {
		users: users ?? [],
	}
};


const createUserFormDataSchema = UserSchema.partial();

export const actions = {
	create_user: async ({
		request,
		locals: { supabase },
	}) => {
		const data = await request.formData();

		const user = {
			email: data.get('email'),
			name: data.get('name'),
			rank: Number(data.get('rank')),
		};

		try {
			// validate the input
			const safeParse = createUserFormDataSchema.safeParse(user);

			// if invalid - return the array of ZodIssues
			if (!safeParse.success) {
				return fail(400, {
					validation_errors: safeParse.error.issues
				});
			}
	
			const { data, error: err } = await supabase
				.from('users')
				.insert(user)
				.select();
			
			if (err.message.includes('duplicate')) {
				return fail(StatusCodes.CONFLICT, {
					success: false,
					user: null,
					error: 'User already exists',
				});
			}
	
			if (err) {
				return fail(StatusCodes.CONFLICT, {
					success: false,
					user: null,
					error: err.message,
				});
			};
	
			return {
				success: true,
				user: data?.[0],
			};	
		} catch (err: any) {
			console.error(
				`[admin/page.server/create_user(${JSON.stringify(user)})] Error:`,
				err.message,
				err.stack
			);

			error(StatusCodes.CONFLICT, {
				success: false,
				user: null,
				error: err.message,
			});
		}
	},

	create_game: async ({
		request,
		locals: { supabase },
	}) => {
		const data = await request.formData();
		const user_1_id = data.get('user-1-id');
		const user_2_id = data.get('user-2-id');
		const user_1_color = data.get('user-1-color');
		const user_2_color = data.get('user-2-color');
		const game_result = data.get('game-result');

		// @TODO: validate the user input

		try {
			// get our user objects
			const [
				user_1,
				user_2,
			] = await Promise.all([
				get_user(user_1_id),
				get_user(user_2_id)
			]);

			// check that the users exist
			if (!user_1) {
				throw new Error('User not found', user_1_id)
			}
	
			if (!user_2) {
				throw new Error('User not found', user_2_id)
			}
		
			const user_1_start_rank = user_1.rank;
			const user_2_start_rank = user_2.rank;

			// now calculate the new user ranks of the players
			// given the game result
			const [user_1_end_rank, user_2_end_rank] = update(
				user_1_start_rank,
				user_2_start_rank,
				convert_game_result_to_number(get_game_result_for_user(user_1_id, game_result)),
			);

			console.log('[admin/+page.server.js]', 'create_game', {
				user_1,
				user_2,
				user_1_color,
				user_2_color,
				game_result,
				user_1_start_rank,
				user_2_start_rank,
				user_1_end_rank,
				user_2_end_rank,
			})
			
			await Promise.all([
				update_user({
					rank: user_1_end_rank,
					user_id: user_1_id,
				}),
				update_user({
					rank: user_2_end_rank,
					user_id: user_2_id,
				}),
				create_game(
					user_1_id,
					user_1_color,
					user_1_start_rank,
					user_1_end_rank,
					user_2_id,
					user_2_color,
					user_2_start_rank,
					user_2_end_rank,
					game_result,
				),
				create_game(
					user_2_id,
					user_2_color,
					user_2_start_rank,
					user_2_end_rank,
					user_1_id,
					user_1_color,
					user_1_start_rank,
					user_1_end_rank,
					game_result,
				),
			])

			// create a zod schema to validate the above inputs
			// const inputValidation = z.object({
			// 	user_1: z.string().uuid(),
			// 	user_2: z.string().uuid(),
			// 	user_1_color: z.string(),
			// 	user_2_color: z.string(),
			// 	game_result: z.string(),
			// });

			// lets create all the data we need to insert into the database
			// const game = {
			// 	created_at: new Date(),
			// 	updated_at: new Date(),
			// };

			// const gamePlayer1 = {
			// 	game_id: 'game-1', // @TODO: get this from the created game above or in a tx
			// 	user_id: user_1_id,
			// 	color: user_1_color,
			// 	rank_start: 1500,
			// 	game_result: game_result,
			// 	created_at: new Date(),
			// 	updated_at: new Date(),
			// };

			// console.log('[admin/+page.server.js]', 'create_game', {
			// 	user_1,
			// 	user_2,
			// 	user_1_color,
			// 	user_2_color,
			// 	game_result
			// });

		} catch (error) {
			if (error) {
				console.error(`[users/admin/+page.server/create_game(...): Error: `, error);
			}

			return { success: false }
		}
	},
} satisfies Actions;

