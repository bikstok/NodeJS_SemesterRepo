<script>
  import { Router, Link, Route } from "svelte-routing";
  import { onMount } from "svelte";
  import Register from './pages/Register/Register.svelte';
  import Login from './pages/Login/Login.svelte'; 
  import fitnessLogo from '/fitness_favicon.png';
  import toastr from 'toastr';
</script>

<Router>
  <main>
    <div>
      <a href="https://fitogsund.dk/c/huse/broenshoej" target="_blank" rel="noreferrer">
        <img src={fitnessLogo} class="logo" alt="Fitness Logo" />
      </a>
    </div>
    <h1>Welcome to the FitLogger</h1>
    <p>Track your fitness activities with ease!</p>
    <p>Login below or register</p>

   
  <!-- Navigation -->
  <nav>
    <Link to="/">Home</Link>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
  </nav>

  <!-- Routes using slots -->
  <div>
    <Route path="/login"> <Login /></Route>
    <Route path="/register"><Register /> </Route>
  </div>
  </main>
</Router>

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
  nav {
    margin-top: 1em;
    margin-bottom: 2em;
  }
  nav a {
    margin-right: 1em;
    text-decoration: none;
    color: #646cff;
  }
  nav a:hover {
    text-decoration: underline;
  }
</style>
