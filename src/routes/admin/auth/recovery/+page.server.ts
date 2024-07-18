import {
	StatusCodes,
} from 'http-status-codes';
import { fail, redirect, error } from "@sveltejs/kit";

import type { Actions } from './$types'

export const actions: Actions = {
  reset_password_for_email: async ({
    host,
    request,
    locals: { supabase }
  }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string

    const {
      data,
      error
    } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${host}/admin/auth/recovery/password`
      }
    )

    if (!error) {
      return {
        success: true,
        data: data,
      }
    }

    console.error(error)

    return fail(StatusCodes.UNAUTHORIZED, {
      success: false,
      error: 'Invalid email or password',
    });
  },
}
