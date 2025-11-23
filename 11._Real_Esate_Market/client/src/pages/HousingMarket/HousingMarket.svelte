<script>
    import { onMount } from 'svelte';
    import { BASE_URL } from "../../store/generalStore";
    let housingMarket;

    onMount(() => {
        fetch($BASE_URL + "/houses"), {
            credentials: 'include',
        }
        .then(response => response.json())
        .then(result => {
            console.log(result.data);
            housingMarket = result.data;
        });
    });

    function addhouse() {
        const newHouse = {
            street: "New Street " + Math.floor(Math.random() * 100),
            city: "New City",
            price: Math.floor(Math.random() * 500000) + 100000
        };
        fetch($BASE_URL + "/houses", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newHouse)
        })
        .then (response => response.json())
        .then (result => {
            housingMarket = result.data;
        });
        console.log("Added new house:", newHouse);
    }

</script>

<h1>Housing Market</h1>
<button onclick={addhouse}> Add a new house</button>

{#each housingMarket as house (house.id)}
    <h4>{house.street} </h4>
{/each}