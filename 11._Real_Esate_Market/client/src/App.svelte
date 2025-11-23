<script>   
import {Router, Link, Route} from 'svelte-routing';
  import HousingMarket from './pages/HousingMarket/HousingMarket.svelte';
  import About from './pages/About/About.svelte';


  // Use npm vi
</script>



<Router>
    <nav>
        <Link to='/'> Home </Link>
        <Link to='/housingmarket'> Real Estate Market </Link>
        <Link to='/about'> About </Link>
    </nav>
    <div>
        <Route path='/'><h1>Welcome to the Real Estate Market</h1></Route>
        <Route path='/housingmarket'><HousingMarket /></Route>
        <Route path='/about'><About /></Route>
    </div>
</Router>