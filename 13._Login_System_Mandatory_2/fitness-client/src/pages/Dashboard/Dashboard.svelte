<script>
	import { onMount } from "svelte";
	import { navigate } from "svelte-routing";
	import toastr from "toastr";

	let loading = true;
	let error = null;
	let user = null;

	onMount(async () => {
		try {
			const res = await fetch("http://localhost:8080/api/session", {
				credentials: "include",
			});

			const data = await res.json();

			if (!res.ok || !data.user) {
				error = "Not logged in";
				user = null;
				toastr.error(error);
			} else {
				user = data.user;
				toastr.success("Logged in successfully!");
			}
		} catch (err) {
			console.error(err);
			error = "Network error";
			toastr.error(error);
		} finally {
			loading = false;
		}
	});
</script>

<main>
	{#if loading}
		<p>Checking session…</p>
	{:else}
		{#if user}
			<h1>Logged in successfully</h1>
			<p>Your user id: <strong>{user.id}</strong></p>

		{:else}
			<h1>Not logged in</h1>
			<p>
				<a href="/login">Go to Login</a>
			</p>
		{/if}
	{/if}
</main>

<style>
	main {
		max-width: 600px;
		margin: 3rem auto;
		padding: 2rem;
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		text-align: center;
		font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
	}

	h1 {
		color: #2a7ae2;
		margin-bottom: 1rem;
	}

	p {
		font-size: 1.05rem;
	}

	a {
		color: #2a7ae2;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
