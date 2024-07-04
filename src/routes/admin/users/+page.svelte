<!-- create a user -->

<!-- const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email_address: z.string().email(),
  rank: Rank.default(1500),
  status: userStatusEnum,
  created_at: z.date(),
  updated_at: z.date(),
}); -->


<script lang="ts">
	import type { PageData, ActionData } from './$types';
	
	export let data: PageData;
	
	export let form: ActionData;
</script>

{#if form?.success}
	<!-- this message is ephemeral; it exists because the page was rendered in
		   response to a form submission. it will vanish if the user reloads -->
	<p>Successfully logged in! Welcome back, {data.user.name}</p>
{/if}

Hello World

<form>
  
</form>