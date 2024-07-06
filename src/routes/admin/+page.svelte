<script>
  import {
    generateMockUser,
  } from '$lib/data-generators/data-generators';

  const users = Array.from({ length: 10 }, (_, i) => (generateMockUser()))

  const colors = [
    { name: 'White', value: 'white' },
    { name: 'Black', value: 'black' },
  ];
</script>

<div class="space-y-10 divide-y divide-gray-900/10">
  <div class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
    <div class="px-4 sm:px-0">
      <h2 class="text-base font-semibold leading-7 text-gray-900">Player 1</h2>
      <p class="mt-1 text-sm leading-6 text-gray-600">The first player</p>
    </div>
<!-- 
    const UserSchema = z.object({
      id: z.string().uuid(),
      name: z.string(),
      email_address: z.string().email(),
      rank: Rank.default(1500),
      status: userStatusEnum,
      created_at: z.date(),
      updated_at: z.date(),
    }); -->

    <!-- user profile 1 -->
    <form
      class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
      method="POST"
      action="?/create_user"
    >
      <div class="px-4 py-6 sm:p-8">
        <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <!-- start -->
          <div class="col-span-full">
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
            <div class="mt-2">
              <input id="name" name="name" type="text" autocomplete="name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div class="col-span-full">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
              <input id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div class="col-span-full">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Rank</label>
            <div class="mt-2">
              <input id="rank" name="rank" type="number" value="1500" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
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

  <!-- const UserGameDetailsSchema = GameSchema.extend({
    user_id: z.string().uuid(),
    user_name: z.string(),
    color: Color,
    rank_at_time_of_play: z.number(),
    game_result: GameResult,
    opponent_user_id: z.string().uuid(),
    opponent_name: z.string(),
    opponent_color: Color,
    opponent_rank_at_time_of_play: z.number(),
    opponent_game_result: GameResult,
  }); -->
  
  <!-- game -->
  <div class="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
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
              <label for="user-1" class="block text-sm font-medium leading-6 text-gray-900">Player 1</label>
              <select id="user-1" name="user-1" class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <option>Select a user</option>
                {#each users as user}
                  <option value={user.id}>{user.name}</option>
                {/each}
              </select>
            </div>
          </div>

          <!-- color 1 -->
          <div class="col-span-full">
            <div class="relative mt-2">
              <label for="user-1-color" class="block text-sm font-medium leading-6 text-gray-900">Player 1 Color</label>
              <select id="user-1-color" name="user-1-color" class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                {#each colors as color}
                  <option value={color.value}>{color.name}</option>
                {/each}
              </select>
            </div>
          </div>

            <!-- user 2 -->
            <div class="col-span-full">
              <div class="relative mt-2">
                <label for="user-2" class="block text-sm font-medium leading-6 text-gray-900">Player 2</label>
                <select id="user-2" name="user-2" class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <option>Select a user</option>
                  {#each users as user}
                    <option value={user.id}>{user.name}</option>
                  {/each}
                </select>
              </div>
            </div>
  
            <!-- color 2 -->
            <div class="col-span-full">
              <div class="relative mt-2">
                <label for="user-2-color" class="block text-sm font-medium leading-6 text-gray-900">Player 2 Color</label>
                <select id="user-2-color" name="user-2-color" class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  {#each colors as color}
                    <option value={color.value}>{color.name}</option>
                  {/each}
                </select>
              </div>
            </div>
          

          <!-- game-result -->
          <div class="col-span-full">
            <div class="relative mt-2">
              <label for="game-result" class="block text-sm font-medium leading-6 text-gray-900">Game Result</label>
              <select id="game-result" name="game-result" class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <option>Draw</option>
                {#each users as user}
                  <option value={user.id}>{user.name}</option>
                {/each}
              </select>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <button type="submit" class="btn btn-primary text-primary-content">Submit</button>
        </div>
      </form>
  </div>
</div>