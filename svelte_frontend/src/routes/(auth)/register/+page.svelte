<script lang="ts">
	import Form from '$items/Form.svelte';
	import Input from '$items/Input.svelte';

	let loading = $state(false);
</script>

<div class="flex flex-col gap-0">
	<h1 class="text-4xl font-bold">Register</h1>
	<span class="text-gray-500 dark:text-gray-400">Get started with us</span>
</div>
<Form action="?/register" method="post" bind:loading class="flex flex-col gap-2">
	<Input name="username" text="@Username" placeholder="iamwho12" type="text" />
	<Input name="email" text="Email" type="email" placeholder="your@mail.com" />
	<Input name="password" text="Password" type="password" placeholder="6xist€nC9" />
	<button type="submit" disabled={loading} class="button-default font-black">
		{#if loading}
			......
		{:else}
			Register
		{/if}
	</button>
</Form>

<div class="flex items-center justify-between gap-2">
	<a href="/login" class="is-link">Login</a>
	<a href="/register" class="is-link">Register</a>
</div>
