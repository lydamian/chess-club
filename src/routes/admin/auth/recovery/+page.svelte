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
</script>

<div class="space-y-10 divide-y divide-gray-900/10">
  <form
    class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
    method="POST"
    action="?/reset_password_for_email"
  >
    <div class="px-4 py-6 sm:p-8">
      <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
        Enter your email address and we'll send you a link to reset your password.
      </label>
      <div class="mt-2">
        <input
          id="email"
          name="email"
          type="email"
          autocomplete="email"
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
    </div>
    <div class="flex items-center justify-end gap-x-6 px-4 py-4 sm:px-8">
      <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>
</div>