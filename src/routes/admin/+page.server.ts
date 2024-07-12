import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';
import {
	ColorSchena,
	RankSchema,
	UserSchema,
	GamesSchema,
} from '$lib/schemas/schema';

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
const createGameFormDataSchema = GamesSchema.partial();

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
			
			if (err?.message.includes('duplicate')) {
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
		const game = {
			user_1_id: data.get('user-1-id'),
			user_2_id: data.get('user-2-id'),
			user_1_color: data.get('user-1-color'),
			user_2_color: data.get('user-2-color'),
			winner_id: data.get('winner-id'),
		} as any;

		try {
			if (game.user_1_id === game.user_2_id) {
				return fail(400, {
					success: false,
					error: 'Users cannot be the same',
				});
			}
			if (game.user_1_color === game.user_2_color) {
				return fail(400, {
					success: false,
					error: 'Colors cannot be the same',
				});
			}

			// validate the input
			const safeParse = createGameFormDataSchema.safeParse(game);

			// if invalid - return the array of ZodIssues
			if (!safeParse.success) {
				return fail(400, {
					validation_errors: safeParse.error.issues
				});
			}

			const [
				user_1,
				user_2,
			] = await Promise.all([
				get_user(game.user_1_id),
				get_user(game.user_2_id)
			]);

			// check that the users exist
			if (!user_1) {
				throw new Error('User not found', game.user_1_id)
			}
	
			if (!user_2) {
				throw new Error('User not found', game.user_2_id)
			}
		
			const user_1_start_rank = user_1.rank;
			const user_2_start_rank = user_2.rank;

			// now calculate the new user ranks of the players
			// given the game result
			const [user_1_end_rank, user_2_end_rank] = update(
				user_1_start_rank,
				user_2_start_rank,
				convert_game_result_to_number(get_game_result_for_user(
					game.user_1_id,
					game.winner_id
				)),
			);

			await Promise.all([
				update_user({
					rank: user_1_end_rank,
					user_id: game.user_1_id,
				}),
				update_user({
					rank: user_2_end_rank,
					user_id: game.user_2_id,
				}),
				create_game(
					game.user_1_id,
					game.user_1_color,
					game.user_1_start_rank,
					game.user_1_end_rank,
					game.user_2_id,
					game.user_2_color,
					game.user_2_start_rank,
					game.user_2_end_rank,
					game.winner_id,
				),
				create_game(
					game.user_2_id,
					game.user_2_color,
					game.user_2_start_rank,
					game.user_2_end_rank,
					game.user_1_id,
					game.user_1_color,
					game.user_1_start_rank,
					game.user_1_end_rank,
					game.winner_id,
				),
			])

			return {
				success: true,
			};	
			
		} catch (err) {
			console.error(
				`[admin/page.server/create_user(${JSON.stringify(game)})] Error:`,
				err.message,
				err.stack
			);

			error(StatusCodes.INTERNAL_SERVER_ERROR, {
				success: false,
				user: null,
				error: err.message,
			});
		}
	},
} satisfies Actions;

