<script>
    // --- Internal Imports ---
    import EmbeddedTerminal from "./EmbeddedTerminal.vue";
    import TerminalHeader from "./TerminalHeader.vue";

    let defaults = {
        parameters: {
            headerParameters: {},
            embeddedTerminal: {}
        }
    }; // defaults

    export default {
        props: defaults,

        components: {
            EmbeddedTerminal,
            TerminalHeader
        }, // components

        data() {
            return {}
        }, // data

        mounted() {}
    }; // export default
</script>


<template>
    <div class="decorated-terminal">
        <terminal-header :parameters="parameters.headerParameters"/>
        <embedded-terminal :parameters="parameters.terminalParameters"/>
    </div>
</template>



<style scoped>
    .decorated-terminal {
        box-sizing: border-box;
    }
</style>
