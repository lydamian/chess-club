import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	return { status: 200, props: { name: 'world' } };
};

export const actions = {
	create_user: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const name = data.get('name');

    const user = {
      email,
      name,
    };

    console.log('[admin/+page.server.js]', 'user', data.entries());

		return { success: true };
	},
	create_game: async ({ request }) => {
		// TODO register the user
		const data = await request.formData();
		const user_1 = data.get('user-1');
		const user_2 = data.get('user-2');
		const user_1_color = data.get('user-1-color');
		const user_2_color = data.get('user-2-color');
		const game_result = data.get('game-result');

		const name = data.get('name');

		console.log('[admin/+page.server.js]', 'create_game', {
			user_1,
			user_2,
			user_1_color,
			user_2_color,
			game_result
		});
	},
} satisfies Actions;

