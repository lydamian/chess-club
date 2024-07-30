<script lang="ts">
	import type { PageData, ActionData } from './$types';
  import { addAlert } from '$src/store';
  import ZodIssues from '$src/components/zod-issues.svelte';

	export let data: PageData;

  const colors = [
    { name: 'White', value: 'white' },
    { name: 'Black', value: 'black' },
  ];

  let userForm = {
    name: '',
    email: '',
    rank: 1500,
  };

  let players = [null, null];
  let playerColors = ['white', 'black'];
  
  $: playerColors[0] === 'white' ? playerColors[1] = 'black' : playerColors[1] = 'white';

	export let form: ActionData;

  const focusOnUserForm = () => {
    document?.getElementById('user-form')?.scrollIntoView();
  };

  $: if (form?.error) {
    addAlert(form.error);
  }

  $: if(form?.success) {
    addAlert('Successfully created');
  }

</script>

<!-- if there are issues -->
{#if form?.validation_errors}
  <ZodIssues issues={form.validation_errors} />
{/if}

<div class="space-y-10">
  <!-- game -->
  <div class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
    <div class="px-4 sm:px-0">
      <h2 class="text-base font-semibold leading-7 text-gray-900">Game</h2>
      <p class="mt-1 text-sm leading-6 text-gray-600">Enter a game</p>
    </div>
    <form
      class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
      method="POST"
      action="?/create_game"
    >
      <div class="px-4 py-6 sm:p-8">
        <!-- start -->
        <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <!-- user 1 -->
          <div class="col-span-full">
            <div class="relative mt-2">
              <label
                for="user-1-id"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Player 1
              </label>
              <p
                class="mt-2 text-sm text-gray-500"
                id="email-description"
              >
                Dont see the user you are looking for?
                <span
                  class="link link-primary"
                  on:click={focusOnUserForm}>
                    Add a new user
                </span>
              </p>
              <select
                id="user-1-id"
                name="user-1-id"
                class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                bind:value={players[0]}
              >
                <option>Select a user</option>
                {#each data.users as user}
                  <option value={user.id}>{user.name}</option>
                {/each}
              </select>
            </div>
          </div>

          <!-- color 1 -->
            <div class="col-span-full">
            <div class="relative mt-2">
              <label for="user-1-color" class="block text-sm font-medium leading-6 text-gray-900">Player 1 Color</label>
              <select
                id="user-1-color"
                name="user-1-color"
                class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                bind:value={playerColors[0]}
              >
                {#each colors as color}
                  <option value={color.value}>{color.name}</option>
                {/each}
              </select>
            </div>
            </div>

          <!-- user 2 -->
          <div class="col-span-full">
            <div class="relative mt-2">
              <label for="user-2-id" class="block text-sm font-medium leading-6 text-gray-900">
                Player 2
              </label>
              <p
                class="mt-2 text-sm text-gray-500"
                id="email-description"
              >
                Dont see the user you are looking for?
                <span
                  class="link link-primary"
                  on:click={focusOnUserForm}>
                    Add a new user
                </span>
              </p>
              <select
                id="user-2-id"
                name="user-2-id"
                class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                bind:value={players[1]}
              >
                <option>Select a user</option>
                {#each data.users as user}
                  <option value={user.id}>{user.name}</option>
                {/each}
              </select>
            </div>
          </div>

          <!-- color 2 -->
          <div class="col-span-full">
            <div class="relative mt-2">
              <label for="user-2-color" class="block text-sm font-medium leading-6 text-gray-900">Player 2 Color</label>
              <select
                id="user-2-color"
                name="user-2-color"
                class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                bind:value={playerColors[1]}
                disabled
              >
                {#each colors as color}
                  <option value={color.value}>{color.name}</option>
                {/each}
              </select>
            </div>
          </div>
            
          <!-- winner_id -->
          <div class="col-span-full">
            <div class="relative mt-2">
              <label for="winner-id" class="block text-sm font-medium leading-6 text-gray-900">Game Result</label>
              <select id="winner-id" name="winner-id" class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <option value="draw">Draw</option>
                {#each data.users.filter((user) => user.id === players[0] || user.id === players[1])
                  as user}
                  <option value={user.id}>{user.name}</option>
                {/each}
              </select>
            </div>
          </div>    
        </div>
      </div>
      <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        <button type="submit" class="btn btn-primary text-primary-content">Submit</button>
      </div>
    </form>
  </div>

  <!-- user form -->
  <div class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
    <div class="px-4 sm:px-0">
      <h2 class="text-base font-semibold leading-7 text-gray-900">New User</h2>
      <p class="mt-1 text-sm leading-6 text-gray-600">Create a user</p>
    </div>
    <form
      class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
      method="POST"
      action="?/create_user"
      id="user-form"
    >
      <div class="px-4 py-6 sm:p-8">
        <!-- start -->
        <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <!-- username -->
          <div class="col-span-full">
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
            <div class="mt-2">
              <input bind:value={userForm.name} id="name" name="name" type="text" autocomplete="name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <!-- email -->
          <div class="col-span-full">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
              <input bind:value={userForm.email} id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <!-- password -->
          <div class="col-span-full">
            <label for="rank" class="block text-sm font-medium leading-6 text-gray-900">Rank</label>
            <div class="mt-2">
              <input bind:value={userForm.rank} id="rank" name="rank" type="number" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</div>