<script lang="ts">
  import type { PageData } from './$types';
  import { page } from '$app/stores';
  import { addAlert } from '$src/store';
  import ZodIssues from '$src/components/zod-issues.svelte';
  export let form;

  let showPassword = false;
  const { url } = $page;

  const { searchParams } = url;

  const token = searchParams.get('token');

  $: if (form?.error) {
    addAlert(form.error);
  }

  $: if(form?.success) {
    addAlert('Successfully updated');
  }
</script>

<div class="space-y-10 divide-y divide-gray-900/10">
  <form
    class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
    method="POST"
    action="?/update_password"
  >
    <div class="px-4 py-6 sm:p-8">
      <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
        Enter your new password.
      </label>
      <div class="mt-2">
        <input
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          autocomplete="password"
          class="
            block
            w-full
            rounded-md
            border-0
            py-1.5
            text-gray-900
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-inset
            focus:ring-indigo-600
            sm:text-sm
            sm:leading-6
          "
        >
      </div>
    <div class="my-2">
      <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
        Confirm your password
      </label>
      <div class="mt-2">
        <input
          id="confirm-password"
          name="confirm-password"
          type={showPassword ? 'text' : 'password'}
          autocomplete="confirm-password"
          class="
            block
            w-full
            rounded-md
            border-0
            py-1.5
            text-gray-900
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-inset
            focus:ring-indigo-600
            sm:text-sm
            sm:leading-6
          "
        >
      </div>
    <div>
      <input type="hidden" name="token" value={token} />
      {#if form?.errors?.token}
          <span class="text-red-500">{form?.errors?.token[0]}</span>
      {/if}
    <div>
    </div>
    </div>
      <label
        class="my-2 flex items-center">
        <input
          type="checkbox"
          class="checkbox display-inline mr-2"
          bind:checked={showPassword}
        />
        show password
      </label>
    </div>
    <div class="flex items-center justify-end gap-x-6 px-4 py-4 sm:px-8">
      <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>

  {#if form && form.success === true }
    <div class="bg-green-300 p-2">
        <p>Your password was changed.</p>
    </div>
  {/if}

  {#if form && form.success === false }
    <div class="bg-red-300 p-2">
        <p>Could not change password.</p>
    </div>
  {/if}
</div>