<script>
    import Child from "../Child/Child.svelte";

    const { parentName, children } = $props();

    const loveHistory = $state([
        { 
            name: "self-love",
            love: "💞"
    }]);

    const eatingHistory = $state([]);

    function handleShowLove(childsName) {
        loveHistory.push({
            name: childsName,
            love: "💞"
        });
    }

    function handleEatCookie(childsName) {
        if (cookieJar.length > 0) {
            cookieJar.pop();
            eatingHistory.push({
                name: childsName,
                time: new Date().toLocaleTimeString()
            });
            console.log(`${childsName} ate a cookie! ${cookieJar.length} cookies left.`);
        }
    }

    function fillCookieJar() {
        cookieJar.push(...Array(5).fill("🍪"));
    }

    const cookieJar = $state(["🍪", "🍪", "🍪", "🍪", "🍪"]);

    /* 
    assignment: allow children to eat a cookie from the jar
    bonus: if the jar is empty, let the parent fill it
 */
</script>

<h2>{parentName}</h2>

{#each loveHistory as love}
    <span>{love.name}: {love.love}</span>   
{/each}


{#each cookieJar as cookie}
    <span>{cookie}</span>
{/each}

{#if cookieJar.length === 0}
    <button on:click={fillCookieJar}>Refill Cookie Jar</button>
{/if}

{#each eatingHistory as event}
    <div>{event.name} ate a cookie at {event.time}</div>
{/each}

{#each children as child (child.name)}
    <Child {...child} onShowLove={handleShowLove} onEatCookie={handleEatCookie} />
{/each}

