<script>
  import { Router, Link, Route, navigate } from "svelte-routing";
  import Register from './pages/Register/Register.svelte';
  import Login from './pages/Login/Login.svelte'; 
  import Dashboard from './pages/Dashboard/Dashboard.svelte';
  import fitnessLogo from '/fitness_favicon.png';
  import toastr from 'toastr';

  async function handleLogout() {
    try {
      const res = await fetch("http://localhost:8080/api/logout", {
        method: "POST",
        credentials: "include"
      });

      if (res.ok) {
        toastr.success("Logged out successfully");
        navigate("/");
      } else {
        toastr.error("Logout failed");
      }
    } catch (err) {
      toastr.error("Network error");
    }
  }
</script>

<Router>
  <header>
    <div class="nav-container">
      <div class="nav-left">
        <a href="/" class="logo-link">
          <img src={fitnessLogo} class="logo" alt="Fitness Logo" />
        </a>
        <nav>
          
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
      </div>
      <div class="logout-button">
        <button on:click={handleLogout}>Logout</button>
      </div>
    </div>
  </header>

  <main>
    <Route path="/dashboard"><Dashboard /></Route>
    <Route path="/login"><Login /></Route>
    <Route path="/register"><Register /></Route>
    <Route path="/" exact>
      <h1>Welcome to the FitLogger</h1>
      <p>Track your fitness activities with ease!</p>
    </Route>
  </main>
</Router>

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #c5c7cf;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    z-index: 1000;
  }

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0.3em 1em; /* reduced vertical padding */
  }

  .nav-left {
    display: flex;
    align-items: center;
    gap: 1.5em; /* slightly tighter spacing */
  }

  .logo {
    height: 2.5em; /* smaller logo */
    transition: filter 0.3s;
  }

  .logo:hover {
    filter: drop-shadow(0 0 0.8em #646cffaa);
  }

  nav {
    display: flex;
    gap: 0.8em; /* tighter spacing between links */
  }

  nav a {
    text-decoration: none;
    color: #646cff;
    font-weight: 500;
    font-size: 0.95rem; /* smaller font */
    padding: 0.3em 0.5em; /* less padding */
    transition: color 0.2s;
  }

  nav a:hover {
    color: #ff3e00;
    text-decoration: underline;
  }

  main {
    margin-top: 4.5em; /* leave less space for thinner header */
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    padding: 2em;
  }
</style>

