<script>
    // --- Internal Imports ---
    import EmbeddedTerminal from "./EmbeddedTerminal.vue";
    import TerminalHeader from "./TerminalHeader.vue";

    export default {
        components: {
            EmbeddedTerminal,
            TerminalHeader
        }, // components

        props: {
            title: {
                default: "Terminal",
                type: String
            },
            embeddedTerminal: {
                default: {},
                type: Object
            } // embeddedTerminal
        }, // props

        data() {
            return {

            }
        } // data
    }; // export default
</script>


<template>
    <div class="decorated-terminal">
        <terminal-header :title="title"/>
        <embedded-terminal :terminal-parameters="embeddedTerminal"/>
    </div>
</template>



<style scoped>
    .decorated-terminal {
        box-sizing: border-box;
    }
</style>
