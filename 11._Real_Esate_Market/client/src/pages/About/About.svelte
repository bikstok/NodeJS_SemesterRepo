<script>
    import { BASE_URL } from "../../store/generalStore";
    let realEstateAgents;

    // console.log(import.meta.env.VITE_BASE_URL);

    fetch($BASE_URL + "/realestateagents")
    .then(response => response.json())
    .then(result => {
        realEstateAgents = result.data;
        console.log(realEstateAgents.data);
    });
</script>



<h1>About</h1>

{#each realEstateAgents as realEstateAgent (realEstateAgent)}
    <p>{realEstateAgent}</p>

{/each}

<h2>Real estate agents...</h2>