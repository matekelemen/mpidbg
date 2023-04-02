<script>
    // --- Internal Imports ---
    import Grid from "./components/Grid.vue";
    import Dock from "./components/Dock.vue"
    import network from "./network.json";
    import {promiseSocket} from "./socketUtilities";


    export default {
        components: {
            Grid,
            Dock
        }, // components

        data() {
            return {
                connections: new Map(),
                terminals: [],
                dockParameters: {ranks: []}
            };
        }, // data()

        mounted() {
            for (const i_rank of Array(2).keys()) {
                promiseSocket(network.address, network.port).then(socket => {
                    this.connections.set(i_rank, socket);
                    this.terminals.push({
                        headerParameters: {title: `Rank ${i_rank}`},
                        terminalParameters: {
                            socket: socket,
                            rankID: i_rank
                        } // terminalParameters
                    }); // this.terminals.push
                    this.dockParameters.ranks.push({
                        rankID: i_rank
                    }); // this.rankWidgets.push
                }).catch(exception => {
                    console.log(`Failed to create socket for rank ${i_rank}: ${exception}`);
                });
            }
        } // mounted()
    }; // export default
</script>



<template>
    <div class="root-container">
        <dock :parameters="dockParameters"/>
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
        margin-left: 50px;
        width: auto;
        height: auto;
        overflow: scroll;
    }
</style>