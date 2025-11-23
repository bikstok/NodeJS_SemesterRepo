<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  let username = "";
  let email = "";
  let password = "";
  let error = "";
  let success = "";

  async function handleRegister() {
    error = "";
    success = "";

    if (!username || !email || !password) {
      error = "All fields are required";
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          registerPassword: password
        }),
        credentials: "include"
      });

      const data = await res.json();

      if (!res.ok) {
        error = data.error || "Registration failed";
      } else {
        success = "User registered successfully!";
        formReset();
        // Optional: redirect to login after 1.5s
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      console.error(err);
      error = "Network error";
    }
  }

  function formReset() {
    username = "";
    email = "";
    password = "";
  }
</script>

<main>
  <h1>Register</h1>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  {#if success}
    <p class="success">{success}</p>
  {/if}

  <form on:submit|preventDefault={handleRegister}>
    <label>
      Username:
      <input type="text" bind:value={username} placeholder="Enter username" />
    </label>
    <br />

    <label>
      Email:
      <input type="email" bind:value={email} placeholder="Enter email" />
    </label>
    <br />

    <label>
      Password:
      <input type="password" bind:value={password} placeholder="Enter password" />
    </label>
    <br />

    <button type="submit">Register</button>
  </form>
</main>

<style>
  main {
    max-width: 400px;
    margin: 3em auto;
    padding: 2em;
    border: 1px solid #ccc;
    border-radius: 1em;
    text-align: center;
  }

  input {
    width: 100%;
    margin-bottom: 1em;
    padding: 0.5em;
    font-size: 1em;
  }

  button {
    padding: 0.7em 1.5em;
    font-size: 1em;
    cursor: pointer;
  }

  button:hover {
    background-color: #646cffaa;
    color: white;
  }

  label {
    display: block;
    text-align: left;
    margin-bottom: 0.5em;
  }

  .error {
    color: red;
  }

  .success {
    color: green;
  }
</style>
