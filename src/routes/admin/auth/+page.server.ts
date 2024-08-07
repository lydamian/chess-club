import {
	StatusCodes,
} from 'http-status-codes';
import { fail, redirect, error } from "@sveltejs/kit";

import type { Actions } from './$types'

export const actions: Actions = {
  login: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error) {
      redirect(303, '/admin')
    }

    console.error(error)

    return fail(StatusCodes.UNAUTHORIZED, {
      success: false,
      error: 'Invalid email or password',
    });
  },
}
