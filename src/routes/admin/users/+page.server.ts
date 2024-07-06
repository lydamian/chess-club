import type { Actions } from './$types';


// <!-- const UserSchema = z.object({
//   id: z.string().uuid(),
//   name: z.string(),
//   email_address: z.string().email(),
//   rank: Rank.default(1500),
//   status: userStatusEnum,
//   created_at: z.date(),
//   updated_at: z.date(),
// }); -->



export const actions = {
	create_user: async ({ cookies, request }) => {
    const data = await request.formData();
    const name = data.get('name');
    const email = data.get('email_address');
    const rank = data.get('rank') ?? 1500;


    console.log(event);
    return {
      status: 200,
      data: {
        name,
        email,
        rank,
      } 
	  };
  },
} as Actions;


