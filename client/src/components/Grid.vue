<script>
    // --- External Imports ---
    import Muuri from "muuri/dist/muuri";

    // --- Internal Imports ---
    import DecoratedTerminal from "./DecoratedTerminal.vue";

    export default {
        components: {
            DecoratedTerminal
        }, // components

        props: {
            // Each item in terminals should be an object
            // that gets passed on to DecoratedTerminal
            // as props.
            terminals: {
                default: [],
                type: Array
            }
        },

        data() {
            return {
                ranks: []
            }
        }, // data

        updated() {
            var interactiveGrid = new Muuri(
                ".grid",
                {
                    dragEnabled: true,
                    layoutOnInit: true,
                    layoutOnResize: true,

                    dragHandle: ".terminal-header",

                    layoutDuration: 100
                }
            );
        }
    }; // export default
</script>



<template>
    <div class="grid">
        <span class="grid-item" v-for="terminal in terminals" :key="terminal.rankID">
            <div class="grid-item-content">
                <decorated-terminal :title="terminal.title"/>
            </div>
        </span>
    </div>
</template>



<style>
    .grid {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .grid-item {
        display: block;
        position: absolute;
        margin: 5px;
        z-index: 1;
        background: #000;
        color: #fff;
    }

    .grid-item.muuri-item-dragging {
        z-index: 3;
    }

    .grid-item.muuri-item-releasing {
        z-index: 2;
    }

    .grid-item.muuri-item-hidden {
        z-index: 0;
    }

    .grid-item-content {
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>
