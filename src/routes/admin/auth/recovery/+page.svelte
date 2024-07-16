Enter your email address and we'll send you a link to reset your password.
<script lang="ts">
  import type { PageData } from './$types';
  import { addAlert } from '$src/store';
  import ZodIssues from '$src/components/zod-issues.svelte';
  export let form;

  $: if (form?.error) {
    addAlert(form.error);
  }

  $: if(form?.success) {
    addAlert('Successfully created');
  }

  const onSubmit = async () => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: 'email@example.com',
      options: {
        emailRedirectTo: 'https://example.com/welcome'
      }
    })
  }
</script>

<div class="space-y-10 divide-y divide-gray-900/10">
  <!-- user form -->
  <form
    class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
    on:submit|preventDefault={onSubmit}
  >
    <div class="px-4 py-6 sm:p-8">
      <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="col-span-full">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
      <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>
</div>