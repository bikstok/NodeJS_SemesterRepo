<script>
    const { name, familySheep, isGirl, onShowLove, onEatCookie } = $props();

    import {fridgeMessages} from '../../stores/fridgeStore.js';

    let fridgemessageInput = $state("");

    function handleWriteFridgeMessage() {
        fridgeMessages.set([...$fridgeMessages, fridgemessageInput]);
        fridgemessageInput = "";
    }
    console.log($fridgeMessages);

    
</script>

<div
    class={familySheep || "not-a-sheep"}
    class:is-girl={isGirl}
    class:is-boy={!isGirl}
>
    <h3>{name}</h3>
</div>

<button onclick={() => onShowLove(name)}>Show your parent some love</button>
<button onclick={() => onEatCookie(name)}>Eat a cookie</button>

<input bind:value={fridgemessageInput} placeholder="Write a message to the fridge" />
    <button onclick={handleWriteFridgeMessage}>Write a message on the fridge</button>


<style>
    .black-sheep {
        background-color: crimson;
    }

    .grey-sheep {
        background-color: navajowhite;
    }

    .not-a-sheep {
        background-color: yellowgreen;
    }

    .is-girl {
        border: 0.5em solid rebeccapurple;
    }

    .is-boy {
        border: 0.5em solid cadetblue;
    }
</style>