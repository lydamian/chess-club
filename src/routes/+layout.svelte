<script lang="ts">
  import "tailwindcss/tailwind.css";
  import GoldChessLogo from "$src/lib/assets/images/gold-chess-logo.png";
  import { page } from '$app/stores';
	import { browser } from "$app/environment";
  import { invalidate } from '$app/navigation';
  import { onMount } from 'svelte';
  import { alertStore, addAlert, removeAlert } from '$src/store';

  import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
  import type { LayoutLoad } from './$types'
  import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr'

  export const load: LayoutLoad = async ({ fetch, data, depends }) => {
    depends('supabase:auth')

    const supabase = isBrowser()
      ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
          global: {
            fetch,
          },
        })
      : createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
          global: {
            fetch,
          },
          cookies: {
            getAll() {
              return data.cookies
            },
          },
        })

    /**
     * It's fine to use `getSession` here, because on the client, `getSession` is
     * safe, and on the server, it reads `session` from the `LayoutData`, which
     * safely checked the session using `safeGetSession`.
     */
    const {
      data: { session },
    } = await supabase.auth.getSession()

    return { supabase, session }
  }


  export let data;
  $: ({ session, supabase } = data);

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth');
      }
    });

    return () => data.subscription.unsubscribe();
  });

  const navigation = [
    { name: 'Leaderboard', href: '/' },
    { name: 'Admin', href: '/admin' },
  ];

  let mobileNavbarOpen = false;

  onMount(() => {
    const unsubscribe = page.subscribe(() => {
      mobileNavbarOpen = false;
    });

    return unsubscribe;
  });

	$: logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}
	};
</script>

<div
  class="
    min-h-full
    bg-slate-100
    text-base-content
  "
>
  <!-- global alerts -->
  <div id="alert">
    <!-- loop through all alerts -->
    {#each $alertStore as alert}
      <div
        role="alert"
        class="
          cursor-pointer
          alert
          alert-info
          info-content
          hover:alert-success
        "
        on:click={() => removeAlert(alert.id)}
        on:keydown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            removeAlert(alert.id);
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="h-6 w-6 shrink-0 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>{alert.message}</span>
      </div>
    {/each}
    
  </div>

  <!-- main -->
  <div class="bg-midnightblue pb-32">
    <nav class="bg-midnightblue">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="border-b">
          <div class="flex h-16 items-center justify-between px-4 sm:px-0">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <a
                  class="pointer"
                  href="/"
                >
                  <!-- <img class="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"> -->
                  <a href="/"><img class="h-48 w-auto" src={GoldChessLogo} alt="Your Company"></a>
              </div>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                  <!-- Current: "bg-accent text-secondary-content", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                  {#each navigation as item}
                    <a
                      href={item.href}
                      class={$page.url.pathname === item.href ? 'rounded-md bg-primary text-secondary-content px-3 py-2 font-medium text-white': 'rounded-md px-3 py-2 font-medium text-white hover:bg-accent hover:white'}
                      aria-current="page"
                    >
                      {item.name}
                    </a>
                  {/each}
                </div>
              </div>
            </div>
            <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-6">
                <button type="button" class="relative rounded-full bg-midnightblue p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white">
                  <span class="absolute -inset-1.5"></span>
                  <span class="sr-only">View notifications</span>
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </button>

                <!-- Profile dropdown -->
                  <!--
                    Dropdown menu, show/hide based on menu state.

                    Entering: "transition ease-out duration-100"
                      From: "transform opacity-0 scale-95"
                      To: "transform opacity-100 scale-100"
                    Leaving: "transition ease-in duration-75"
                      From: "transform opacity-100 scale-100"
                      To: "transform opacity-0 scale-95"
                  -->
                  <div
                    class={`${session ? "": "hidden"} dropdown dropdown-bottom dropdown-end`};
                  >
                    <div tabindex="0" role="button" class="">
                      <div class="">
                        <div>
                          <button type="button" class="relative flex max-w-xs items-center rounded-full bg-midnightblue text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                            <span class="absolute -inset-1.5"></span>
                            <span class="sr-only">Open user menu</span>
                            <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                          </button>
                        </div>
                    </div>
                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                      <!-- <li><a href="/admin/settings" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a></li> -->
                      <li>
                        <button on:click={logout} class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>
            <div class="-mr-2 flex md:hidden">
              <!-- Mobile menu button -->
              <button
                type="button"
                class="relative inline-flex items-center justify-center rounded-md bg-midnightblue p-2 text-white hover:bg-accent hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-controls="mobile-menu"
                aria-expanded="false"
                on:click={() => mobileNavbarOpen = !mobileNavbarOpen}
                on:keydown={e => e.key === 'Enter' && (mobileNavbarOpen = !mobileNavbarOpen)}  
              >
                <span class="absolute -inset-0.5"></span>
                <span class="sr-only">Open main menu</span>
                <!-- Menu open: "hidden", Menu closed: "block" -->
                <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <!-- Menu open: "block", Menu closed: "hidden" -->
                <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div
        class={`
          border-b border-gray-700 md:hidden
          ${mobileNavbarOpen ? '' : 'hidden'}
        `}
        id="mobile-menu"
      >
        <div class="space-y-1 px-2 py-3 sm:px-3">
          <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
          {#each navigation as item}
            <a
              href={item.href}
              class={$page.url.pathname === item.href ? 'block rounded-md bg-primary px-3 py-2 text-base font-medium text-white': 'block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-accent hover:text-white'}
              aria-current="page"
            >
              {item.name}
            </a>
          {/each}
        </div>
        <div class="border-t border-gray-700 pb-3 pt-4">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">Tom Cook</div>
              <div class="text-sm font-medium leading-none text-gray-400">tom@example.com</div>
            </div>
            <button type="button" class="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">View notifications</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button>
          </div>
          <div class="mt-3 space-y-1 px-2">
            <!-- <a href="/admin/settings" class="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-accent hover:text-white">Settings</a> -->
            <button
              on:click={logout}
              class="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-accent hover:text-white"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
    <header class="py-10">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-white">
          {#each navigation as item}
            {#if $page.url.pathname === item.href}
              {item.name}
            {/if}
          {/each}
        </h1>
      </div>
    </header>
  </div>

  <main class="-mt-32">
    <div class="mx-auto max-w-7xl md:px-4 pb-12 sm:px-6 lg:px-8">
      <div class="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
        <!-- Your content -->
        <slot />
      </div>
    </div>
  </main>
</div>
