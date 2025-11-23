<script>
    import {fridgeMessages} from '../../stores/fridgeStore.js';
    console.log($fridgeMessages);
</script>

{#each $fridgeMessages as message}
    <div class="fridge-message">{message}</div>
{/each}




<slot></slot>

<h2 id="welcome-mat">Velkommen til måtten!</h2>

<style>
    #welcome-mat {
        background-color: azure;
        border-radius: 0 0 2em 2em;
        padding: 2em;
        color: black;
    }
</style>
