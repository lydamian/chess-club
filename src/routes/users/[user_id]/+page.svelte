<script lang="ts">
	import type { PageData } from './$types';
	import { generateMockGameJoinUsers } from '$lib/data-generators/data-generators';
	import type  { GameJoinUsers } from '$lib/schemas/schema';

	type Data = PageData & {
		// GET /api/users
		games: GameJoinUsers[];
	};

	export let data: Data = {
		// GET /api/users
		games: Array.from({ length: 10 }, (_, i) => generateMockGameJoinUsers("0", "1")),
	};

</script>

<!-- @TODO: implement  -->
<!-- Display some summary stats about a single user
- Number of games played
- Number of games won
- Number of games lost
- Number of games drawn
- Date joined
- Rank

Also display a history of all their games in chronological order

View all information about all users in a tabular format
Be able to search a user, I actually think i may not need this (since it should be on the leaderboard) -->

<div>
	<h1 class="text-2xl font-bold m-2">Johnson</h1>

	<!-- summary stats about a single user -->
	<div
		class="
			stats
			lg:stats-horizontal
			shadow
			flex
			bg-primary
			text-primary-content
		"
	>
		<div class="stat">
			<div class="stat-title">Number of games played</div>
			<div class="stat-value">200</div>
			<div class="stat-desc">Jan 1st - Feb 1st</div>
		</div>
	
		<div class="stat">
			<div class="stat-title">Number of games won</div>
			<div class="stat-value">4,200</div>
			<div class="stat-desc">↗︎ 400 (22%)</div>
		</div>
	
		<div class="stat">
			<div class="stat-title">Number of games lost</div>
			<div class="stat-value">1,200</div>
			<div class="stat-desc">↘︎ 90 (14%)</div>
		</div>
		<div class="stat">
			<div class="stat-title">Number of games drawn</div>
			<div class="stat-value">1,200</div>
			<div class="stat-desc">↘︎ 90 (14%)</div>
		</div>
		<div class="stat">
			<div class="stat-title">Date joined</div>
			<div class="stat-value">1,200</div>
			<div class="stat-desc">↘︎ 90 (14%)</div>
		</div>
		<div class="stat">
			<div class="stat-title">Rank</div>
			<div class="stat-value">1,200</div>
			<div class="stat-desc">↘︎ 90 (14%)</div>
		</div>
	</div>

	<!-- history of all their games in chronological order -->
	<div id="user-game-history" class="overflow-x-auto">
		<table class="table">
			<!-- head -->
			<thead>
				<tr>
					<th></th>
					<th>Played against</th>
					<th></th>
					<th>Favorite Color</th>
				</tr>
			</thead>
			<tbody>
				<!-- loop through all games and display table row -->
				{#each data.games as game, i}
					{@const userInfo = game.metadata.users[game.user_1_id]}
					{@const opponentInfo = game.metadata.users[game.user_2_id]}
					<tr>
						<td>{i + 1}</td>
						<td>{game.opponent}</td>
						<td>{game.metadata.users[game.user_1_id].game_outcome}</td>
						<td>{game.played_at}</td>
					</tr>
				{/each}

				<!-- row 1 -->
				<tr>
					<th>1</th>
					<td>Cy Ganderton</td>
					<td>Quality Control Specialist</td>
					<td>Blue</td>
				</tr>
				<!-- row 2 -->
				<tr>
					<th>2</th>
					<td>Hart Hagerty</td>
					<td>Desktop Support Technician</td>
					<td>Purple</td>
				</tr>
				<!-- row 3 -->
				<tr>
					<th>3</th>
					<td>Brice Swyre</td>
					<td>Tax Accountant</td>
					<td>Red</td>
				</tr>
			</tbody>
		</table>
	</div>	
</div>
