<script>
    // --- Internal Imports ---
    import Grid from "./components/Grid.vue";

    export default {
        components: {
            Grid
        }, // components

        data() {
            return {
                terminals: []
            };
        }, // data()

        mounted() {
            for (const i_rank of Array(3).keys()) {
                this.terminals.push({
                    headerParameters: {title: `Rank ${i_rank}`},
                    terminalParameters: {port: 9002}
                });
            }
        } // mounted()
    }; // export default
</script>



<template>
    <div class="root-container">
        <grid class="terminal-grid" :terminals="terminals"/>
    </div>
</template>


<style scoped>
    .root-container {
        position: absolute;
        background: #111;
        width: 100vw;
        height: 100vh;
        margin: 0 0 0 0;
        padding: 0;
        bottom: 0;
        left: 0;
        overflow: scroll;
    }

    .terminal-grid {
        position: relative;
        overflow: scroll;
    }
</style>