import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';
import { ColorSchena, RankSchema, UserSchema } from '$lib/schemas/schema';

export const load: PageServerLoad = async ({ cookies }) => {
	return { status: 200, props: { name: 'world' } };
};

const createUserFormDataSchema = UserSchema.partial();

export const actions = {
	create_user: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const name = data.get('name');
		const rank = Number(data.get('rank'));

		const user = createUserFormDataSchema.parse({
			email,
			name,
			rank,
		});

    console.log('[admin/+page.server.js]', 'user', user);

		return { success: true, user };
	},
	create_game: async ({ request }) => {
		// TODO register the user
		const data = await request.formData();
		const user_1 = data.get('user-1');
		const user_2 = data.get('user-2');
		const user_1_color = data.get('user-1-color');
		const user_2_color = data.get('user-2-color');
		const game_result = data.get('game-result');

		// create a zod schema to validate the above inputs
		const inputValidation = z.object({
			user_1: z.string().uuid(),
			user_2: z.string().uuid(),
			user_1_color: z.string(),
			user_2_color: z.string(),
			game_result: z.string(),
		});

		// lets create all the data we need to insert into the database
		// const game = {
		// 	created_at: new Date(),
		// 	updated_at: new Date(),
		// };

		// const gamePlayer1 = {
		// 	game_id: 'game-1', // @TODO: get this from the created game above or in a tx
		// 	user_id: user_1_id,
		// 	color: user_1_color,
		// 	rank_at_time_of_play: 1500,
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
	},
} satisfies Actions;

