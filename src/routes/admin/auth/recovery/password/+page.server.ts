import { error } from '@sveltejs/kit';
import { z } from 'zod';
import { supabase } from "$src/lib/supabaseClient";
import type { Actions } from './$types'

const changePasswordSchema = z
    .object({
        password: z.string().min(8, { message: 'Password must contain at least 8 characters' }),
        confirm_password: z.string().min(8, { message: 'Password must contain at least 8 characters' }),
        token: z.string(),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.confirm_password) {
            ctx.addIssue({
                code: 'custom',
                message: 'Passwords must match',
                path: ['confirm_password'],
            });
        }
    });
export const actions: Actions = {
  update_password: async ({
    request,
    locals: { supabase, session }
  }) => {
    // user is logged in from the supabase reset password flow - from +layout.svelte onMount
    if (!session) {
        throw error(401, { message: 'not authorized' });
    }

    const data = await request.formData();
    const obj = {
        password: data.get('password'),
        confirm_password: data.get('confirm-password'),
        token: data.get('token'),
    }

    try {
        const result = changePasswordSchema.parse(obj);

        if (result) {
            // supabase logged the user in, so we can change the users password
            const { data: user, error } = await supabase.auth.updateUser({
                password: result.password,
            });

            if (error) {
                console.log('supa change pw error', error);
                return {
                    errors: [
                        { field: 'password', message: 'Something went wrong, cant update password' },
                    ],
                    data: {},
                    success: false,
                };
            }

            if (user) {
                return {
                    data: user,
                    errors: [],
                    success: true,
                };
            }
        }
    } catch (error: any) {
        try {
            const { fieldErrors: errors } = error.flatten();
            console.log('catch error', errors);

            return {
                errors: errors,
                data: obj,
                success: false,
            };
        } catch (error2) {
            console.log(error);
        }
    }
  },
}
