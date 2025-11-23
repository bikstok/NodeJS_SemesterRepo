<script>
  import fitnessLogo from '/fitness_favicon.png'
</script>

<main>
  <div>
    <a href="https://fitogsund.dk/c/huse/broenshoej" target="_blank" rel="noreferrer">
      <img src={fitnessLogo} class="logo" alt="Fitness Logo" />
    </a>
  </div>
  <h1>Welcome to the FitLogger</h1>
  <p>Track your fitness activities with ease!</p>
  <p> Login below or register</p>
  <a href="/login">Login</a> | <a href="/register">Register</a>

</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
